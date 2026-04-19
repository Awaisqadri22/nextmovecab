import { importLibrary, setOptions } from "@googlemaps/js-api-loader";

let loadPromise: Promise<typeof google> | null = null;

/**
 * Loads the Maps JavaScript API with the Places library (singleton).
 * Enable "Maps JavaScript API" and "Places API" for your key in Google Cloud.
 */
export function loadGooglePlaces(): Promise<typeof google> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Google Maps can only load in the browser"));
  }
  if (window.google?.maps?.places) {
    return Promise.resolve(window.google);
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return Promise.reject(new Error("Missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY"));
  }

  if (!loadPromise) {
    setOptions({
      key: apiKey,
      v: "weekly",
      language: "en",
      region: "SE",
    });
    loadPromise = importLibrary("places").then(() => window.google);
  }

  return loadPromise;
}

export function isGooglePlacesLoaded(): boolean {
  return typeof window !== "undefined" && Boolean(window.google?.maps?.places);
}
