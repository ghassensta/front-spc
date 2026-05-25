import { useEffect } from "react";

/**
 * Déclenche l'event "render-event" écouté par vite-plugin-prerender
 * (Puppeteer) UNE FOIS que la page a fini de charger ses données SEO.
 *
 * On attend 2 secondes après que `ready` devienne vrai pour que :
 *   - react-helmet-async ait écrit les <title>/<meta>/<script ld+json>
 *   - les composants lazy-loadés aient eu le temps de monter
 *   - SWR ait fini ses revalidations éventuelles
 */
export function usePrerenderReady(ready) {
  useEffect(() => {
    if (!ready) return;
    if (typeof window === "undefined") return;
    if (window.__PRERENDER_FIRED__) return;

    const t = setTimeout(() => {
      if (window.__PRERENDER_FIRED__) return;
      window.__PRERENDER_FIRED__ = true;
      document.dispatchEvent(new Event("render-event"));
    }, 5000);

    return () => clearTimeout(t);
  }, [ready]);
}
