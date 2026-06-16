import { config, fields, collection } from '@keystatic/core';

// GitHub 在线模式:在部署好的网站 /keystatic 登录 GitHub 后即可在线写作,
// 保存自动提交到仓库并触发重新部署。首次需在 /keystatic 按向导创建 GitHub App。
export default config({
  storage: {
    kind: 'github',
    repo: 'tianyouskr/tianyou-blog',
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
    logs: collection({
      label: '每日记录 Logs',
      slugField: 'date',
      path: 'src/content/logs/*',
      format: { data: 'yaml' },
      columns: ['date'],
      schema: {
        date: fields.slug({
          name: {
            label: '日期 Date',
            description: '格式 YYYY-MM-DD,例如 2026-06-16(作为文件名)',
          },
        }),
        weight: fields.number({ label: '体重 Weight (kg)' }),
        workout: fields.text({
          label: '训练 Workout',
          description: '今天练了什么,如「胸+三头」「跑步 5km」',
          multiline: true,
        }),
      },
    }),
  },
});
