import type { APIRoute } from 'astro';
import { getEnv, parseCookies, createSessionCookie, isAllowed } from '../../../lib/auth';

export const prerender = false;

export const GET: APIRoute = async ({ request, locals }) => {
  const env = getEnv(locals);
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const cookieState = parseCookies(request.headers.get('Cookie')).oauth_state;

  if (!code || !state || state !== cookieState) {
    return new Response('登录校验失败(state 不匹配)', { status: 400 });
  }
  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET || !env.SESSION_SECRET) {
    return new Response('GitHub OAuth 未配置', { status: 503 });
  }

  // 用 code 换 access token
  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: `${url.origin}/api/auth/callback`,
    }),
  });
  const token = (await tokenRes.json()) as { access_token?: string };
  if (!token.access_token) {
    return new Response('获取 GitHub token 失败', { status: 401 });
  }

  // 取用户信息
  const userRes = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'tianyou-blog',
    },
  });
  const user = (await userRes.json()) as { login?: string };
  if (!user.login || !isAllowed(user.login, env)) {
    return new Response('该 GitHub 账号无权访问私密内容', { status: 403 });
  }

  const cookie = await createSessionCookie(user.login, env.SESSION_SECRET);
  return new Response(null, {
    status: 302,
    headers: {
      Location: '/logs',
      // 顺手清掉一次性 state cookie
      'Set-Cookie': cookie,
    },
  });
};
