import Container from "@/components/Container";
import { resources } from "@/data/resources";
import ResourceCard from "@/components/ResourceCard";

export default function ResourcesPage() {
  return (
    <section className="py-12">
      <Container>
        <h1 className="text-3xl">Resources</h1>
        <p className="mt-3 max-w-3xl text-brand-gray">
          Reports, toolkits, briefs, and guidelines for practitioners and
          policymakers.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((r) => (
            <ResourceCard key={r.id} r={r} />
          ))}
        </div>
      </Container>
    </section>
  );
}
