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
  cover?: any;
  excerpt?: string;
};

export const revalidate = 60;

export default async function NewsIndex(): Promise<ReactElement> {
  let data: any = null;
  try {
    data = await fetchAPI("/news/");
  } catch (err) {
    console.error("Fetch /news/ failed:", err);
    data = null;
  }

  let newsList: News[] = [];

  if (Array.isArray(data)) {
    newsList = data;
  } else if (data && Array.isArray(data.results)) {
    newsList = data.results;
  } else if (data && Array.isArray(data.data)) {
    newsList = data.data;
  } else if (data && typeof data === "object" && data.slug) {
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
