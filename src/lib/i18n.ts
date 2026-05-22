import de from '../i18n/de.json';
import en from '../i18n/en.json';

export type Lang = 'de' | 'en';

export const defaultLang: Lang = 'de';
export const languages: Record<Lang, Record<string, string>> = { de, en };

export const langLabel: Record<Lang, string> = {
  de: 'DE',
  en: 'EN',
};

export function t(key: string, lang: Lang): string {
  const dict = languages[lang] ?? languages[defaultLang];
  return dict[key] ?? languages[defaultLang][key] ?? key;
}

export function getLangFromUrl(url: URL): Lang {
  const [, segment] = url.pathname.split('/');
  if (segment === 'de' || segment === 'en') return segment;
  return defaultLang;
}

/** Build a path under a locale, e.g. localizedPath('projekte', 'de') -> '/de/projekte' */
export function localizedPath(path: string, lang: Lang): string {
  const clean = path.replace(/^\//, '');
  return `/${lang}/${clean}`.replace(/\/$/, '') || `/${lang}`;
}

/** Translates the current URL to the other language, preserving the route equivalent. */
export function switchLangPath(currentUrl: URL, targetLang: Lang): string {
  const segments = currentUrl.pathname.split('/').filter(Boolean);
  if (segments[0] === 'de' || segments[0] === 'en') {
    segments[0] = targetLang;
  } else {
    segments.unshift(targetLang);
  }

  const mapped = segments.map((seg, i) => {
    if (i === 0) return seg;
    if (targetLang === 'en') {
      if (seg === 'projekte') return 'projects';
    } else {
      if (seg === 'projects') return 'projekte';
    }
    return seg;
  });

  return '/' + mapped.join('/');
}

export const routeNames: Record<Lang, { projects: string }> = {
  de: { projects: 'projekte' },
  en: { projects: 'projects' },
};
