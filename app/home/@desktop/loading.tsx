import { RadarAnimation } from "@/components/ui/RadarAnimation";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-[700px] w-full bg-red-50">
      <div className="bg-gradient-to-r from-red-500/10 via-red-600/20 to-red-500/10 w-full h-full flex flex-col items-center justify-center space-y-8 animate-pulse">
        <RadarAnimation />

        <h2 className="text-2xl font-semibold text-red-600 mt-8 tracking-wide">
          Finding people near you
          <span className="inline-flex">
            <span className="animate-bounce">.</span>
            <span className="animate-bounce delay-100">.</span>
            <span className="animate-bounce delay-200">.</span>
          </span>
        </h2>
      </div>
    </div>
  );
}
