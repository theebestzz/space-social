import { Button } from "@/components/ui/button";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <BackgroundBeamsWithCollision>
      <div>
        <div className="relative z-20 flex flex-col items-center text-center font-sans text-3xl font-bold tracking-tight text-black dark:text-white md:text-4xl lg:text-7xl">
          Oopss {":( "}
          <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
            <div className="absolute left-0 top-[1px] bg-gradient-to-r from-pink-300 via-purple-400 to-violet-600 bg-clip-text bg-no-repeat py-4 text-transparent [text-shadow:0_0_rgba(0,0,0,0.1)]">
              <span className="">Not Found Page!</span>
            </div>
            <div className="relative bg-gradient-to-r from-pink-300 via-purple-400 to-violet-600 bg-clip-text bg-no-repeat py-4 text-transparent">
              <span className="">Not Found Page!</span>
            </div>
          </div>
        </div>
        <div className="relative z-50 w-full">
          <Button asChild size="lg" variant="outline" className="w-full">
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
}
