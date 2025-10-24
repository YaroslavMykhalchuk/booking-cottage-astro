import { ui, defaultLang, showDefaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return (key: keyof typeof ui[typeof defaultLang]) =>
    ui[lang][key] || ui[defaultLang][key];
}

export function useTranslatedPath(lang: keyof typeof ui) {
  return function translatePath(path: string, l: keyof typeof ui = lang) {
    const normalized = path.startsWith('/') ? path : `/${path}`;
    return !showDefaultLang && l === defaultLang ? normalized : `/${l}${normalized}`;
  };
}

export function getPathWithoutLang(url: URL): string {
  const parts = url.pathname.split('/').filter(Boolean);
  const maybeLang = parts[0];
  if (maybeLang && maybeLang in ui) {
    const rest = '/' + parts.slice(1).join('/');
    return rest || '/';
  }
  return url.pathname || '/';
}
