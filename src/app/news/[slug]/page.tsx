import Container from "@/components/Container";
import { news } from "@/data/news";
import Image from "next/image";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/format";

export default function NewsArticle({ params }: { params: { slug: string } }) {
  const n = news.find((x) => x.slug === params.slug);
  if (!n) return notFound();
  return (
    <article className="py-12">
      <Container>
        <p className="text-xs text-brand-gray">{formatDate(n.date)}</p>
        <h1 className="mt-1 text-3xl">{n.title}</h1>
        <div className="mt-4 overflow-hidden rounded-xl2 border-2 border-black/10">
          <Image
            src={n.image}
            alt={n.title}
            width={1200}
            height={600}
            className="h-72 w-full object-cover"
          />
        </div>
        <div className="prose prose-lg mt-6 max-w-3xl">
          <p>{n.content}</p>
        </div>
      </Container>
    </article>
  );
}
