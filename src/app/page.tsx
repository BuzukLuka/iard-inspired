import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Stats from "@/components/Stats";
import PartnerCarousel from "@/components/PartnerCarousel";
import { initiatives } from "@/data/initiatives";
import { resources } from "@/data/resources";
import { news } from "@/data/news";
import NewsCard from "@/components/NewsCard";
import ResourceCard from "@/components/ResourceCard";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/hero.png"
            alt="Hero background"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        {/* Readability overlay */}
        <div className="absolute inset-0 -z-0 bg-black/30 md:bg-black/20" />

        <Container>
          <div className="py-14 sm:py-16 md:py-20 lg:py-28">
            <div className="max-w-2xl">
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/80">
                Evidence &amp; Action
              </p>
              <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                Working together for responsible choices
              </h1>
              <p className="mt-3 sm:mt-4 max-w-xl text-sm sm:text-base text-white/80">
                We partner with governments, NGOs, and communities to reduce
                harmful drinking through evidence-based initiatives.
              </p>

              {/* CTA buttons: stack on mobile */}
              <div className="mt-6 flex flex-col xs:flex-row gap-3 w-full max-w-sm sm:max-w-none">
                <Link
                  href="/initiatives"
                  className="btn btn-primary w-full xs:w-auto text-sm sm:text-base"
                >
                  Explore Initiatives
                </Link>
                <Link
                  href="/resources"
                  className="btn btn-ghost w-full xs:w-auto text-sm sm:text-base"
                >
                  Browse Resources
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="py-8 sm:py-10">
        <Container>
          <Stats />
        </Container>
      </section>

      {/* Initiatives */}
      <section className="py-8 sm:py-10">
        <Container>
          <SectionHeading
            eyebrow="Focus Areas"
            title="Key Initiatives"
            subtitle="Backed by evidence and built with partners."
          />
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {initiatives.map((i) => (
              <Link
                key={i.id}
                href={`/initiatives#${i.slug}`}
                className="card block overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
              >
                <Image
                  src={i.image}
                  alt={i.title}
                  width={800}
                  height={500}
                  className="h-40 sm:h-44 md:h-48 w-full object-cover"
                />
                <div className="space-y-2 p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-bold">{i.title}</h3>
                  <p className="text-sm text-[color:var(--muted)]">
                    {i.summary}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1.5">
                    {i.tags.map((t) => (
                      <span key={t} className="badge">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* News */}
      <section className="py-8 sm:py-10">
        <Container>
          <SectionHeading eyebrow="What’s New" title="Latest News" />
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((n) => (
              <NewsCard key={n.id} n={n} />
            ))}
          </div>
          <div className="mt-6">
            <Link href="/news" className="btn btn-ghost">
              View all news
            </Link>
          </div>
        </Container>
      </section>

      {/* Resources */}
      <section className="py-8 sm:py-10">
        <Container>
          <SectionHeading
            eyebrow="For Practitioners"
            title="Featured Resources"
          />
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((r) => (
              <ResourceCard key={r.id} r={r} />
            ))}
          </div>
        </Container>
      </section>

      {/* Partners */}
      <section className="py-10 sm:py-12">
        <Container>
          <SectionHeading
            eyebrow="Together"
            title="Members & Partners"
            subtitle="We collaborate globally across sectors."
          />
          <div className="px-1 sm:px-0">
            <PartnerCarousel />
          </div>
        </Container>
      </section>
    </>
  );
}
