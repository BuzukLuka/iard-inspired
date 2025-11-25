// src/app/news/page.tsx
import Container from "@/components/Container";
import NewsCard from "@/components/NewsCard";
import { fetchAPI } from "@/lib/api";
import type { ReactElement } from "react";

type News = {
  id: number | string;
  slug: string;
  title: string;
  date?: string;
  published_at?: string;
  cover?: unknown;
  excerpt?: string;
};

// Backend-аас буцаж болох бүх хэлбэрийг нэг дор тодорхойллоо
type NewsApiResponse =
  | News[]
  | { results: News[] }
  | { data: News[] }
  | News
  | null;

export const revalidate = 60;

export default async function NewsIndex(): Promise<ReactElement> {
  let data: NewsApiResponse = null;

  try {
    // fetchAPI-д generic өгч байгаа тул any хэрэггүй боллоо
    data = await fetchAPI<NewsApiResponse>("/news/");
  } catch (err) {
    console.error("Fetch /news/ failed:", err);
    data = null;
  }

  let newsList: News[] = [];

  if (Array.isArray(data)) {
    newsList = data;
  } else if (data && "results" in data && Array.isArray(data.results)) {
    newsList = data.results;
  } else if (data && "data" in data && Array.isArray(data.data)) {
    newsList = data.data;
  } else if (data && typeof data === "object" && "slug" in data) {
    newsList = [data];
  } else {
    newsList = [];
  }

  return (
    <section className="py-12">
      <Container>
        <h1 className="text-3xl font-bold">News</h1>
        <p className="mt-3 max-w-3xl text-brand-gray">
          Updates on programs, partnerships, and research releases.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {newsList.length ? (
            newsList.map((n) => <NewsCard key={n.id} n={n} />)
          ) : (
            <p className="text-sm text-brand-gray">No news items found.</p>
          )}
        </div>
      </Container>
    </section>
  );
}
