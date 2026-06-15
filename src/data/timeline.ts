import type { Lang } from '../i18n/ui';

export interface TimelineEntry {
  /** 起始年份,如 "2023" */
  start: string;
  /** 结束年份,如 "2024";留空表示"至今" */
  end?: string;
  /**
   * 左侧 logo,可选。两种写法:
   *  - 图片:把图片放进 public/logos/ ,这里写 "/logos/xxx.svg"
   *  - emoji:直接写 "🏢"
   */
  logo?: string;
  /** logo 的替代文字(图片无障碍用) */
  logoAlt?: string;
  /**
   * 正文。支持内联 HTML,所以可以写链接:
   *   '我在 <a href="https://example.com">某公司</a> 做了……'
   */
  bodyHtml: string;
}

// 在这里填你自己的经历(从新到旧排列即可)。下面是示例,按需替换/增删。
export const timeline: Record<Lang, TimelineEntry[]> = {
  zh: [
    {
      start: '2024',
      logo: '💻',
      bodyHtml:
        '在 <a href="#">某公司</a> 担任软件工程师,负责……(把这里换成你的真实经历)。',
    },
    {
      start: '2020',
      end: '2024',
      logo: '🎓',
      bodyHtml:
        '在 <a href="#">某大学</a> 攻读计算机科学学位,研究方向是……。',
    },
    {
      start: '2016',
      end: '2020',
      logo: '🏫',
      bodyHtml: '高中阶段开始接触编程,第一次写出了……。',
    },
  ],
  en: [
    {
      start: '2024',
      logo: '💻',
      bodyHtml:
        'Software engineer at <a href="#">some company</a>, working on … (replace with your real experience).',
    },
    {
      start: '2020',
      end: '2024',
      logo: '🎓',
      bodyHtml:
        'Studied Computer Science at <a href="#">some university</a>, focused on ….',
    },
    {
      start: '2016',
      end: '2020',
      logo: '🏫',
      bodyHtml: 'Got into programming in high school; wrote my first ….',
    },
  ],
};
