import { HomeBlock } from "@/app/_components/site/blocks/home-block";
import { WorldSection } from "@/components/ui/world";

export default function HomePage() {
  return (
    <div className="relative -z-50 flex min-h-[75vh] w-full items-center justify-center">
      <div className="absolute bottom-0 left-0 right-0 flex w-full items-center justify-center">
        <WorldSection />
      </div>
      <HomeBlock />
    </div>
  );
}
