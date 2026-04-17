const TESTIMONIALS = [
  {
    quote:
      "Exceptional service. Always on time, professional drivers, and transparent pricing. My go-to for airport transfers.",
    initials: "E",
    name: "Erik Andersson",
    role: "Business executive",
  },
  {
    quote:
      "Clean vehicles, reliable service, and no surprises with pricing. Perfect for Stockholm business trips.",
    initials: "A",
    name: "Anna Lindström",
    role: "Frequent traveler",
  },
  {
    quote:
      "We recommend Next Move to all our guests. Professional, punctual, and premium quality every time.",
    initials: "M",
    name: "Marcus Johansson",
    role: "Hotel manager",
  },
] as const;

const STATS = [
  { label: "Average rating", value: "5.0" },
  { label: "Happy customers", value: "1000+" },
  { label: "Service", value: "24/7" },
] as const;

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="scroll-mt-28 border-t border-border bg-muted/30 py-14 sm:py-20"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="testimonials-heading"
            className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            What our customers say
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Trusted by Stockholm&apos;s professionals and travelers.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <li key={t.name}>
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
                <blockquote className="flex-1">
                  <p className="text-sm leading-relaxed text-card-foreground sm:text-base">
                    <span className="text-accent" aria-hidden>
                      &ldquo;
                    </span>
                    {t.quote}
                    <span className="text-accent" aria-hidden>
                      &rdquo;
                    </span>
                  </p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-sm font-bold text-accent"
                    aria-hidden
                  >
                    {t.initials}
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <dl className="mt-14 grid grid-cols-1 gap-6 rounded-2xl border border-border bg-card px-6 py-8 sm:grid-cols-3 sm:px-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <dt className="text-sm font-medium text-muted-foreground">
                {s.label}
              </dt>
              <dd className="mt-1 text-2xl font-bold tabular-nums text-accent sm:text-3xl">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
