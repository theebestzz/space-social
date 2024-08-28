import { BackgroundBeams } from "@/components/ui/background-beams";

export default function HomePage() {
  return (
    <div className="flex min-h-[75vh] w-full items-center justify-center">
      <BackgroundBeams />
      <div className="relative flex w-full flex-col items-center justify-center rounded-md antialiased">
        <div className="mx-auto max-w-2xl space-y-3 p-4">
          <h1 className="relative z-10 bg-gradient-to-r from-pink-300 via-purple-400 to-violet-600 bg-clip-text text-center text-4xl font-bold text-transparent dark:from-pink-200 dark:via-purple-400 md:text-7xl">
            Cosmos Nexus
          </h1>
          <h2 className="relative z-10 bg-gradient-to-bl from-black/50 to-slate-400 bg-clip-text text-center text-xl font-light text-transparent drop-shadow-2xl dark:to-slate-200 md:text-3xl">
            A Home Beyond the Stars, United for Earth.
          </h2>
        </div>
      </div>
    </div>
  );
}
