"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function HomeBlock() {
  const t = useTranslations("site.hero");
  return (
    <div className="relative flex w-full flex-col items-center justify-center rounded-md antialiased">
      <motion.div
        // initial={{ opacity: 0.0, y: 40 }}
        // whileInView={{ opacity: 1, y: 0 }}
        // transition={{
        //   delay: 0.3,
        //   duration: 0.8,
        //   ease: "easeInOut",
        // }}
        className="mx-auto max-w-2xl space-y-3 p-4"
      >
        <h1 className="relative z-10 bg-gradient-to-r from-pink-300 via-purple-400 to-violet-600 bg-clip-text text-center text-4xl font-bold text-transparent dark:from-pink-200 dark:via-purple-400 md:text-7xl">
          {t("title")}
        </h1>
        <h2 className="relative z-10 bg-gradient-to-bl from-white to-white bg-clip-text text-center text-lg text-transparent drop-shadow-2xl md:from-black/25 md:to-slate-200 md:text-2xl md:font-light">
          {t("subtitle")}
        </h2>
      </motion.div>
    </div>
  );
}
