"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import NeedRideNowSection from "@/components/NeedRideNowSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export type RouteId = "city-arlanda" | "arlanda-city" | "city-tour" | "custom";

type Slide = {
  title: string;
  price: string;
  priceNote?: string;
  description: string;
  features: string[];
  tagline?: string;
};

const ROUTE_TABS: { id: RouteId; label: string; shortLabel: string }[] = [
  { id: "city-arlanda", label: "City to Arlanda", shortLabel: "→ Arlanda" },
  { id: "arlanda-city", label: "Arlanda to City", shortLabel: "← City" },
  { id: "city-tour", label: "City tour", shortLabel: "Tour" },
  { id: "custom", label: "Custom tour", shortLabel: "Custom" },
];

const CAROUSELS: Record<RouteId, Slide[]> = {
  "city-arlanda": [
    {
      title: "City to Arlanda",
      price: "595",
      priceNote: "SEK fixed",
      description:
        "Luxury Tesla transfer from Stockholm city to Arlanda Airport.",
      features: [
        "Door to door",
        "Tesla Model S 2024",
        "Premium service",
        "On-time guarantee",
      ],
      tagline: "Tesla Model S 2024 • Zero emissions • Professional service",
    },
    {
      title: "Night & early flights",
      price: "595",
      priceNote: "SEK fixed",
      description:
        "Same fixed price for departures 05:00–23:59 within our service area.",
      features: [
        "Flight monitoring",
        "Meet at your door",
        "Luggage help",
        "Child seats on request",
      ],
      tagline: "No surge pricing • Licensed & insured",
    },
    {
      title: "Business class transfer",
      price: "695",
      priceNote: "SEK from CBD",
      description:
        "Priority routing and extended wait time for executive pickups.",
      features: [
        "Wi‑Fi ready cabin",
        "Quiet ride",
        "Receipt for travel",
        "Dedicated dispatcher",
      ],
      tagline: "Invoice available • Corporate accounts",
    },
  ],
  "arlanda-city": [
    {
      title: "Arlanda to City",
      price: "650",
      priceNote: "SEK fixed",
      description:
        "Meet & greet at Arlanda with Tesla transfer to Stockholm city center.",
      features: [
        "45–60 min typical",
        "Direct route",
        "Flight tracking",
        "Fixed price",
      ],
      tagline: "Fixed price • No surge • All inclusive",
    },
    {
      title: "Terminal pickup",
      price: "650",
      priceNote: "SEK fixed",
      description:
        "We coordinate the pickup hall and car park based on your arrival terminal.",
      features: [
        "SMS driver contact",
        "Sign with your name",
        "Extra stop on route",
        "Large luggage OK",
      ],
      tagline: "Professional drivers • Licensed vehicles",
    },
  ],
  "city-tour": [
    {
      title: "Stockholm city tour",
      price: "1 500",
      priceNote: "SEK / 4 h",
      description:
        "Curated city exploration in a Tesla — Old Town, waterfront, and viewpoints.",
      features: [
        "Up to 4 hours",
        "Photo stops",
        "Local insights",
        "Flexible route",
      ],
      tagline: "Private tour • Your pace • Zero emissions",
    },
    {
      title: "Half-day highlights",
      price: "950",
      priceNote: "SEK / 2 h",
      description:
        "Compact loop covering Gamla Stan, Djurgården approach, and city panoramas.",
      features: [
        "2 hour loop",
        "Hotel pickup",
        "Drop-off flexible",
        "Bottled water",
      ],
      tagline: "Perfect between meetings or cruise stops",
    },
  ],
  custom: [
    {
      title: "Custom route",
      price: "Quote",
      description:
        "Any Stockholm destination — events, multiple stops, or bespoke itineraries.",
      features: [
        "Hourly or point-to-point",
        "Multi-stop routes",
        "Event & wedding",
        "English-speaking drivers",
      ],
      tagline: "Tell us your plan — we confirm price before you book",
    },
    {
      title: "Regional run",
      price: "Quote",
      description:
        "Uppsala, Västerås, Norrköping direction — long-distance comfort in a Tesla.",
      features: [
        "Flat or hourly pricing",
        "Return trips",
        "Wait & return",
        "Corporate travel",
      ],
      tagline: "Licensed long-distance taxi where applicable",
    },
  ],
};

const BOOK_CARDS: {
  id: RouteId;
  title: string;
  routeLine: string;
  price: string;
  priceUnit?: string;
  badge?: string;
}[] = [
  {
    id: "arlanda-city",
    title: "Airport pickup",
    routeLine: "Arlanda → City center",
    price: "650",
    priceUnit: "SEK",
    badge: "Popular",
  },
  {
    id: "city-arlanda",
    title: "Airport drop-off",
    routeLine: "City center → Arlanda",
    price: "595",
    priceUnit: "SEK",
  },
  {
    id: "city-tour",
    title: "City tour",
    routeLine: "4 hours city exploration",
    price: "1 500",
    priceUnit: "SEK",
  },
  {
    id: "custom",
    title: "Custom route",
    routeLine: "Any Stockholm destination",
    price: "Quote",
  },
];

