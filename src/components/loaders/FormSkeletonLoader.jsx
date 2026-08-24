import { cn } from "../../lib/clsx";
import SkeletonLoader from "./SkeletonLoader";

const FormSkeletonLoader = ({ field, className }) => {
  return (
    <div className={cn("space-y-6", field, className)}>
      {Array.from({ length: field }).map((_, index) => (
        <div key={index}>
          <SkeletonLoader className={`mb-2 h-4 w-28`} />
          <SkeletonLoader className={` h-11 w-full rounded-lg`} />
        </div>
      ))}
    </div>
  );
};

export default FormSkeletonLoader;
