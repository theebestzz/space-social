export const defaultLocale: string = "en";

export const locales: string[] = ["en", "tr"];

export const labels: { [key: string]: string } = {
  en: "English",
  tr: "Türkçe",
};

export const pathnames: { [key: string]: { en: string; tr: string } | string } =
  {
    "/": "/",

    "/about": {
      en: "/about",
      tr: "/hakkimizda",
    },

    "/social": {
      en: "/social",
      tr: "/sosyal",
    },

    "/news": {
      en: "/news",
      tr: "/haberler",
    },

    "/contact": {
      en: "/contact",
      tr: "/iletisim",
    },

    "/login": {
      en: "/login",
      tr: "/giris-yap",
    },

    "/register": {
      en: "/register",
      tr: "/kayit-ol",
    },

    "/reset": {
      en: "/reset",
      tr: "/sifremi-unuttum",
    },

    "/new-password": {
      en: "/new-password",
      tr: "/sifremi-degistir",
    },

    "/new-verification": {
      en: "/new-verification",
      tr: "/kayit-onay",
    },

    "/error": {
      en: "/error",
      tr: "/hata",
    },

    "/profile": {
      en: "/profile",
      tr: "/profil",
    },

    "/settings": {
      en: "/settings",
      tr: "/ayarlar",
    },
  };

export const localePrefix: any = "as-needed";