export default function HeroServicesSection() {
  const [activeRoute, setActiveRoute] = useState<RouteId>("city-arlanda");
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = CAROUSELS[activeRoute];
  const total = slides.length;
  const safeIndex = Math.min(slideIndex, Math.max(0, total - 1));
  const slide = slides[safeIndex] ?? slides[0];

  const selectRoute = useCallback((id: RouteId) => {
    setActiveRoute(id);
    setSlideIndex(0);
  }, []);

  const goPrev = useCallback(() => {
    setSlideIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    setSlideIndex((i) => (i + 1) % total);
  }, [total]);

  return (
    <div className="w-full bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-muted text-foreground">
        <div
          className="pointer-events-none absolute inset-0 opacity-90"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 55% at 50% -25%, var(--hero-glow-a), transparent), radial-gradient(ellipse 55% 45% at 100% 0%, var(--hero-glow-b), transparent)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-14 sm:pb-20 sm:pt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Next Move Stockholm
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl sm:leading-[1.08]">
            Stockholm&apos;s Tesla-only taxi fleet
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Experience luxury transportation in our Tesla Model S 2024 fleet.
            Premium service with zero emissions and ultimate comfort.
          </p>
        </div>
      </section>

      {/* Popular services — route tabs + carousel */}
      <section
        className="relative z-10 -mt-10 mx-auto max-w-6xl px-6 pb-6 sm:-mt-12"
        aria-labelledby="popular-services-heading"
      >
        <div className="rounded-2xl border border-border bg-card p-5 shadow-xl shadow-black/30 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                id="popular-services-heading"
                className="text-xl font-bold tracking-tight text-card-foreground sm:text-2xl"
              >
                Popular services
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Pick a route — swipe or use arrows to browse packages.
              </p>
            </div>
            <p
              className="text-sm font-medium text-muted-foreground"
              aria-live="polite"
            >
              {safeIndex + 1} of {total}
            </p>
          </div>

          <div
            className="mt-6 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Service routes"
          >
            {ROUTE_TABS.map((tab) => {
              const selected = activeRoute === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  id={`tab-${tab.id}`}
                  aria-controls={`panel-${tab.id}`}
                  onClick={() => selectRoute(tab.id)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    selected
                      ? "bg-accent text-accent-foreground shadow-[0_0_0_1px_rgba(61,214,198,0.35)]"
                      : "border border-border bg-muted text-muted-foreground hover:border-accent/40 hover:text-foreground"
                  }`}
                >
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.shortLabel}</span>
                </button>
              );
            })}
          </div>

          <div
            id={`panel-${activeRoute}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeRoute}`}
            className="mt-8"
          >
            <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,280px)] lg:items-stretch">
              <div className="relative min-h-[220px] overflow-hidden rounded-xl bg-border/50 sm:min-h-[260px]">
                <div
                  key={`${activeRoute}-${safeIndex}`}
                  className="absolute inset-0 flex flex-col justify-end bg-gradient-to-br from-card via-background to-muted p-6 sm:p-8"
                >
                  <div className="max-w-xl">
                    <h3 className="text-2xl font-bold text-foreground sm:text-3xl">
                      {slide.title}
                    </h3>
                    <div className="mt-3 flex flex-wrap items-baseline gap-2">
                      <span className="text-4xl font-bold tabular-nums text-accent sm:text-5xl">
                        {slide.price}
                      </span>
                      {slide.priceNote ? (
                        <span className="text-sm font-medium text-muted-foreground">
                          {slide.priceNote}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {slide.description}
                    </p>
                    <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                      {slide.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-center gap-2 text-sm text-foreground/90"
                        >
                          <span
                            className="inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                            aria-hidden
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                    {slide.tagline ? (
                      <p className="mt-6 text-xs text-muted-foreground sm:text-sm">
                        {slide.tagline}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-4">
                <div className="flex justify-center gap-2 lg:justify-end">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Go to slide ${i + 1}`}
                      onClick={() => setSlideIndex(i)}
                      className={`h-2 rounded-full transition-all ${
                        i === safeIndex
                          ? "w-8 bg-accent"
                          : "w-2 bg-border hover:bg-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={goPrev}
                    className="flex flex-1 items-center justify-center rounded-xl border border-border bg-muted py-3 text-sm font-semibold text-foreground transition hover:border-accent/50 hover:bg-muted/80"
                    aria-label="Previous slide"
                  >
                    ← Prev
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="flex flex-1 items-center justify-center rounded-xl border border-border bg-muted py-3 text-sm font-semibold text-foreground transition hover:border-accent/50 hover:bg-muted/80"
                    aria-label="Next slide"
                  >
                    Next →
                  </button>
                </div>
                <Link
                  href="#book-now"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-accent px-5 py-3.5 text-center text-sm font-semibold text-accent-foreground transition hover:opacity-90"
                >
                  Book your ride
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book your ride — grid like CabX */}
      <section
        id="book-now"
        className="mx-auto max-w-6xl px-6 py-12 sm:py-16"
        aria-labelledby="book-heading"
      >
        <h2
          id="book-heading"
          className="text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
        >
          Book your ride
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-muted-foreground sm:text-base">
          Choose your service and get instant booking.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BOOK_CARDS.map((card) => (
            <article
              key={card.title}
              className="relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:border-accent/35 hover:shadow-md hover:shadow-accent/5"
            >
              {card.badge ? (
                <span className="absolute right-4 top-4 rounded-full bg-accent/20 px-2.5 py-0.5 text-xs font-semibold text-accent">
                  {card.badge}
                </span>
              ) : null}
              <h3 className="pr-16 text-lg font-bold text-card-foreground">
                {card.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {card.routeLine}
              </p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-3xl font-bold tabular-nums text-accent">
                  {card.price}
                </span>
                {card.priceUnit ? (
                  <span className="text-sm font-medium text-muted-foreground">
                    {card.priceUnit}
                  </span>
                ) : null}
              </div>
              <Link
                href="#contact-us"
                className="mt-auto inline-flex w-full items-center justify-center rounded-xl border border-border py-2.5 text-sm font-semibold text-foreground transition hover:border-accent/40 hover:bg-muted"
              >
                Book {card.title.toLowerCase()}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <TestimonialsSection />

      <NeedRideNowSection />
    </div>
  );
}
