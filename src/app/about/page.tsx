import Container from "@/components/Container";

export default function AboutPage() {
  return (
    <section className="py-12">
      <Container>
        <h1 className="text-3xl">About Us</h1>
        <p className="mt-3 max-w-3xl text-brand-gray">
          We are a global alliance dedicated to reducing harmful drinking
          through evidence-based initiatives, transparent reporting, and
          collaborative partnerships. Our work spans policy, community programs,
          education, and road safety.
        </p>
      </Container>
    </section>
  );
}
