"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const PHONE_E164 = "+46737493339";
const PHONE_TEL = "tel:+46737493339";
const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=46737493339";

const CHIPS = [
  "24/7 available",
  "Instant response",
  "Tesla Model S 2024",
] as const;

const STATS = [
  { label: "Avg. response", value: "~2 min" },
  { label: "Typical pickup", value: "From 5 min" },
  { label: "Airport fixed", value: "From 595 SEK" },
] as const;

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
}

function useReveal() {
  const ref = useRef<HTMLElement | null>(null);
  const [intersected, setIntersected] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const visible = reducedMotion || intersected;

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setIntersected(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reducedMotion]);

  return { ref, visible, reducedMotion };
}

function Reveal({
  children,
  index,
  visible,
  className = "",
}: {
  children: React.ReactNode;
  index: number;
  visible: boolean;
  className?: string;
}) {
  return (
    <div
      className={`transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${className} ${
        visible
          ? "translate-y-0 opacity-100 blur-0"
          : "translate-y-8 opacity-0 blur-[1px] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:blur-0"
      }`}
      style={{
        transitionDelay: visible ? `${index * 85}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}

export default function NeedRideNowSection() {
  const { ref, visible, reducedMotion } = useReveal();

  return (
    <section
      ref={ref}
      id="need-ride-now"
      className="relative scroll-mt-28 overflow-hidden border-t border-border bg-muted/50 py-16 sm:py-24"
      aria-labelledby="need-ride-heading"
    >
      <div
        className="pointer-events-none absolute -left-1/4 top-1/2 h-[min(80vw,520px)] w-[min(80vw,520px)] -translate-y-1/2 sm:-left-20"
        aria-hidden
      >
        <div
          className="h-full w-full rounded-full bg-accent/10 blur-3xl"
          style={
            reducedMotion
              ? undefined
              : { animation: "nm-breathe 7s ease-in-out infinite" }
          }
        />
      </div>
      <div
        className="pointer-events-none absolute -right-1/4 bottom-0 h-[min(70vw,420px)] w-[min(70vw,420px)] translate-y-1/3 sm:right-0"
        aria-hidden
      >
        <div
          className="h-full w-full rounded-full bg-[var(--hero-glow-b)] blur-3xl"
          style={
            reducedMotion
              ? undefined
              : { animation: "nm-breathe 9s ease-in-out infinite 1.5s" }
          }
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <Reveal index={0} visible={visible}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Ready when you are
              </p>
              <h2
                id="need-ride-heading"
                className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.35rem] lg:leading-tight"
              >
                Need a Tesla ride right now?
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Call us directly or book online for immediate pickup anywhere in
                Stockholm. Licensed drivers, fixed airport pricing, and a
                cabin built for calm.
              </p>
            </Reveal>

            <Reveal index={1} visible={visible} className="mt-8">
              <ul className="flex flex-wrap gap-2">
                {CHIPS.map((label) => (
                  <li
                    key={label}
                    className="rounded-full border border-border bg-card/80 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm sm:text-sm"
                  >
                    {label}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal index={2} visible={visible} className="mt-10">
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-border bg-background/60 px-4 py-3 text-center backdrop-blur-sm transition-colors duration-300 hover:border-accent/30"
                  >
                    <dt className="text-xs font-medium text-muted-foreground">
                      {s.label}
                    </dt>
                    <dd className="mt-1 text-lg font-bold tabular-nums text-accent">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal index={3} visible={visible}>
            <div className="relative rounded-2xl border border-border/90 bg-card/70 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-60 motion-reduce:hidden"
                aria-hidden
                style={{
                  background:
                    "linear-gradient(120deg, transparent 40%, rgba(61,214,198,0.08) 50%, transparent 60%)",
                  backgroundSize: "200% 100%",
                  animation: "nm-shimmer 4.5s ease-in-out infinite",
                }}
              />
              <div className="relative flex flex-col gap-4">
                <a
                  href={PHONE_TEL}
                  className="group relative flex flex-col overflow-hidden rounded-xl bg-accent px-5 py-5 text-accent-foreground transition-transform duration-200 hover:scale-[1.02] active:scale-[0.99] motion-reduce:hover:scale-100 motion-reduce:active:scale-100"
                >
                  <span className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide opacity-90">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent-foreground/10 transition-transform duration-300 group-hover:scale-110 motion-reduce:group-hover:scale-100">
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden
                      >
                        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .8 3a2 2 0 0 1-.4 2.1L8.2 10a16 16 0 0 0 5.8 5.8l1.2-1.3a2 2 0 0 1 2.1-.4 12.7 12.7 0 0 0 3 .8 2 2 0 0 1 1.7 2Z" />
                      </svg>
                    </span>
                    Call now
                  </span>
                  <span className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                    {PHONE_E164}
                  </span>
                  <span className="mt-1 text-sm opacity-80">
                    Tap to dial — fastest way to reach dispatch
                  </span>
                </a>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center gap-2 rounded-xl border border-border bg-muted/80 py-3.5 text-sm font-semibold text-foreground transition-all duration-200 hover:border-accent/50 hover:bg-muted hover:shadow-[0_0_0_1px_rgba(61,214,198,0.2)] active:scale-[0.98] motion-reduce:active:scale-100"
                  >
                    <svg
                      className="h-5 w-5 text-accent transition-transform duration-300 group-hover:scale-110 motion-reduce:group-hover:scale-100"
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
                  <Link
                    href="#book-now"
                    className="group flex items-center justify-center gap-2 rounded-xl border border-border bg-muted/80 py-3.5 text-sm font-semibold text-foreground transition-all duration-200 hover:border-accent/50 hover:bg-muted hover:shadow-[0_0_0_1px_rgba(61,214,198,0.2)] active:scale-[0.98] motion-reduce:active:scale-100"
                  >
                    <svg
                      className="h-5 w-5 text-accent transition-transform duration-300 group-hover:scale-110 motion-reduce:group-hover:scale-100"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden
                    >
                      <rect x="3" y="5" width="18" height="16" rx="2" />
                      <path d="M8 3v4M16 3v4M3 10h18" />
                    </svg>
                    Book online
                  </Link>
                </div>

                <p className="text-center text-xs text-muted-foreground">
                  Prefer email? Use{" "}
                  <Link
                    href="#contact-us"
                    className="font-medium text-accent underline-offset-2 hover:underline"
                  >
                    contact
                  </Link>{" "}
                  below — we reply quickly.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
