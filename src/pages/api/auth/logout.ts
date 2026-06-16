import type { APIRoute } from 'astro';
import { clearSessionCookie } from '../../../lib/auth';

export const prerender = false;

export const GET: APIRoute = () =>
  new Response(null, {
    status: 302,
    headers: { Location: '/logs', 'Set-Cookie': clearSessionCookie() },
  });
