import Container from "@/components/Container";
import Image from "next/image";
import { partners } from "@/data/partners";

export default function MembersPage() {
  return (
    <section className="py-12">
      <Container>
        <h1 className="text-3xl">Members & Partners</h1>
        <p className="mt-3 max-w-3xl text-brand-gray">
          We convene members across sectors to deliver impact together.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {partners.map((p) => (
            <a
              key={p.name}
              href={p.url}
              className="card flex items-center justify-center p-4"
              target="_blank"
              rel="noreferrer"
            >
              <Image src={p.logo} alt={p.name} width={180} height={60} />
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
