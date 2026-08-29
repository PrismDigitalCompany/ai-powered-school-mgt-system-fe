import { cn } from "../../lib/clsx";

const SkeletonLoader = ({ className, rounded = "rounded-md" }) => {
  return (
    <div
      aria-hidden={true}
      className={cn(
        "animate-pulse bg-skeleton-loader-gray dark:bg-skeleton-loader-bg-dark-gray",
        rounded,
        className,
      )}
    />
  );
};

export default SkeletonLoader;
