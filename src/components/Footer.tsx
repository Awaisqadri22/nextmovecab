import Link from "next/link";

const PHONE = "+46737493339";
const PHONE_TEL = "tel:+46737493339";
const WHATSAPP = "https://api.whatsapp.com/send?phone=46737493339";

const exploreLinks = [
  { href: "/#book-now", label: "Book now" },
  { href: "/#need-ride-now", label: "Need a ride now" },
  { href: "/#testimonials", label: "Customer reviews" },
  { href: "/#contact-us", label: "Contact" },
] as const;

const serviceLinks = [
  { href: "/#book-now", label: "City → Arlanda" },
  { href: "/#book-now", label: "Arlanda → City" },
  { href: "/#book-now", label: "City tours" },
  { href: "/#book-now", label: "Custom routes" },
] as const;

function LogoMark() {
  return (
    <div
      className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/35 bg-accent/10 text-sm font-bold tracking-tight text-accent shadow-[0_0_24px_-4px_rgba(61,214,198,0.45)]"
      aria-hidden
    >
      NM
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-border bg-[#070b11]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage: `linear-gradient(to right, rgba(148,163,184,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148,163,184,0.06) 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-[min(90vw,42rem)] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6 pb-10 pt-14 sm:pt-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="flex items-start gap-4">
              <LogoMark />
              <div>
                <p className="text-lg font-bold tracking-tight text-foreground">
                  Next Move
                </p>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  Stockholm
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Tesla-only executive transfers, fixed airport pricing, and
              door-to-door service across Stockholm — clear pricing, calm
              interiors, and dispatch you can reach anytime.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {["5.0 rated", "24/7 dispatch", "Licensed & insured"].map(
                (t) => (
                  <li
                    key={t}
                    className="rounded-full border border-border/80 bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm"
                  >
                    {t}
                  </li>
                ),
              )}
            </ul>
          </div>

          <nav
            className="lg:col-span-2"
            aria-label="Explore"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Explore
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              {exploreLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-foreground/90 transition hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-3" aria-label="Services">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Services
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              {serviceLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-foreground/90 transition hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div
            id="contact-us"
            className="scroll-mt-28 rounded-2xl border border-border/90 bg-card/50 p-6 shadow-lg shadow-black/20 backdrop-blur-md sm:p-7 lg:col-span-3"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Get in touch
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Call, WhatsApp, or book online — we respond fast and confirm your
              pickup window.
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <a
                href={PHONE_TEL}
                className="group inline-flex items-center gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm font-semibold text-foreground transition hover:border-accent/45 hover:bg-muted/60"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent transition group-hover:scale-105">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden
                  >
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .8 3a2 2 0 0 1-.4 2.1L8.2 10a16 16 0 0 0 5.8 5.8l1.2-1.3a2 2 0 0 1 2.1-.4 12.7 12.7 0 0 0 3 .8 2 2 0 0 1 1.7 2Z" />
                  </svg>
                </span>
                {PHONE}
              </a>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm font-semibold text-foreground transition hover:border-accent/45 hover:bg-muted/60"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent transition group-hover:scale-105">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden
                  >
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .8 3a2 2 0 0 1-.4 2.1L8.2 10a16 16 0 0 0 5.8 5.8l1.2-1.3a2 2 0 0 1 2.1-.4 12.7 12.7 0 0 0 3 .8 2 2 0 0 1 1.7 2Z" />
                  </svg>
                </span>
                WhatsApp chat
              </a>
              <Link
                href="/#book-now"
                className="inline-flex items-center justify-center rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
              >
                Book online
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-border/80 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs leading-relaxed text-muted-foreground">
            © {year} Next Move · Stockholm, Sweden. All rights reserved.
          </p>
          <p className="max-w-xs text-xs text-muted-foreground sm:text-right">
            Zero-emission luxury transfers · Fixed prices on popular routes ·
            Professional English-speaking drivers
          </p>
        </div>
      </div>
    </footer>
  );
}
