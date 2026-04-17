import Link from "next/link";

const PHONE_E164 = "+46737493339";
const PHONE_WA_DIGITS = "46737493339";
const TEL_HREF = `tel:${PHONE_E164}`;
const WHATSAPP_HREF = `https://api.whatsapp.com/send?phone=${PHONE_WA_DIGITS}`;

const iconClass = "h-5 w-5 shrink-0 sm:h-[1.35rem] sm:w-[1.35rem]";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.75)] backdrop-blur-xl">
      <div
        className="h-[3px] w-full bg-gradient-to-r from-transparent via-accent to-transparent opacity-90"
        aria-hidden
      />
      <nav
        className="mx-auto flex w-full max-w-[min(100%,90rem)] flex-col items-stretch gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-8 sm:py-5 lg:px-12 lg:py-6"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-xl border border-transparent px-1 py-0.5 transition hover:border-border hover:bg-muted/40"
        >
          <span
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/40 bg-accent/10 text-sm font-bold tracking-tight text-accent shadow-[0_0_28px_-6px_rgba(61,214,198,0.55)] sm:h-12 sm:w-12 sm:text-base"
            aria-hidden
          >
            NM
          </span>
          <span className="text-left leading-tight">
            <span className="block text-lg font-bold tracking-tight text-foreground sm:text-xl">
              Next Move
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent sm:text-[0.7rem]">
              Stockholm · Tesla fleet
            </span>
          </span>
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:justify-end sm:gap-x-8 lg:gap-x-10">
          <Link
            href="/#book-now"
            className="inline-flex items-center gap-2.5 rounded-lg px-1 py-1 text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-accent sm:text-base"
          >
            <svg
              className={iconClass}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M8 3v4M16 3v4M3 10h18" />
            </svg>
            Book now
          </Link>
          <Link
            href="/#contact-us"
            className="inline-flex items-center gap-2.5 rounded-lg px-1 py-1 text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-accent sm:text-base"
          >
            <svg
              className={iconClass}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M4 6h16v12H4z" />
              <path d="m4 7 8 6 8-6" />
            </svg>
            Contact
          </Link>
          <a
            href={TEL_HREF}
            className="relative z-20 inline-flex w-full min-h-[44px] items-center justify-center gap-2.5 rounded-lg px-2 py-2 text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-accent sm:w-auto sm:justify-start sm:px-1 sm:py-1 sm:text-base"
          >
            <svg
              className={iconClass}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
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
            className="relative z-10 inline-flex w-full min-h-[44px] items-center justify-center gap-2.5 rounded-full border border-accent/35 bg-accent/10 px-3 py-2 text-sm font-semibold tracking-tight text-accent transition hover:border-accent/60 hover:bg-accent/15 sm:w-auto sm:px-4 sm:text-base"
          >
            <svg
              className={iconClass}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .8 3a2 2 0 0 1-.4 2.1L8.2 10a16 16 0 0 0 5.8 5.8l1.2-1.3a2 2 0 0 1 2.1-.4 12.7 12.7 0 0 0 3 .8 2 2 0 0 1 1.7 2Z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </nav>
    </header>
  );
}
