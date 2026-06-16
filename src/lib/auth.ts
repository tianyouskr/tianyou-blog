// GitHub OAuth 登录 + 签名会话 Cookie(运行在 Cloudflare Worker,使用 Web Crypto)。
// 私密数据仅限白名单 GitHub 账号访问。

export interface Env {
  GITHUB_CLIENT_ID?: string;
  GITHUB_CLIENT_SECRET?: string;
  SESSION_SECRET?: string;
  ALLOWED_GITHUB_LOGIN?: string; // 逗号分隔的允许登录的 GitHub 用户名
  PRIVATE_LOGS?: KVNamespace;
}

export interface Session {
  login: string;
  exp: number;
}

const enc = new TextEncoder();
const COOKIE = 'session';
const MAX_AGE = 60 * 60 * 24 * 30; // 30 天

export function getEnv(locals: unknown): Env {
  return ((locals as { runtime?: { env?: Env } })?.runtime?.env ?? {}) as Env;
}

export function parseCookies(header: string | null): Record<string, string> {
  const out: Record<string, string> = {};
  if (!header) return out;
  for (const part of header.split(';')) {
    const i = part.indexOf('=');
    if (i > -1) out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  }
  return out;
}

function b64url(buf: ArrayBuffer | Uint8Array): string {
  const b = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let s = '';
  for (const c of b) s += String.fromCharCode(c);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function b64urlBytes(str: string): Uint8Array {
  let s = str.replace(/-/g, '+').replace(/_/g, '/');
  s += '='.repeat((4 - (s.length % 4)) % 4);
  const bin = atob(s);
  const b = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) b[i] = bin.charCodeAt(i);
  return b;
}

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

export async function createSessionCookie(login: string, secret: string): Promise<string> {
  const payload: Session = { login, exp: Date.now() + MAX_AGE * 1000 };
  const data = b64url(enc.encode(JSON.stringify(payload)));
  const key = await hmacKey(secret);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  const token = `${data}.${b64url(sig)}`;
  return `${COOKIE}=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${MAX_AGE}`;
}

export function clearSessionCookie(): string {
  return `${COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`;
}

export async function getSession(request: Request, secret?: string): Promise<Session | null> {
  if (!secret) return null;
  const token = parseCookies(request.headers.get('Cookie'))[COOKIE];
  if (!token) return null;
  const [data, sig] = token.split('.');
  if (!data || !sig) return null;
  const key = await hmacKey(secret);
  let ok = false;
  try {
    ok = await crypto.subtle.verify('HMAC', key, b64urlBytes(sig), enc.encode(data));
  } catch {
    return null;
  }
  if (!ok) return null;
  try {
    const payload = JSON.parse(new TextDecoder().decode(b64urlBytes(data))) as Session;
    if (!payload.login || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function isAllowed(login: string, env: Env): boolean {
  const allow = (env.ALLOWED_GITHUB_LOGIN ?? '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return allow.length > 0 && allow.includes(login.toLowerCase());
}

export function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
