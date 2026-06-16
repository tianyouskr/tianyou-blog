import type { APIRoute } from 'astro';
import { getEnv, getSession, json } from '../../lib/auth';

export const prerender = false;

type PrivMap = Record<string, { sex?: boolean }>;

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const kvKey = (login: string) => `private:${login}`;

export const GET: APIRoute = async ({ request, locals }) => {
  const env = getEnv(locals);
  const session = await getSession(request, env.SESSION_SECRET);
  if (!session) return json({ authed: false }, 401);
  if (!env.PRIVATE_LOGS) return json({ authed: true, configured: false, data: {} });
  const raw = await env.PRIVATE_LOGS.get(kvKey(session.login));
  return json({ authed: true, configured: true, login: session.login, data: raw ? JSON.parse(raw) : {} });
};

export const POST: APIRoute = async ({ request, locals }) => {
  const env = getEnv(locals);
  const session = await getSession(request, env.SESSION_SECRET);
  if (!session) return json({ authed: false }, 401);
  if (!env.PRIVATE_LOGS) return json({ error: 'KV 未配置' }, 503);

  let body: { date?: string; sex?: boolean };
  try {
    body = (await request.json()) as { date?: string; sex?: boolean };
  } catch {
    return json({ error: 'bad json' }, 400);
  }
  if (!body.date || !DATE_RE.test(body.date)) return json({ error: 'bad date' }, 400);

  const raw = await env.PRIVATE_LOGS.get(kvKey(session.login));
  const map: PrivMap = raw ? JSON.parse(raw) : {};
  if (body.sex) map[body.date] = { ...(map[body.date] || {}), sex: true };
  else delete map[body.date];
  await env.PRIVATE_LOGS.put(kvKey(session.login), JSON.stringify(map));
  return json({ ok: true, data: map });
};
