import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';

const isProd = import.meta.env.PROD;

// 取指定语言、非草稿(生产环境)的文章,按发布日期倒序
export async function getPosts(lang: Lang): Promise<CollectionEntry<'posts'>[]> {
  const all = await getCollection('posts');
  return all
    .filter((p) => p.data.lang === lang && (!isProd || !p.data.draft))
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

// 汇总某语言下的标签 -> 数量
export async function getTags(lang: Lang): Promise<Map<string, number>> {
  const posts = await getPosts(lang);
  const map = new Map<string, number>();
  for (const p of posts) {
    for (const tag of p.data.tags) {
      map.set(tag, (map.get(tag) ?? 0) + 1);
    }
  }
  return map;
}
