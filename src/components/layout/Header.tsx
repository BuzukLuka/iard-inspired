"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import nav from "@/data/navigation";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 header-glass">
        <div className="site-container flex items-center justify-between py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Logo" width={40} height={40} priority />
            <span className="text-xl font-extrabold leading-none">
              Alliance <span className="text-[color:var(--accent)]">Hub</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="nav-link">
                {n.label}
              </Link>
            ))}

            <Link
              href="https://learn.mfia.org.mn/login/index.php"
              className="btn btn-secondary"
            >
              Login
            </Link>

            <Link href="/contact" className="btn btn-primary">
              Contact
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="flex md:!hidden icon-btn"
            onClick={() => setOpen(true)}
          >
            <Menu />
          </button>
        </div>
      </header>

      {/* MOBILE FULLSCREEN MENU (always in DOM for smooth animation) */}
      <div
        className={`
          fixed inset-0 z-[90] md:hidden
          bg-black/70 backdrop-blur-md text-white
          transition-opacity duration-300 ease-out
          ${
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
        onClick={() => setOpen(false)} // хоосон хэсэг дээр дарвал хаана
      >
        {/* Panel – баруун талаас жигд слайдтай гарч ирнэ */}
        <div
          className={`
            ml-auto flex h-full w-[82%] max-w-[360px] flex-col
            bg-black/90 border-l border-white/10 shadow-2xl
            transform transition-transform duration-300 ease-out
            ${open ? "translate-x-0" : "translate-x-full"}
          `}
          onClick={(e) => e.stopPropagation()} // дотор нь дарахад битгий хааг
        >
          {/* Дээд мөр */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={() => setOpen(false)}
            >
              <Image src="/logo.png" alt="Logo" width={28} height={28} />
              <span className="font-extrabold">Alliance Hub</span>
            </Link>
            <button className="icon-btn" onClick={() => setOpen(false)}>
              <X className="text-white" />
            </button>
          </div>

          {/* Меню линкүүд */}
          <nav className="px-4 py-5 space-y-4">
            <ul className="space-y-2">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="block rounded-lg px-3 py-2 nav-item text-sm font-medium text-white/90"
                    onClick={() => setOpen(false)}
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Login */}
            <div className="pt-2">
              <a
                href="https://learn.mfia.org.mn/login/index.php"
                className="inline-flex rounded-full px-4 py-2 text-sm font-semibold text-[color:var(--accent)] bg-white/5 border border-white/15"
                onClick={() => setOpen(false)}
              >
                Login
              </a>
            </div>
          </nav>

          <div className="flex-1" />
        </div>
      </div>
    </>
  );
}
