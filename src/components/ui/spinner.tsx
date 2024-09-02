import { cn } from "@/lib/utils";

export function Spinner({ className }: { className?: string }) {
  return (
    <div className={cn("relative size-4", className)}>
      <div className="absolute w-full h-full inset-0 z-10" data-visible="true">
        <div className="relative w-full h-full inset-1/2">
          <SpinnerTick delay={-1.2} rotation={0} />
          <SpinnerTick delay={-1.1} rotation={30} />
          <SpinnerTick delay={-1.0} rotation={60} />
          <SpinnerTick delay={-0.9} rotation={90} />
          <SpinnerTick delay={-0.8} rotation={120} />
          <SpinnerTick delay={-0.7} rotation={150} />
          <SpinnerTick delay={-0.6} rotation={180} />
          <SpinnerTick delay={-0.5} rotation={210} />
          <SpinnerTick delay={-0.4} rotation={240} />
          <SpinnerTick delay={-0.3} rotation={270} />
          <SpinnerTick delay={-0.2} rotation={300} />
          <SpinnerTick delay={-0.1} rotation={330} />
        </div>
      </div>
    </div>
  );
}

function SpinnerTick({ rotation, delay }: { rotation: number; delay: number }) {
  return (
    <div
      className={cn(
        "absolute h-[8%] left-[-10%] top-[-3.9%] w-[24%] animate-sonner-spin bg-gray-100 rounded-md",
      )}
      style={{
        animationDelay: `${delay}s`,
        transform: `rotate(${rotation}deg) translate(146%)`,
      }}
    />
  );
}
