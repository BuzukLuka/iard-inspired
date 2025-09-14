"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import nav from "@/data/navigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Lock body scroll + inert main while open
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const main = document.getElementById("main"); // from layout.tsx
    if (open) {
      document.body.style.overflow = "hidden";
      main?.setAttribute("inert", ""); // block focus/click in modern browsers
      if (main) (main as HTMLElement).style.pointerEvents = "none"; // fallback
    } else {
      document.body.style.overflow = prevOverflow;
      main?.removeAttribute("inert");
      if (main) (main as HTMLElement).style.pointerEvents = "";
    }
    return () => {
      document.body.style.overflow = prevOverflow;
      main?.removeAttribute("inert");
      if (main) (main as HTMLElement).style.pointerEvents = "";
    };
  }, [open]);

  // Focus panel when opened (accessibility)
  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 header-glass">
      <div className="site-container flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Logo" width={40} height={40} priority />
          <span className="text-xl font-extrabold leading-none">
            Alliance <span className="text-[color:var(--accent)]">Hub</span>
          </span>
        </Link>

        {/* Desktop nav (md and up) */}
        <nav className="hidden md:flex items-center gap-6">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="nav-link">
              {n.label}
            </Link>
          ))}
          <Link href="/contact" className="btn btn-primary">
            Contact
          </Link>
        </nav>

        {/* Mobile hamburger (only < md); hide while drawer open */}
        <button
          className={`md:hidden icon-btn ${open ? "invisible" : ""}`}
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <Menu />
        </button>
      </div>

      {/* Overlay (always mounted for smooth animation) */}
      <div
        className={`fixed inset-0 z-[60] md:hidden transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
        onClick={() => setOpen(false)}
      >
        {/* Backdrop: darker + blur */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

        {/* Sliding panel (RIGHT SIDE) */}
        <div
          id="mobile-menu"
          ref={panelRef}
          tabIndex={-1}
          className={`mobile-drawer glass-panel
    focus:outline-none shadow-2xl border border-[color:var(--border)]
    right-0 left-auto
    transform transition-transform duration-300 will-change-transform
    ${open ? "translate-x-0" : "translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* header */}
          <div className="mb-4 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={() => setOpen(false)}
            >
              <Image src="/logo.png" alt="Logo" width={32} height={32} />
              <span className="font-extrabold">Alliance Hub</span>
            </Link>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="icon-btn"
            >
              <X />
            </button>
          </div>

          {/* nav links */}
          <ul className="space-y-2">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="block rounded-lg px-3 py-2 nav-item"
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <Link
              href="/contact"
              className="btn btn-primary w-full"
              onClick={() => setOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
