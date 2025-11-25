// src/components/NewsCard.tsx
import Image from "next/image";
import Link from "next/link";
import Card from "./ui/Card";
import { formatDate } from "@/lib/format";

type News = {
  id: number | string;
  slug: string;
  title: string;
  date?: string;
  published_at?: string;
  cover?: unknown; // 👈 any биш
  excerpt?: string;
  content?: string;
};

function resolveImageSrc(img: unknown): string | null {
  if (!img) return null;

  if (typeof img === "string") {
    const s = img.trim();
    if (!s) return null;
    if (s.startsWith("http://") || s.startsWith("https://")) return s;

    const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";
    if (s.startsWith("/")) {
      return base ? `${base}${s}` : s;
    }
    return base ? `${base}/${s}` : s;
  }

  if (typeof img === "object" && img !== null) {
    const obj = img as {
      url?: unknown;
      src?: unknown;
      file?: unknown;
    };

    if (typeof obj.url === "string") return resolveImageSrc(obj.url);
    if (typeof obj.src === "string") return resolveImageSrc(obj.src);
    if (typeof obj.file === "string") return resolveImageSrc(obj.file);
  }

  return null;
}

export default function NewsCard({ n }: { n: News }) {
  const src = resolveImageSrc(n.cover);
  const dateStr = n.published_at || n.date || "";

  return (
    <Card>
      <div className="flex h-full flex-col">
        {src ? (
          <Image
            src={src}
            alt={n.title ?? "news image"}
            width={800}
            height={500}
            className="h-44 w-full rounded-t-xl object-cover"
          />
        ) : (
          <div className="h-44 w-full rounded-t-xl bg-gray-100 flex items-center justify-center text-sm text-gray-500">
            No image
          </div>
        )}

        <div className="flex flex-1 flex-col p-4">
          <div className="space-y-2">
            <p className="text-xs text-brand-gray">
              {dateStr ? formatDate(dateStr) : ""}
            </p>
            <h3 className="text-lg font-bold">{n.title}</h3>
            <p className="text-sm text-brand-gray">{n.excerpt}</p>
          </div>

          <div className="pt-2 mt-auto">
            <Link href={`/news/${n.slug}`} className="btn btn-outline">
              Read more
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
