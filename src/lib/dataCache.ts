const cache = new Map<string, { data: unknown; ts: number }>();
const TTL = 300_000; // 5 minutes

export function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > TTL) { cache.delete(key); return null; }
  return entry.data as T;
}

export function setCache(key: string, data: unknown): void {
  cache.set(key, { data, ts: Date.now() });
}

export function clearCache(key?: string): void {
  if (key) cache.delete(key);
  else cache.clear();
}
