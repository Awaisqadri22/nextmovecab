"use client";

import { useCallback, useState, type CSSProperties } from "react";

/**
 * Optional: add `public/hero-taxi-bg.mp4` or `public/hero-taxi-bg.webm`
 * (stock / your own footage). If missing or blocked, animated taxis show only.
 */
const VIDEO_SOURCES = [
  { src: "/hero-taxi-bg.webm", type: "video/webm" },
  { src: "/hero-taxi-bg.mp4", type: "video/mp4" },
] as const;

function TaxiCar({
  className,
  style,
  roofGlow,
}: {
  className?: string;
  style?: CSSProperties;
  roofGlow?: boolean;
}) {
  return (
    <div
      className={`absolute flex items-end ${className ?? ""}`}
      style={style}
    >
      <div className="relative h-[1.35rem] w-[3.25rem] sm:h-7 sm:w-[4.5rem]">
        {roofGlow ? (
          <div
            className="absolute -top-1 left-1/2 h-2 w-5 -translate-x-1/2 rounded-sm bg-gradient-to-r from-accent to-aurora shadow-[0_0_16px_rgba(61,214,198,0.85),0_0_22px_rgba(232,121,249,0.55)] motion-reduce:shadow-none sm:h-2.5 sm:w-7"
            aria-hidden
          />
        ) : null}
        <div className="absolute -top-1.5 left-[18%] h-2.5 w-[55%] rounded-t-md border border-accent/30 bg-foreground/[0.12] sm:-top-2 sm:h-3" />
        <div className="absolute bottom-0 left-0 right-0 h-[1.05rem] rounded-md border border-accent/25 bg-foreground/[0.14] sm:h-5" />
        <div className="absolute bottom-0.5 left-[12%] h-2 w-2 rounded-full border border-border/80 bg-card/90 sm:bottom-1 sm:h-2.5 sm:w-2.5" />
        <div className="absolute bottom-0.5 right-[12%] h-2 w-2 rounded-full border border-border/80 bg-card/90 sm:bottom-1 sm:h-2.5 sm:w-2.5" />
      </div>
    </div>
  );
}

export default function TaxiHeroBackdrop() {
  const [videoActive, setVideoActive] = useState(true);

  const onVideoError = useCallback(() => {
    setVideoActive(false);
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {videoActive ? (
        <video
          className="absolute inset-0 h-full w-full scale-105 object-cover opacity-[0.2] motion-reduce:opacity-[0.08]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={onVideoError}
        >
          {VIDEO_SOURCES.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>
      ) : null}

      {/* Night road + dashed lane — spans lower half so motion reads behind carousel + CTA strip */}
      <div className="absolute inset-x-[-20%] bottom-0 h-[48%] min-h-[220px] bg-gradient-to-t from-background/92 via-muted/40 to-transparent sm:h-[52%] sm:min-h-[260px]" />
      <div
        className="hero-taxi-motion absolute inset-x-[-10%] bottom-[6%] h-11 opacity-55 sm:bottom-[8%] sm:h-14"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent 0,
            transparent 20px,
            rgba(61, 214, 198, 0.22) 20px,
            rgba(61, 214, 198, 0.22) 28px,
            transparent 28px,
            transparent 48px,
            rgba(232, 121, 249, 0.2) 48px,
            rgba(232, 121, 249, 0.2) 56px,
            transparent 56px,
            transparent 72px
          )`,
          backgroundSize: "72px 100%",
          animation: "hero-road-dash 4.8s linear infinite",
        }}
      />

      {/* Moving taxis (loop) — longer cycles for calmer motion across tall hero block */}
      <div className="absolute inset-x-0 bottom-0 h-[min(38%,320px)] min-h-[160px] sm:min-h-[200px]">
        <TaxiCar
          roofGlow
          className="hero-taxi-motion bottom-[8%] opacity-90 sm:bottom-[10%]"
          style={{
            animation: "hero-taxi-drive 28s linear infinite",
            animationDelay: "0s",
          }}
        />
        <TaxiCar
          className="hero-taxi-motion bottom-[12%] opacity-60 sm:bottom-[14%]"
          style={{
            animation: "hero-taxi-drive 42s linear infinite",
            animationDelay: "-10s",
          }}
        />
        <TaxiCar
          className="hero-taxi-motion bottom-[16%] opacity-45 sm:bottom-[18%]"
          style={{
            animation: "hero-taxi-drive 36s linear infinite",
            animationDelay: "-18s",
          }}
        />
      </div>

      {/* Soft city silhouette */}
      <div
        className="absolute inset-x-0 bottom-0 h-[min(50%,420px)] min-h-[200px] opacity-[0.11] sm:opacity-[0.12]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 200' preserveAspectRatio='none'%3E%3Cpath fill='%2394a3b8' d='M0 200V120l80-20 60 40 100-60 120 80 90-50 70 30 130-40 100 55 150-70 100 45V200z'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat-x",
          backgroundSize: "min(1200px, 100%) 100%",
          backgroundPosition: "bottom",
        }}
      />

      {/* Readability scrim over motion (taller stack = softer mid so card area stays legible) */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/95 via-muted/68 to-muted/88" />
      <div
        className="absolute inset-0 opacity-90"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 55% at 50% -25%, var(--hero-glow-a), transparent), radial-gradient(ellipse 55% 45% at 100% 0%, var(--hero-glow-b), transparent), radial-gradient(ellipse 45% 50% at 0% 85%, var(--hero-glow-c), transparent)",
        }}
      />
    </div>
  );
}
