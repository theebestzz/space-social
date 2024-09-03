"use client";

import Image from "next/image";

import { useTranslations } from "next-intl";
import { AboutTimeLine } from "@/app/_components/site/blocks/about-timeline";
import { AboutBlock } from "@/app/_components/site/blocks/about-block";
import { Aboutbeams } from "@/app/_components/site/blocks/about-beams";

export default function AboutPage() {
  const t = useTranslations("site");
  return (
    <>
      <div className="container my-20">
        <div className="flex gap-5 max-lg:flex-col">
          <div className="max-w-xl space-y-3">
            <h2 className="text-3xl font-semibold lg:text-4xl">
              {t("layout.header.navbar.vision")}
            </h2>
            <p className="font-light">
              Asgardia aims to unite people in a transnational, equal and
              progressive society to{" "}
              <span className="font-extrabold">build a new home</span> for
              humanity in space and protect our cradle — planet Earth.Asgardia
              aims to unite people in a transnational, equal and progressive
              society to build a new home for humanity in space and protect our
              cradle — planet Earth.Asgardia aims to unite people in a
              transnational, equal and progressive society to build a new home
              for humanity in space and protect our cradle —{" "}
              <span className="font-extrabold">planet Earth.</span>
            </p>
          </div>
          <Image
            src="/about-1.jpg"
            alt=""
            width={500}
            height={500}
            className="h-[25rem] w-full rounded-lg object-cover"
          />
        </div>
        <div className="mt-28 flex gap-5 max-lg:flex-col-reverse">
          <Image
            src="/about-2.jpg"
            alt=""
            width={500}
            height={500}
            className="h-[25rem] w-full rounded-lg object-cover"
          />
          <div className="max-w-xl space-y-3">
            <h2 className="text-3xl font-semibold lg:text-4xl">
              {t("layout.header.navbar.mission")}
            </h2>
            <p className="font-light">
              Asgardia aims to unite people in a transnational, equal and
              progressive society to{" "}
              <span className="font-extrabold">build a new home</span> for
              humanity in space and protect our cradle — planet Earth.Asgardia
              aims to unite people in a transnational, equal and progressive
              society to build a new home for humanity in space and protect our
              cradle — planet Earth.Asgardia aims to unite people in a
              transnational, equal and progressive society to build a new home
              for humanity in space and protect our cradle —{" "}
              <span className="font-extrabold">planet Earth.</span>
            </p>
          </div>
        </div>
      </div>
      <div className="h-full w-full bg-primary-foreground py-10">
        <AboutTimeLine />
      </div>
      <div className="container relative my-20">
        <AboutBlock />
      </div>{" "}
      <Aboutbeams />
    </>
  );
}
