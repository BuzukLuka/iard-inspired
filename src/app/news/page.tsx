import Container from "@/components/Container";
import { news } from "@/data/news";
import NewsCard from "@/components/NewsCard";

export default function NewsIndex() {
  return (
    <section className="py-12">
      <Container>
        <h1 className="text-3xl">News</h1>
        <p className="mt-3 max-w-3xl text-brand-gray">
          Updates on programs, partnerships, and research releases.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((n) => (
            <NewsCard key={n.id} n={n} />
          ))}
        </div>
      </Container>
    </section>
  );
}
