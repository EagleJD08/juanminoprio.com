/**
 * Send a custom event to Plausible.
 * Safe to call even if Plausible isn't loaded — fails silently.
 */
export function trackEvent(name: string, props?: Record<string, string>) {
  if (typeof window !== "undefined" && (window as any).plausible) {
    (window as any).plausible(name, { props });
  }
}
