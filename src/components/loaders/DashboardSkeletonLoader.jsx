import { cn } from "../../lib/clsx";
import CardsSkeletonLoader from "./CardSkeletonLoader";

const DashboardSkeletonLoader = ({ className, lines }) => {
  return (
    <div className={cn(`space-y-8`, className)}>
      <div className={cn("grid gap-6 md:grid-cols-2 xl:grid-cols-4")}>
        {Array.from({ length: lines }).map((_, index) => (
          <CardsSkeletonLoader key={index} lines={2} />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <CardsSkeletonLoader lines={6} />
        <CardsSkeletonLoader lines={6} />
      </div>
    </div>
  );
};

export default DashboardSkeletonLoader;
