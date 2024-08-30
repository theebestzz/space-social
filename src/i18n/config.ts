import EnFlag from "../../public/en.png";
import TrFlag from "../../public/tr.png";

export const defaultLocale: string = "en";

export const locales: string[] = ["en", "tr"];

export const labels: {
  [key: string]: { name: string; flag: any };
} = {
  en: {
    name: "English",
    flag: EnFlag,
  },
  tr: {
    name: "Türkçe",
    flag: TrFlag,
  },
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

    "/x/profile": {
      en: "/x/profile",
      tr: "/x/profil",
    },

    "x/settings": {
      en: "x/settings",
      tr: "x/ayarlar",
    },

    "x/messages": {
      en: "x/messages",
      tr: "x/mesajlar",
    },

    "x/friends": {
      en: "x/friends",
      tr: "x/arkadaslar",
    },

    "x/notifications": {
      en: "x/notifications",
      tr: "x/bildirimler",
    },
  };

export const localePrefix: any = "as-needed";
