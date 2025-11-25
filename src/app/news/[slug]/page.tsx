// src/app/news/[slug]/page.tsx
import Container from "@/components/Container";
import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchAPI } from "@/lib/api";
import { formatDate } from "@/lib/format";

type News = {
  id: number | string;
  slug: string;
  title: string;
  published_at?: string;
  cover?: string;
  body?: string;
};

// backend-аас буцаж болох хэлбэрүүд
type NewsListResponse = News[] | { results: News[] } | { data: News[] };

type NewsApiResponse = NewsListResponse | News | null;

// ==================== HELPERS ====================
function resolveImageSrc(url?: string | null): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";
  if (trimmed.startsWith("/")) return `${base}${trimmed}`;
  return `${base}/${trimmed}`;
}

// ==================== API ====================
async function getNewsBySlug(slug: string): Promise<News | null> {
  try {
    const res = await fetchAPI<NewsApiResponse>("/news/");

    let list: News[] = [];

    if (Array.isArray(res)) {
      list = res;
    } else if (res && "results" in res && Array.isArray(res.results)) {
      list = res.results;
    } else if (res && "data" in res && Array.isArray(res.data)) {
      list = res.data;
    }

    const found = list.find((item) => item.slug === slug);
    return found ?? null;
  } catch (e) {
    console.error("Failed to fetch news:", e);
    return null;
  }
}

// ==================== PAGE COMPONENT ====================
export default async function NewsArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const n = await getNewsBySlug(slug);

  if (!n) return notFound();

  const imgSrc = resolveImageSrc(n.cover);

  return (
    <article className="py-12">
      <Container>
        <p className="text-xs text-gray-400">
          {n.published_at ? formatDate(n.published_at) : ""}
        </p>

        <h1 className="mt-1 text-3xl font-bold">{n.title}</h1>

        <div className="mt-4 overflow-hidden rounded-xl border border-black/10">
          {imgSrc ? (
            <Image
              src={imgSrc}
              alt={n.title}
              width={1200}
              height={600}
              className="h-72 w-full object-cover"
            />
          ) : (
            <div className="h-72 w-full bg-gray-100 flex items-center justify-center text-sm text-gray-500">
              No image
            </div>
          )}
        </div>

        <div
          className="prose prose-lg mt-6 max-w-3xl"
          dangerouslySetInnerHTML={{
            __html: n.body ?? "",
          }}
        />
      </Container>
    </article>
  );
}
