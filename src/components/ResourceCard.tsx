import Image from "next/image";
import Link from "next/link";
import Card from "./ui/Card";

export default function ResourceCard({
  r,
}: {
  r: {
    id: string;
    title: string;
    type: string;
    year: number;
    image: string;
    summary: string;
    downloadUrl?: string;
    slug?: string;
  };
}) {
  return (
    <Card>
      <Image
        src={r.image}
        alt={r.title}
        width={800}
        height={500}
        className="h-44 w-full rounded-t-xl2 object-cover"
      />
      <div className="space-y-2 p-4">
        <div className="flex items-center justify-between text-xs text-brand-gray">
          <span className="rounded-md border border-black/10 px-2 py-0.5">
            {r.type}
          </span>
          <span>{r.year}</span>
        </div>
        <h3 className="text-lg font-bold">{r.title}</h3>
        <p className="text-sm text-brand-gray">{r.summary}</p>
        <div className="pt-2">
          {r.downloadUrl ? (
            <a href={r.downloadUrl} className="btn btn-outline">
              Download
            </a>
          ) : r.slug ? (
            <Link href={`/resources#${r.slug}`} className="btn btn-outline">
              Learn more
            </Link>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
