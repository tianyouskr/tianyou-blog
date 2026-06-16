import { getCollection } from 'astro:content';

export interface LogEntry {
  date: string; // YYYY-MM-DD
  weight?: number;
  workout: string;
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// 读取全部每日记录(公开字段:体重、训练),按日期升序。
// 日期取自数据里的 date 或文件名(去扩展名)。
export async function getLogs(): Promise<LogEntry[]> {
  const all = await getCollection('logs');
  return all
    .map((e) => {
      const data = e.data as { date?: string; weight?: number; workout?: string };
      const fromId = String(e.id).replace(/\.(ya?ml|json|md|mdx)$/i, '');
      const date = data.date && DATE_RE.test(data.date) ? data.date : fromId;
      return {
        date,
        weight: typeof data.weight === 'number' ? data.weight : undefined,
        workout: (data.workout ?? '').toString().trim(),
      } satisfies LogEntry;
    })
    .filter((e) => DATE_RE.test(e.date))
    .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
}
