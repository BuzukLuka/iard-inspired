import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-16 footer-glass">
      <div className="site-container py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <Image src="/logo.png" alt="Logo" width={36} height={36} />
            <p className="text-sm text-[color:var(--muted)]">
              Evidence-based initiatives and partnerships for responsible
              choices.
            </p>
          </div>

          <div>
            <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-[color:var(--muted)]">
              About
            </h4>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/about" className="link-underline">
                  Who we are
                </Link>
              </li>
              <li>
                <Link href="/members" className="link-underline">
                  Members & Partners
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-[color:var(--muted)]">
              Work
            </h4>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/initiatives" className="link-underline">
                  Initiatives
                </Link>
              </li>
              <li>
                <Link href="/resources" className="link-underline">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-[color:var(--muted)]">
              Contact
            </h4>
            <p className="text-sm text-[color:var(--muted)]">
              Have a question or want to collaborate?
            </p>
            <Link href="/contact" className="btn btn-ghost mt-3">
              Get in touch
            </Link>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-[color:var(--border)] pt-6 text-xs text-[color:var(--muted)]">
          <p>© {new Date().getFullYear()} Alliance Hub. All rights reserved.</p>
          <p>Built with Next.js & Tailwind</p>
        </div>
      </div>
    </footer>
  );
}
