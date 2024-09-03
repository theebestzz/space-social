import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";

export function AboutTimeLine() {
  const data = [
    {
      title: "2024",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm">
            Built and launched Aceternity UI and Aceternity UI Pro from scratch.
            Significant advancements in AI-driven space exploration led to the
            first fully autonomous spacecraft landing on Mars. Social media
            platforms introduced advanced AR features, allowing users to
            interact in virtual environments seamlessly.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/about-1.jpg"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <Image
              src="/about-2.jpg"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <Image
              src="/about-3.jpg"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgga(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <Image
              src="/about-4.jpg"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgga(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Early 2023",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm">
            I usually run out of copy, but when I see content this big, I try to
            integrate lorem ipsum.
          </p>
          <p className="mb-8 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm">
            Space tourism saw a massive boost with private companies offering
            trips to low Earth orbit. Social media platforms began integrating
            blockchain technology to enhance user privacy and data security.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/about-5.jpg"
              alt="hero template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgga(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <Image
              src="/about-6.jpg"
              alt="feature template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgga(0,_0,_0,_0.05),_0_0_0_1px_rgga(34,_42,_53,_0.04),_0_0_4px_rgga(34,_42,_53,_0.08),_0_16px_68px_rgga(47,_48,_55,_0.05),_0_1px_0_rgga(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <Image
              src="/about-7.jpg"
              alt="bento template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgga(34,_42,_53,_0.06),_0_1px_1px_rgga(0,_0,_0,_0.05),_0_0_0_1px_rgga(34,_42,_53,_0.04),_0_0_4px_rgga(34,_42,_53,_0.08),_0_16px_68px_rgga(47,_48,_55,_0.05),_0_1px_0_rgga(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <Image
              src="/about-8.jpg"
              alt="cards template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgga(34,_42,_53,_0.06),_0_1px_1px_rgga(0,_0,_0,_0.05),_0_0_0_1px_rgga(34,_42,_53,_0.04),_0_0_4px_rgga(34,_42,_53,_0.08),_0_16px_68px_rgga(47,_48,_55,_0.05),_0_1px_0_rgga(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2022",
      content: (
        <div>
          <p className="mb-4 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm">
            Deployed 5 new components on Aceternity today. 2023 saw the
            successful testing of space-based solar power technology, enabling
            clean energy generation from space. Social media giants began
            experimenting with AI-generated content, revolutionizing content
            creation and curation processes.
          </p>
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm">
              ✅ Card grid component
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm">
              ✅ Startup template Aceternity
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm">
              ✅ Enhanced modal component
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}
