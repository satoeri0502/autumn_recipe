// src/lib/rakuten-api.ts
import type { Recipe } from "@/types/recipe";
type RankingResponse = { result?: Recipe[] };

const BASE = import.meta.env.VITE_RAKUTEN_BASE_URL;
const APP_ID = import.meta.env.VITE_RAKUTEN_APP_ID;
const commonQuery = `applicationId=${APP_ID}&format=json&formatVersion=2`;

export async function fetchCategoryRanking(
  categoryId: string,
  signal?: AbortSignal
): Promise<Recipe[]> {
  const url = `${BASE}?${commonQuery}&categoryId=${encodeURIComponent(
    categoryId
  )}`;
  const res = await fetch(url, { signal });
  if (!res.ok) {
    const err: any = new Error(`HTTP ${res.status} ${res.statusText}`);

    // 429対応（ヘッダがあれば拾う）
    const ra = res.headers.get("retry-after");
    if (ra) err.retryAfterMs = Number(ra) * 1000;
    throw err;
  }
  const data = (await res.json()) as RankingResponse;
  return Array.isArray(data.result) ? data.result : [];
}
