"use client";

import { useEffect, useId, useRef } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  type Suggestion,
} from "use-places-autocomplete";

/** Sweden-only bias for Place Autocomplete (see Google Places docs). */
const SWEDEN_AUTOCOMPLETE_OPTIONS = {
  componentRestrictions: { country: "se" as const },
  region: "se",
};

type SwedenPlacesAutocompleteProps = {
  id: string;
  label: string;
  labelClassName: string;
  inputClassName: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  disabled?: boolean;
};

export default function SwedenPlacesAutocomplete({
  id,
  label,
  labelClassName,
  inputClassName,
  value,
  onChange,
  placeholder,
  helperText,
  errorText,
  disabled,
}: SwedenPlacesAutocompleteProps) {
  const listId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    ready,
    value: hookValue,
    suggestions: { status, data, loading },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
    requestOptions:
      SWEDEN_AUTOCOMPLETE_OPTIONS as google.maps.places.AutocompletionRequest,
    initOnMount: true,
  });

  useEffect(() => {
    setValue(value, false);
  }, [value, setValue]);

  const handleSelect = async (suggestion: Suggestion) => {
    const description = suggestion.description;
    setValue(description, false);
    clearSuggestions();
    try {
      const results = await getGeocode({ address: description });
      const formatted =
        results[0]?.formatted_address ?? description;
      onChange(formatted);
    } catch {
      onChange(description);
    }
  };

  const showList =
    ready && status === "OK" && data.length > 0 && !disabled;

  return (
    <div ref={containerRef} className="relative">
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>
      <input
        id={id}
        type="text"
        autoComplete="off"
        disabled={disabled || !ready}
        value={hookValue}
        onChange={(e) => {
          const v = e.target.value;
          setValue(v);
          onChange(v);
        }}
        onBlur={() => {
          setTimeout(() => clearSuggestions(), 200);
        }}
        className={inputClassName}
        placeholder={
          !ready
            ? "Connecting to address search…"
            : placeholder ?? "Start typing a Swedish address"
        }
        role="combobox"
        aria-expanded={showList}
        aria-controls={showList ? listId : undefined}
        aria-autocomplete="list"
        aria-busy={loading}
        aria-invalid={Boolean(errorText)}
      />
      {errorText ? (
        <p className="mt-1.5 text-xs text-red-300">{errorText}</p>
      ) : null}
      {helperText ? (
        <p className="mt-1.5 text-xs text-muted-foreground">{helperText}</p>
      ) : null}
      {showList ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 top-full z-[200] mt-1 max-h-52 overflow-y-auto rounded-xl border border-border bg-card py-1 shadow-2xl shadow-black/40"
        >
          {data.map((s) => (
            <li key={s.place_id} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={false}
                className="flex w-full px-3 py-2.5 text-left text-sm text-foreground transition hover:bg-muted"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => void handleSelect(s)}
              >
                <span className="line-clamp-2">{s.description}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
