import { useState, useCallback } from "react";

export function useCachedFetch<T>(key: string, url: string, responseKey: string) {
  const [data, setData] = useState<T[]>(() => {
    try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch { return []; }
  });

  const refresh = useCallback(async () => {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const json = await res.json();
        const fresh: T[] = json[responseKey];
        localStorage.setItem(key, JSON.stringify(fresh));
        setData(fresh);
      }
    } catch {
      // ignore — stale cache is already rendered
    }
  }, [key, url, responseKey]);

  return { data, setData, refresh };
}
