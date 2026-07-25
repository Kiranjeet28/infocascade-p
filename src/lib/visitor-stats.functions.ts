import { createServerFn } from "@tanstack/react-start";

export type VisitorStats = {
  today: number;
  yesterday: number;
  all: number;
  online: number;
};

function extractNumber(html: string, label: string): number {
  const re = new RegExp(
    `<td[^>]*>\\s*${label}\\s*</td>\\s*<td[^>]*>\\s*([\\d,\\.]+)\\s*</td>`,
    "i",
  );
  const m = html.match(re);
  if (!m) return 0;
  return Number.parseInt(m[1].replace(/[,\.]/g, ""), 10) || 0;
}

export const getVisitorStats = createServerFn({ method: "GET" }).handler(
  async (): Promise<VisitorStats> => {
    const res = await fetch(
      "https://www.freevisitorcounters.com/en/home/stats/id/1383063",
      { headers: { "user-agent": "Mozilla/5.0 InfoCascade" } },
    );
    const html = await res.text();
    return {
      today: extractNumber(html, "Today"),
      yesterday: extractNumber(html, "Yesterday"),
      all: extractNumber(html, "All"),
      online: extractNumber(html, "Online"),
    };
  },
);
