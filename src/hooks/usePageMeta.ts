import { useEffect } from "react";

const SITE_URL = "https://homeloom.app";

export function usePageMeta({
  title,
  description,
  path,
}: {
  title?: string;
  description?: string;
  path: string;
}) {
  useEffect(() => {
    const canonical = `${SITE_URL}${path}`;

    const prevTitle = document.title;
    if (title) document.title = title;

    const linkEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const prevHref = linkEl?.href;
    if (linkEl) linkEl.setAttribute("href", canonical);

    const descEl = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDesc = descEl?.getAttribute("content");
    if (description && descEl) descEl.setAttribute("content", description);

    const ogUrlEl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    const prevOgUrl = ogUrlEl?.getAttribute("content");
    if (ogUrlEl) ogUrlEl.setAttribute("content", canonical);

    return () => {
      if (title) document.title = prevTitle;
      if (linkEl && prevHref) linkEl.setAttribute("href", prevHref);
      if (description && descEl && prevDesc) descEl.setAttribute("content", prevDesc);
      if (ogUrlEl && prevOgUrl) ogUrlEl.setAttribute("content", prevOgUrl);
    };
  }, [title, description, path]);
}
