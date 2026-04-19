"use client";

import {
  startTransition,
  useCallback,
  useEffect,
  useId,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import SwedenPlacesAutocomplete from "@/components/places/SwedenPlacesAutocomplete";
import {
  bookingRequestSchema,
  firstZodIssueMessage,
} from "@/lib/booking-schema";
import { isGooglePlacesLoaded, loadGooglePlaces } from "@/lib/load-google-places";

export type BookingKind =
  | "airport-pickup"
  | "airport-dropoff"
  | "city-tour"
  | "custom";

const ARLANDA = "Stockholm Arlanda Airport";

const CITY_TOUR_GUIDANCE = [
  "Gamla Stan Walking",
  "Royal Palace",
  "Vasa Museum",
  "Modern Districts",
  "Photo Stops",
  "Professional Guide",
] as const;

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  confirmEmail: string;
  pickupLocation: string;
  dropoffLocation: string;
};

function initialForm(kind: BookingKind): FormState {
  switch (kind) {
    case "airport-pickup":
      return {
        fullName: "",
        phone: "",
        email: "",
        confirmEmail: "",
        pickupLocation: ARLANDA,
        dropoffLocation: "",
      };
    case "airport-dropoff":
      return {
        fullName: "",
        phone: "",
        email: "",
        confirmEmail: "",
        pickupLocation: "",
        dropoffLocation: ARLANDA,
      };
    case "city-tour":
    case "custom":
      return {
        fullName: "",
        phone: "",
        email: "",
        confirmEmail: "",
        pickupLocation: "",
        dropoffLocation: "",
      };
  }
}

function fieldLocks(kind: BookingKind) {
  switch (kind) {
    case "airport-pickup":
      return { pickup: true, dropoff: false };
    case "airport-dropoff":
      return { pickup: false, dropoff: true };
    default:
      return { pickup: false, dropoff: false };
  }
}

type PlacesLoadState = "loading" | "ready" | "skipped" | "error";

type TripLocationFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  readOnly?: boolean;
  placesLoadState: PlacesLoadState;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  inputClass: string;
  labelClass: string;
};

function TripLocationField({
  id,
  label,
  value,
  onChange,
  readOnly,
  placesLoadState,
  placeholder,
  helperText,
  errorText,
  inputClass,
  labelClass,
}: TripLocationFieldProps) {
  const errClass = "mt-1.5 text-xs text-red-300";

  if (readOnly) {
    return (
      <div>
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
        <input
          id={id}
          name={id}
          readOnly
          value={value}
          aria-invalid={Boolean(errorText)}
          className={inputClass}
        />
        {errorText ? <p className={errClass}>{errorText}</p> : null}
        {helperText ? (
          <p className="mt-1.5 text-xs text-muted-foreground">{helperText}</p>
        ) : null}
      </div>
    );
  }

  if (placesLoadState === "ready") {
    return (
      <SwedenPlacesAutocomplete
        id={id}
        label={label}
        labelClassName={labelClass}
        inputClassName={inputClass}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        helperText={helperText}
        errorText={errorText}
        disabled={false}
      />
    );
  }

  const disabled = placesLoadState === "loading";
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        type="text"
        autoComplete="street-address"
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(errorText)}
        className={inputClass}
        placeholder={
          disabled
            ? "Loading Swedish address search…"
            : placeholder ?? "Type a full Swedish address"
        }
      />
      {errorText ? <p className={errClass}>{errorText}</p> : null}
      {placesLoadState === "loading" ? (
        <p className="mt-1.5 text-xs text-muted-foreground">
          Connecting to Google Places (Sweden)…
        </p>
      ) : null}
      {placesLoadState === "error" ? (
        <p className="mt-1.5 text-xs text-red-300">
          Address search failed to load. Enter the full address manually.
        </p>
      ) : null}
      {helperText ? (
        <p className="mt-1.5 text-xs text-muted-foreground">{helperText}</p>
      ) : null}
    </div>
  );
}

type BookingRideModalProps = {
  open: boolean;
  onClose: () => void;
  kind: BookingKind;
  serviceTitle: string;
};

