"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { createPortal } from "react-dom";
import nav from "@/data/navigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  // Scroll lock + inert
  useEffect(() => {
    const main = document.getElementById("main");
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    if (open) {
      const sbw = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (sbw > 0) document.body.style.paddingRight = `${sbw}px`;
      main?.setAttribute("inert", "");
      if (main) (main as HTMLElement).style.pointerEvents = "none";
    } else {
      document.body.style.overflow = prevOverflow || "";
      document.body.style.paddingRight = prevPaddingRight || "";
      main?.removeAttribute("inert");
      if (main) (main as HTMLElement).style.pointerEvents = "";
    }
    return () => {
      document.body.style.overflow = prevOverflow || "";
      document.body.style.paddingRight = prevPaddingRight || "";
      main?.removeAttribute("inert");
      if (main) (main as HTMLElement).style.pointerEvents = "";
    };
  }, [open]);

  // Accessibility
  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey, { passive: true });
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Close on route change
  useEffect(() => setOpen(false), [pathname]);

  // Close when ≥ md
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener?.("change", onChange);
    if (mq.matches) setOpen(false);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  // Portal mount
  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null);
  useEffect(() => {
    const el = document.createElement("div");
    el.id = "mobile-menu-root";
    document.body.appendChild(el);
    setPortalEl(el);

    // зөвхөн remove хийдэг cleanup
    return () => {
      document.body.removeChild(el);
    };
  }, []);

  const overlay = (
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
      <div className="absolute inset-0  backdrop-blur-sm" />
      <div
        id="mobile-menu"
        ref={panelRef}
        tabIndex={-1}
        className={`fixed right-0 top-0 h-full w-[82%] max-w-[360px] bg-black/50
          shadow-2xl border-l border-[color:var(--border)]
          focus:outline-none overscroll-contain
          transform transition-transform duration-300 will-change-transform
          ${open ? "translate-x-0" : "translate-x-full"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[color:var(--border)] p-4">
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={() => setOpen(false)}
          >
            <Image src="/logo.png" alt="Logo" width={28} height={28} />
            <span className="font-extrabold">Alliance Hub</span>
          </Link>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="icon-btn"
            type="button"
          >
            <X />
          </button>
        </div>

        <nav className="p-4">
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
        </nav>
      </div>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 header-glass">
      <div className="site-container flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Logo" width={40} height={40} priority />
          <span className="text-xl font-extrabold leading-none">
            Alliance <span className="text-[color:var(--accent)]">Hub</span>
          </span>
        </Link>

        {/* Desktop nav */}
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

        {/* Mobile hamburger — зөвхөн < md */}
        <button
          className="inline-flex md:!hidden icon-btn"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="mobile-menu"
          type="button"
        >
          <Menu />
        </button>
      </div>

      {portalEl ? createPortal(overlay, portalEl) : null}
    </header>
  );
}
