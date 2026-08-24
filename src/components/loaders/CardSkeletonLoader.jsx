import SkeletonLoader from "./SkeletonLoader";
import { cn } from "../../lib/clsx";

const CardSkeletonLoader = ({ lines = 3, className }) => {
  return (
    <div className={cn("rounded-xl border bg-white p-6 shadow-sm", className)}>
      <SkeletonLoader className={`mb-4 h-6 w-1/2`} />
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, index) => (
          <SkeletonLoader key={index} className={`h-4 w-full`} />
        ))}
      </div>
    </div>
  );
};

export default CardSkeletonLoader;
