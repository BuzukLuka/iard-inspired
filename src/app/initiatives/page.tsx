import Container from "@/components/Container";
import { initiatives } from "@/data/initiatives";
import Image from "next/image";

export default function InitiativesPage() {
  return (
    <section className="py-12">
      <Container>
        <h1 className="text-3xl">Initiatives</h1>
        <p className="mt-3 max-w-3xl text-brand-gray">
          Explore our key areas of action and the evidence behind them.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {initiatives.map((i) => (
            <div key={i.id} id={i.slug} className="card overflow-hidden">
              <Image
                src={i.image}
                alt={i.title}
                width={800}
                height={500}
                className="h-44 w-full object-cover"
              />
              <div className="space-y-2 p-4">
                <h3 className="text-lg font-bold">{i.title}</h3>
                <p className="text-sm text-brand-gray">{i.summary}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {i.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-black/10 px-2 py-0.5 text-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
