"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, User2 } from "lucide-react";
import nav from "@/data/navigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const closeAllModals = () => {
    setShowLoginModal(false);
    setShowSignupModal(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 header-glass">
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

            {/* Profile icon – opens LOGIN MODAL */}
            <button
              type="button"
              onClick={() => setShowLoginModal(true)}
              className="relative flex h-10 w-10 items-center justify-center
                         rounded-full border border-white/30 bg-black/50
                         hover:bg-white/10 transition-colors"
              aria-label="Нэвтрэх"
            >
              <User2 className="h-5 w-5 text-white/80" />
            </button>

            {/* Contact */}
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

        {/* MOBILE MENU */}
        <div
          className={`fixed inset-0 z-[60] md:hidden transition-opacity duration-300 ${
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 backdrop-blur-sm bg-black/40"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <div
            className={`fixed right-0 top-0 h-full w-[82%] max-w-[360px] bg-black/70
                        shadow-2xl border-l border-[color:var(--border)]
                        transform transition-transform duration-300
                        ${open ? "translate-x-0" : "translate-x-full"}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top */}
            <div className="flex items-center justify-between border-b border-[color:var(--border)] p-4">
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={() => setOpen(false)}
              >
                <Image src="/logo.png" alt="Logo" width={28} height={28} />
                <span className="font-extrabold">Alliance Hub</span>
              </Link>

              <button className="icon-btn" onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>

            {/* Nav Items */}
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

              {/* Mobile login/signup -> modals */}
              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  className="btn btn-secondary w-full"
                  onClick={() => {
                    setOpen(false);
                    setShowLoginModal(true);
                  }}
                >
                  Нэвтрэх
                </button>

                <button
                  type="button"
                  className="btn btn-primary w-full"
                  onClick={() => {
                    setOpen(false);
                    setShowSignupModal(true);
                  }}
                >
                  Бүртгүүлэх
                </button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* LOGIN MODAL */}
      {showLoginModal && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm"
            onClick={closeAllModals}
          />

          {/* Center card */}
          <div
            className="fixed left-1/2 top-1/2 z-[71]
                       w-full max-w-md -translate-x-1/2 -translate-y-1/2
                       rounded-2xl border border-white/10
                       bg-[#06060b]/95 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Нэвтрэх</h2>
              <button
                type="button"
                className="icon-btn"
                onClick={closeAllModals}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm text-white/70">И-мэйл</label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-[color:var(--accent)]"
                  placeholder="name@example.com"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-white/70">Нууц үг</label>
                <input
                  type="password"
                  className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-[color:var(--accent)]"
                  placeholder="••••••••"
                />
              </div>

              <button type="submit" className="btn btn-primary w-full">
                Нэвтрэх
              </button>
            </form>

            <div className="mt-4 text-center text-sm text-white/70">
              Бүртгүүлэх гэж байна уу?{" "}
              <button
                type="button"
                className="text-[color:var(--accent)] font-semibold hover:underline"
                onClick={() => {
                  setShowLoginModal(false);
                  setShowSignupModal(true);
                }}
              >
                Бүртгүүлэх
              </button>
            </div>
          </div>
        </>
      )}

      {/* SIGNUP MODAL */}
      {showSignupModal && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm"
            onClick={closeAllModals}
          />

          {/* Center card */}
          <div
            className="fixed left-1/2 top-1/2 z-[71]
                       w-full max-w-md -translate-x-1/2 -translate-y-1/2
                       rounded-2xl border border-white/10
                       bg-[#06060b]/95 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Бүртгүүлэх</h2>
              <button
                type="button"
                className="icon-btn"
                onClick={closeAllModals}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm text-white/70">Нэр</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-[color:var(--accent)]"
                  placeholder="Таны нэр"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-white/70">И-мэйл</label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-[color:var(--accent)]"
                  placeholder="name@example.com"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-white/70">Нууц үг</label>
                <input
                  type="password"
                  className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-[color:var(--accent)]"
                  placeholder="••••••••"
                />
              </div>

              <button type="submit" className="btn btn-primary w-full">
                Бүртгүүлэх
              </button>
            </form>

            <div className="mt-4 text-center text-sm text-white/70">
              Аль хэдийн бүртгэлтэй юу?{" "}
              <button
                type="button"
                className="text-[color:var(--accent)] font-semibold hover:underline"
                onClick={() => {
                  setShowSignupModal(false);
                  setShowLoginModal(true);
                }}
              >
                Нэвтрэх
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
