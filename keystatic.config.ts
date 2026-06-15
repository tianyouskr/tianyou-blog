import { config, fields, collection } from '@keystatic/core';

// 本地模式:直接读写仓库内 Markdown,适合本地写作与开发验证。
// 上线在线后台时改为:
//   storage: { kind: 'github', repo: 'your-name/tianyou-blog' }
// 并按 README 创建 Keystatic GitHub App。
export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    posts: collection({
      label: '文章 Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      columns: ['title', 'pubDate'],
      schema: {
        title: fields.slug({ name: { label: '标题 Title' } }),
        description: fields.text({
          label: '摘要 Description',
          multiline: true,
        }),
        pubDate: fields.date({
          label: '发布日期 Publish date',
          defaultValue: { kind: 'today' },
        }),
        updatedDate: fields.date({ label: '更新日期 Updated date' }),
        lang: fields.select({
          label: '语言 Language',
          options: [
            { label: '中文', value: 'zh' },
            { label: 'English', value: 'en' },
          ],
          defaultValue: 'zh',
        }),
        tags: fields.array(fields.text({ label: '标签 Tag' }), {
          label: '标签 Tags',
          itemLabel: (props) => props.value,
        }),
        cover: fields.image({
          label: '封面 Cover',
          directory: 'src/content/posts/_images',
          publicPath: '../_images/',
        }),
        draft: fields.checkbox({ label: '草稿 Draft', defaultValue: false }),
        content: fields.mdx({
          label: '正文 Content',
          options: {
            image: {
              directory: 'src/content/posts/_images',
              publicPath: '../_images/',
            },
          },
        }),
      },
    }),
  },
});
