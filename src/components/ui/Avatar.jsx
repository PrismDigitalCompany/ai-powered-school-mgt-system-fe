import { cn } from "../../lib/clsx";

const Avatar = ({ name = "", size = "md", src, className }) => {
  const sizes = {
    sm: "h-7 w-7 text-xs",
    md: "h-9 w-9 text-sm",
    lg: "h-14 w-14 text-lg",
  };

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={cn("rounded-full object-cover", (sizes = [size]))}
      />
    );
  }
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-brand-100 font-semibold text-brand-700",
        sizes[size],
      )}
    >
      {initials || "?"}
    </div>
  );
};

export default Avatar;
