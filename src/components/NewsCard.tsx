import Image from "next/image";
import Link from "next/link";
import Card from "./ui/Card";
import { formatDate } from "@/lib/format";

export default function NewsCard({
  n,
}: {
  n: {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    image: string;
  };
}) {
  return (
    <Card>
      <Image
        src={n.image}
        alt={n.title}
        width={800}
        height={500}
        className="h-44 w-full rounded-t-xl2 object-cover"
      />
      <div className="space-y-2 p-4">
        <p className="text-xs text-brand-gray">{formatDate(n.date)}</p>
        <h3 className="text-lg font-bold">{n.title}</h3>
        <p className="text-sm text-brand-gray">{n.excerpt}</p>
        <div className="pt-2">
          <Link href={`/news/${n.slug}`} className="btn btn-outline">
            Read more
          </Link>
        </div>
      </div>
    </Card>
  );
}