export default function BookingRideModal({
  open,
  onClose,
  kind,
  serviceTitle,
}: BookingRideModalProps) {
  const titleId = useId();
  const [form, setForm] = useState<FormState>(initialForm(kind));
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasMapsKey = Boolean(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);

  const [placesLoadState, setPlacesLoadState] = useState<PlacesLoadState>(() => {
    if (!hasMapsKey) return "skipped";
    return isGooglePlacesLoaded() ? "ready" : "loading";
  });

  const locks = fieldLocks(kind);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    startTransition(() => {
      if (!hasMapsKey) {
        setPlacesLoadState("skipped");
        return;
      }
      if (isGooglePlacesLoaded()) {
        setPlacesLoadState("ready");
        return;
      }
      setPlacesLoadState("loading");
      loadGooglePlaces()
        .then(() => {
          if (!cancelled) startTransition(() => setPlacesLoadState("ready"));
        })
        .catch(() => {
          if (!cancelled) startTransition(() => setPlacesLoadState("error"));
        });
    });
    return () => {
      cancelled = true;
    };
  }, [open, hasMapsKey]);

  useEffect(() => {
    if (!open) return;
    setSubmitted(false);
    setError(null);
    setFieldErrors({});
    setIsSubmitting(false);
    setForm(initialForm(kind));
  }, [open, kind]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const update = useCallback(
    (key: keyof FormState) => (e: ChangeEvent<HTMLInputElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      setFieldErrors((fe) => {
        if (!fe[key]) return fe;
        const next = { ...fe };
        delete next[key];
        return next;
      });
    },
    [],
  );

  const setLocation = useCallback(
    (key: "pickupLocation" | "dropoffLocation") => {
      return (v: string) => {
        setForm((f) => ({ ...f, [key]: v }));
        setFieldErrors((fe) => {
          if (!fe[key]) return fe;
          const next = { ...fe };
          delete next[key];
          return next;
        });
      };
    },
    [],
  );

  function applyFieldErrorsFromApi(
    raw: Record<string, string[] | undefined> | undefined,
  ): Partial<Record<keyof FormState, string>> {
    if (!raw) return {};
    const keys: (keyof FormState)[] = [
      "fullName",
      "phone",
      "email",
      "confirmEmail",
      "pickupLocation",
      "dropoffLocation",
    ];
    const out: Partial<Record<keyof FormState, string>> = {};
    for (const k of keys) {
      const msgs = raw[k];
      if (msgs?.[0]) out[k] = msgs[0];
    }
    return out;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    const payload = {
      kind,
      serviceTitle,
      fullName: form.fullName,
      phone: form.phone,
      email: form.email,
      confirmEmail: form.confirmEmail,
      pickupLocation: form.pickupLocation,
      dropoffLocation: form.dropoffLocation,
    };

    const parsed = bookingRequestSchema.safeParse(payload);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      setFieldErrors(applyFieldErrorsFromApi(flat));
      setError(firstZodIssueMessage(parsed.error));
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      let body: { error?: string; fieldErrors?: Record<string, string[]> } = {};
      try {
        body = (await res.json()) as typeof body;
      } catch {
        body = {};
      }

      if (!res.ok) {
        if (body.fieldErrors) {
          setFieldErrors(applyFieldErrorsFromApi(body.fieldErrors));
        }
        setError(
          typeof body.error === "string" && body.error.length > 0
            ? body.error
            : "Could not send your request. Please try again.",
        );
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-accent focus:ring-2 focus:ring-accent/20 read-only:cursor-not-allowed read-only:bg-muted/50 read-only:text-muted-foreground";

  const labelClass =
    "text-xs font-semibold uppercase tracking-wider text-muted-foreground";

  const fieldErrClass = "mt-1.5 text-xs text-red-300";

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/65 backdrop-blur-[2px] transition-opacity"
        aria-label="Close booking dialog"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-[101] flex max-h-[min(92dvh,720px)] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-border bg-card shadow-2xl shadow-black/50 sm:rounded-2xl"
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
          <div>
            <p id={titleId} className="text-lg font-bold text-card-foreground">
              Book: {serviceTitle}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Fill in your details — we&apos;ll confirm your ride shortly.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-sm font-semibold text-foreground transition hover:border-accent/40 hover:bg-muted"
          >
            Cancel
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          {submitted ? (
            <div className="rounded-xl border border-accent/30 bg-accent/10 px-4 py-8 text-center">
              <p className="text-base font-semibold text-foreground">
                Request received
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Thank you, {form.fullName.split(" ")[0]}. We will contact you at{" "}
                {form.email} to confirm your booking.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 inline-flex rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label htmlFor="bk-fullName" className={labelClass}>
                  Full name
                </label>
                <input
                  id="bk-fullName"
                  name="fullName"
                  autoComplete="name"
                  value={form.fullName}
                  onChange={update("fullName")}
                  aria-invalid={Boolean(fieldErrors.fullName)}
                  className={inputClass}
                  placeholder="First and last name"
                />
                {fieldErrors.fullName ? (
                  <p className={fieldErrClass}>{fieldErrors.fullName}</p>
                ) : null}
              </div>
              <div>
                <label htmlFor="bk-phone" className={labelClass}>
                  Phone number
                </label>
                <input
                  id="bk-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={update("phone")}
                  aria-invalid={Boolean(fieldErrors.phone)}
                  className={inputClass}
                  placeholder="+46 …"
                />
                {fieldErrors.phone ? (
                  <p className={fieldErrClass}>{fieldErrors.phone}</p>
                ) : null}
              </div>
              <div>
                <label htmlFor="bk-email" className={labelClass}>
                  Email
                </label>
                <input
                  id="bk-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={update("email")}
                  aria-invalid={Boolean(fieldErrors.email)}
                  className={inputClass}
                  placeholder="you@example.com"
                />
                {fieldErrors.email ? (
                  <p className={fieldErrClass}>{fieldErrors.email}</p>
                ) : null}
              </div>
              <div>
                <label htmlFor="bk-confirmEmail" className={labelClass}>
                  Confirm email
                </label>
                <input
                  id="bk-confirmEmail"
                  name="confirmEmail"
                  type="email"
                  autoComplete="email"
                  value={form.confirmEmail}
                  onChange={update("confirmEmail")}
                  aria-invalid={Boolean(fieldErrors.confirmEmail)}
                  className={inputClass}
                  placeholder="Re-enter your email"
                />
                {fieldErrors.confirmEmail ? (
                  <p className={fieldErrClass}>{fieldErrors.confirmEmail}</p>
                ) : null}
              </div>

              {kind === "city-tour" ? (
                <>
                  <div className="border-t border-border pt-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Tour guidance
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      Private city tours can weave in these Stockholm highlights —
                      tell us your pace and we&apos;ll shape the route with you.
                    </p>
                  </div>
                  <ul
                    className="grid gap-2.5 sm:grid-cols-2"
                    aria-label="Tour highlights"
                  >
                    {CITY_TOUR_GUIDANCE.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 rounded-xl border border-accent/30 bg-gradient-to-br from-accent/12 via-accent/5 to-transparent px-3.5 py-3 text-sm font-semibold text-foreground shadow-[inset_0_1px_0_0_rgba(61,214,198,0.12)]"
                      >
                        <span
                          className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-accent shadow-[0_0_10px_rgba(61,214,198,0.65)]"
                          aria-hidden
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-border pt-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Pickup &amp; drop-off
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Search Swedish addresses — suggestions are limited to
                      Sweden.
                    </p>
                  </div>
                  <TripLocationField
                    id="bk-pickup"
                    label="Pickup location"
                    value={form.pickupLocation}
                    onChange={setLocation("pickupLocation")}
                    readOnly={false}
                    placesLoadState={placesLoadState}
                    placeholder="e.g. hotel or street in Stockholm"
                    helperText="Start typing — pick a suggestion or enter the full address."
                    errorText={fieldErrors.pickupLocation}
                    inputClass={inputClass}
                    labelClass={labelClass}
                  />
                  <TripLocationField
                    id="bk-dropoff"
                    label="Drop-off location"
                    value={form.dropoffLocation}
                    onChange={setLocation("dropoffLocation")}
                    readOnly={false}
                    placesLoadState={placesLoadState}
                    placeholder="e.g. final stop or your hotel"
                    helperText="Where should the tour end?"
                    errorText={fieldErrors.dropoffLocation}
                    inputClass={inputClass}
                    labelClass={labelClass}
                  />
                </>
              ) : (
                <>
                  <div className="border-t border-border pt-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Trip details
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Address search is restricted to{" "}
                      <span className="font-medium text-foreground">Sweden</span>
                      . Choose a suggestion or type a full address.
                    </p>
                  </div>

                  <TripLocationField
                    id="bk-pickup"
                    label="Pickup location"
                    value={form.pickupLocation}
                    onChange={setLocation("pickupLocation")}
                    readOnly={locks.pickup}
                    placesLoadState={placesLoadState}
                    placeholder={
                      locks.pickup
                        ? undefined
                        : kind === "airport-dropoff"
                          ? "Search pickup in Sweden"
                          : "Pickup address"
                    }
                    helperText={
                      kind === "airport-pickup"
                        ? "Pickup is fixed at Arlanda. Enter your destination below (Sweden)."
                        : kind === "airport-dropoff"
                          ? "Pickup can be anywhere in Sweden."
                          : undefined
                    }
                    errorText={fieldErrors.pickupLocation}
                    inputClass={inputClass}
                    labelClass={labelClass}
                  />

                  <TripLocationField
                    id="bk-dropoff"
                    label="Drop-off location"
                    value={form.dropoffLocation}
                    onChange={setLocation("dropoffLocation")}
                    readOnly={locks.dropoff}
                    placesLoadState={placesLoadState}
                    placeholder={
                      locks.dropoff
                        ? undefined
                        : kind === "airport-pickup"
                          ? "Search destination in Sweden"
                          : "Drop-off address"
                    }
                    helperText={
                      kind === "airport-pickup"
                        ? "Choose a Swedish address or type the full destination."
                        : kind === "airport-dropoff"
                          ? "Drop-off is fixed at Arlanda. Enter pickup above."
                          : kind === "custom"
                            ? "Enter pickup and drop-off for your custom route."
                            : undefined
                    }
                    errorText={fieldErrors.dropoffLocation}
                    inputClass={inputClass}
                    labelClass={labelClass}
                  />
                </>
              )}

              {error ? (
                <p
                  className="rounded-lg border border-red-500/45 bg-red-500/10 px-3 py-2 text-sm text-red-300"
                  role="alert"
                >
                  {error}
                </p>
              ) : null}

              <div className="flex flex-col-reverse gap-3 border-t border-border pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="inline-flex justify-center rounded-xl border border-border bg-muted/40 px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex justify-center rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition hover:opacity-90 disabled:pointer-events-none disabled:opacity-60"
                >
                  {isSubmitting ? "Sending…" : "Submit booking request"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
