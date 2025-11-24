// src/lib/api.ts
export async function fetchAPI<T = any>(
  endpoint: string,
  opts: RequestInit = {}
): Promise<T> {
  const base = process.env.NEXT_PUBLIC_API_URL;
  if (!base)
    throw new Error("NEXT_PUBLIC_API_URL is not defined in .env.local");

  const url = `${base.replace(/\/$/, "")}${
    endpoint.startsWith("/") ? endpoint : `/${endpoint}`
  }`;
  const res = await fetch(url, { ...opts, next: { revalidate: 60 } });

  if (res.status === 404) {
    // caller will handle null
    throw new Error("404");
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Fetch error ${res.status} ${res.statusText} ${text}`);
  }

  return res.json();
}
