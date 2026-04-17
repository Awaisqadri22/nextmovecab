import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b border-border bg-card/70 backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-center gap-8 px-6 py-4 text-sm font-semibold text-foreground sm:gap-10">
        <Link
          href="#book-now"
          className="inline-flex items-center gap-2 transition-colors hover:text-accent"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M8 3v4M16 3v4M3 10h18" />
          </svg>
          Book Now
        </Link>
        <Link
          href="#contact-us"
          className="inline-flex items-center gap-2 transition-colors hover:text-accent"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M4 6h16v12H4z" />
            <path d="m4 7 8 6 8-6" />
          </svg>
          Contact Us
        </Link>
        <a
          href="tel:+46737493339"
          className="inline-flex items-center gap-2 transition-colors hover:text-accent"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M20 12a8 8 0 1 0-14.5 4.6L4 21l4.6-1.4A8 8 0 1 0 20 12Z" />
            <path d="M9.5 9.5c.3 2.2 2 3.9 4.2 4.2" />
          </svg>
          WhatsApp
        </a>
        <a
          href="https://wa.me/46737493339"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 transition-colors hover:text-accent"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .8 3a2 2 0 0 1-.4 2.1L8.2 10a16 16 0 0 0 5.8 5.8l1.2-1.3a2 2 0 0 1 2.1-.4 12.7 12.7 0 0 0 3 .8 2 2 0 0 1 1.7 2Z" />
          </svg>
          +46737493339
        </a>
      </nav>
    </header>
  );
}
