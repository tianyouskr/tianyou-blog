import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '../lib/posts';
import { ui } from '../i18n/ui';
import { postSlug } from '../i18n/utils';

export const prerender = true;

export async function GET(context: APIContext) {
  const posts = await getPosts('zh');
  return rss({
    title: ui.zh['site.title'],
    description: ui.zh['site.description'],
    site: context.site ?? 'https://example.com',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/posts/${postSlug(post.id)}/`,
    })),
  });
}
