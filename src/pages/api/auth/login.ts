import type { APIRoute } from 'astro';
import { getEnv } from '../../../lib/auth';

export const prerender = false;

export const GET: APIRoute = ({ request, locals }) => {
  const env = getEnv(locals);
  if (!env.GITHUB_CLIENT_ID) {
    return new Response('GitHub OAuth 未配置(缺少 GITHUB_CLIENT_ID)', { status: 503 });
  }
  const url = new URL(request.url);
  const state = crypto.randomUUID();
  const authorize = new URL('https://github.com/login/oauth/authorize');
  authorize.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
  authorize.searchParams.set('redirect_uri', `${url.origin}/api/auth/callback`);
  authorize.searchParams.set('scope', 'read:user');
  authorize.searchParams.set('state', state);
  return new Response(null, {
    status: 302,
    headers: {
      Location: authorize.toString(),
      'Set-Cookie': `oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`,
    },
  });
};
