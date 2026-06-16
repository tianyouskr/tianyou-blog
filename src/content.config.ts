import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 文章集合 —— Keystatic 写入 src/content/posts/ 下的 Markdown
const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().default(''),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      lang: z.enum(['zh', 'en']).default('zh'),
      cover: image().optional(),
      draft: z.boolean().default(false),
    }),
});

// 每日记录集合 —— Keystatic 写入 src/content/logs/<日期>.yaml(体重、训练)
// 文件名即日期(YYYY-MM-DD);私密字段不在此处,仅存浏览器本地。
const logs = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml,json,md}', base: './src/content/logs' }),
  schema: z
    .object({
      date: z.string().optional(),
      weight: z.number().optional(),
      workout: z.string().optional().default(''),
    })
    .passthrough(),
});

export const collections = { posts, logs };
