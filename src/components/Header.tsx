"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const PHONE_E164 = "+46737493339";
const PHONE_WA_DIGITS = "46737493339";
const TEL_HREF = `tel:${PHONE_E164}`;
const WHATSAPP_HREF = `https://api.whatsapp.com/send?phone=${PHONE_WA_DIGITS}`;

const iconClass = "h-5 w-5 shrink-0 sm:h-[1.35rem] sm:w-[1.35rem]";

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function LogoBlock({
  compactSubtitle,
  onNavigate,
}: {
  compactSubtitle?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      className="group flex min-w-0 flex-1 items-center gap-2.5 rounded-xl border border-transparent py-1 pr-2 transition hover:border-border hover:bg-muted/40 sm:gap-3 sm:flex-none sm:px-1"
    >
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent/40 bg-accent/10 text-xs font-bold tracking-tight text-accent shadow-[0_0_24px_-6px_rgba(61,214,198,0.5)] sm:h-12 sm:w-12 sm:text-sm"
        aria-hidden
      >
        NM
      </span>
      <span className="min-w-0 text-left leading-tight">
        <span className="block truncate text-base font-bold tracking-tight text-foreground sm:text-lg md:text-xl">
          Next Move
        </span>
        <span
          className={`mt-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-accent sm:text-xs sm:tracking-[0.2em] ${compactSubtitle ? "hidden sm:block" : ""}`}
        >
          Stockholm · Tesla fleet
        </span>
      </span>
    </Link>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((o) => !o), []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const linkClass =
    "inline-flex min-h-[48px] w-full items-center gap-3 rounded-xl border border-border bg-muted/30 px-4 py-3 text-base font-semibold tracking-tight text-foreground transition hover:border-accent/45 hover:bg-muted/60 hover:text-accent active:scale-[0.99] motion-reduce:active:scale-100";

  const desktopLinkClass =
    "inline-flex items-center gap-2.5 rounded-lg px-1 py-1 text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-accent sm:text-base";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.75)] backdrop-blur-xl">
      <div
        className="h-[3px] w-full bg-gradient-to-r from-transparent via-accent to-transparent opacity-90"
        aria-hidden
      />

      <div className="mx-auto w-full max-w-[min(100%,90rem)] px-4 sm:px-8 lg:px-12">
        <nav
          className="flex items-center justify-between gap-3 py-4 sm:gap-6 sm:py-5 lg:py-6"
          aria-label="Primary"
        >
          <LogoBlock
            compactSubtitle
            onNavigate={menuOpen ? closeMenu : undefined}
          />

          <div className="hidden items-center gap-x-8 md:flex lg:gap-x-10">
            <Link href="/#book-now" className={desktopLinkClass}>
              <svg
                className={iconClass}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M8 3v4M16 3v4M3 10h18" />
              </svg>
              Book now
            </Link>
            <Link href="/#contact-us" className={desktopLinkClass}>
              <svg
                className={iconClass}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path d="M4 6h16v12H4z" />
                <path d="m4 7 8 6 8-6" />
              </svg>
              Contact
            </Link>
            <a href={TEL_HREF} className={`relative z-20 ${desktopLinkClass}`}>
              <svg
                className={iconClass}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path d="M20 12a8 8 0 1 0-14.5 4.6L4 21l4.6-1.4A8 8 0 1 0 20 12Z" />
                <path d="M9.5 9.5c.3 2.2 2 3.9 4.2 4.2" />
              </svg>
              <span className="tabular-nums">{PHONE_E164}</span>
              <span className="sr-only"> — opens the phone dialer</span>
            </a>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative z-10 inline-flex items-center gap-2.5 rounded-full border border-accent/35 bg-accent/10 px-3 py-2 text-sm font-semibold tracking-tight text-accent transition hover:border-accent/60 hover:bg-accent/15 sm:px-4 sm:text-base`}
            >
              <svg
                className={iconClass}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .8 3a2 2 0 0 1-.4 2.1L8.2 10a16 16 0 0 0 5.8 5.8l1.2-1.3a2 2 0 0 1 2.1-.4 12.7 12.7 0 0 0 3 .8 2 2 0 0 1 1.7 2Z" />
              </svg>
              WhatsApp
            </a>
          </div>

          <button
            type="button"
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-border bg-muted/70 px-3.5 text-foreground shadow-sm transition hover:border-accent/50 hover:bg-muted hover:text-accent md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={toggleMenu}
          >
            {menuOpen ? (
              <CloseIcon className="h-[22px] w-[22px]" />
            ) : (
              <MenuIcon className="h-[22px] w-[22px]" />
            )}
            <span className="text-sm font-semibold tracking-tight">
              {menuOpen ? "Close" : "Menu"}
            </span>
          </button>
        </nav>

        <div
          id="mobile-nav"
          role="region"
          aria-label="Mobile navigation"
          aria-hidden={!menuOpen}
          className={`md:hidden overflow-hidden border-border/80 transition-[max-height,opacity] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none ${
            menuOpen
              ? "max-h-[min(75vh,26rem)] border-t opacity-100"
              : "max-h-0 border-t-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-2 px-0 pb-5 pt-3">
            <p className="px-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Quick links
            </p>
            <Link href="/#book-now" className={linkClass} onClick={closeMenu}>
              <svg
                className={iconClass}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M8 3v4M16 3v4M3 10h18" />
              </svg>
              Book now
            </Link>
            <Link href="/#contact-us" className={linkClass} onClick={closeMenu}>
              <svg
                className={iconClass}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path d="M4 6h16v12H4z" />
                <path d="m4 7 8 6 8-6" />
              </svg>
              Contact
            </Link>
            <a href={TEL_HREF} className={linkClass} onClick={closeMenu}>
              <svg
                className={iconClass}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path d="M20 12a8 8 0 1 0-14.5 4.6L4 21l4.6-1.4A8 8 0 1 0 20 12Z" />
                <path d="M9.5 9.5c.3 2.2 2 3.9 4.2 4.2" />
              </svg>
              <span className="tabular-nums">{PHONE_E164}</span>
              <span className="sr-only"> — opens the phone dialer</span>
            </a>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkClass} border-accent/40 bg-accent/10 text-accent hover:border-accent/60 hover:bg-accent/15 hover:text-accent`}
              onClick={closeMenu}
            >
              <svg
                className={iconClass}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .8 3a2 2 0 0 1-.4 2.1L8.2 10a16 16 0 0 0 5.8 5.8l1.2-1.3a2 2 0 0 1 2.1-.4 12.7 12.7 0 0 0 3 .8 2 2 0 0 1 1.7 2Z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
