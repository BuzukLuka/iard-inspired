// src/components/NewsCard.tsx
import Image from "next/image";
import Link from "next/link";
import Card from "./ui/Card";
import { formatDate } from "@/lib/format";

type News = {
  id: number | string;
  slug: string;
  title: string;
  // backend-аас ирж болох хоёр хувилбар
  date?: string;
  published_at?: string;
  cover?: any; // could be string, object {url}, null etc
  excerpt?: string;
  content?: string;
};

function resolveImageSrc(img: any): string | null {
  if (!img) return null;

  if (typeof img === "string") {
    const s = img.trim();
    if (!s) return null;
    if (s.startsWith("http://") || s.startsWith("https://")) return s;
    // relative path from backend like "/media/xxx.jpg"
    if (s.startsWith("/")) {
      const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";
      if (base) return `${base}${s}`;
      return s; // fallback to relative
    }
    // plain filename like "uploads/x.jpg"
    const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";
    return base ? `${base}/${s}` : s;
  }

  if (typeof img === "object") {
    // common DRF serialization: { "url": "/media/..." }
    if (img.url) return resolveImageSrc(img.url);
    if (img.src) return resolveImageSrc(img.src);
    if (img.file) return resolveImageSrc(img.file);
  }

  return null;
}

export default function NewsCard({ n }: { n: News }) {
  const src = resolveImageSrc(n.cover);
  const dateStr = n.published_at || n.date || ""; // 👈 аль нь байгааг ашиглана

  return (
    <Card>
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

      <div className="space-y-2 p-4">
        <p className="text-xs text-brand-gray">
          {dateStr ? formatDate(dateStr) : ""}{" "}
          {/* ✅ Invalid Date алга болно */}
        </p>
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
