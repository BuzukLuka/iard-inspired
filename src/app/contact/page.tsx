"use client";
import Container from "@/components/Container";
import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <section className="py-12">
      <Container>
        <h1 className="text-3xl">Contact</h1>
        <p className="mt-3 max-w-3xl text-brand-gray">
          We welcome collaboration and feedback.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="card mx-auto mt-8 max-w-xl space-y-4 p-4"
        >
          <div>
            <label className="mb-1 block text-sm font-semibold">Name</label>
            <input
              className="w-full rounded-xl border-2 border-black/20 p-2"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold">Email</label>
            <input
              type="email"
              className="w-full rounded-xl border-2 border-black/20 p-2"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold">Message</label>
            <textarea
              className="min-h-[120px] w-full rounded-xl border-2 border-black/20 p-2"
              required
            />
          </div>
          <button className="btn btn-primary">Send</button>
          {sent && (
            <p className="text-sm text-green-700">
              Thanks! We’ll get back to you shortly.
            </p>
          )}
        </form>
      </Container>
    </section>
  );
}
