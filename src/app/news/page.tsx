// src/app/news/page.tsx
import Container from "@/components/Container";
import NewsCard from "@/components/NewsCard";
import { fetchAPI } from "@/lib/api";
import type { ReactElement } from "react";

type News = {
  id: number | string;
  slug: string;
  title: string;
  date: string;
  image?: any;
  excerpt?: string;
};

export const revalidate = 60;

export default async function NewsIndex(): Promise<ReactElement> {
  // Нормалчлах: API нь массив эсвэл pagination object эсвэл single object буцааж болно
  let data: any = null;
  try {
    data = await fetchAPI("/news/"); // та Django-д энэ endpoint-ийг ашиглаарай
  } catch (err) {
    // Солигдож болох endpoint хэлбэрүүдийг өөр аргаар авах гэж оролдоно
    console.error("Fetch /news/ failed:", err);
    // Та энд лог гаргаж үзэх боломжтой: console.log(JSON.stringify(err))
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
    // single object returned
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
