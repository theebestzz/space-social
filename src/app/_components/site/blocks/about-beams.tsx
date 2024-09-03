"use client";

import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export function Aboutbeams() {
  return (
    <div className="relative -z-50 flex h-[30rem] w-full flex-col items-center justify-center rounded-md bg-primary-foreground antialiased">
      <div className="relative mx-auto flex flex-col items-center gap-3 p-4">
        <h1 className="relative z-10 bg-gradient-to-b from-white to-black bg-clip-text text-center font-sans text-lg font-bold text-transparent md:text-7xl">
          Join the SpaceX
        </h1>
        <p></p>
        <p className="relative z-10 mx-auto my-2 max-w-lg text-center text-sm text-neutral-500">
          Asgardia aims to unite people in a transnational, equal and
          progressive society to build a new home for humanity in space and
          protect our cradle
        </p>
        <Button variant="outline" asChild>
          <Link href="/login">Get Started</Link>
        </Button>
      </div>
      <BackgroundBeams />
    </div>
  );
}
