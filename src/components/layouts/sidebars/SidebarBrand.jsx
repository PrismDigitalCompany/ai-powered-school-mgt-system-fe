import { useRef } from "react";
import { cn } from "../../../lib/clsx";
import Icons from "../../icons/Icon.jsx";

const SidebarBrand = ({
  src,
  name,
  desc,
  className,
  canUpload = false,
  handleImgChange,
  uploading = false,
}) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    if (!canUpload || uploading) return;
    fileInputRef.current?.click();
  };

  return (
    <div
      className={cn(
        "flex h-16 shrink-0 items-center gap-2 border-b border-slate-100 px-5",
        className,
      )}
    >
      {/* Logo / Default Icon */}
      <button
        type="button"
        onClick={handleClick}
        disabled={!canUpload || uploading}
        className={cn(
          "relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-brand-600 text-white transition",
          canUpload &&
            "cursor-pointer hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-500",
          uploading && "cursor-wait opacity-70",
        )}
      >
        {src ? (
          <img
            src={src}
            alt={`${name} logo`}
            className="h-full w-full object-cover"
          />
        ) : (
          <Icons name={`graduationCap`} className="h-5 w-5" />
        )}
      </button>

      {/* Hidden File Input */}
      {canUpload && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImgChange}
        />
      )}

      {/* School Details */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold leading-tight text-slate-900">
          {name}
        </p>

        <p className="truncate text-xs leading-tight text-slate-400">{desc}</p>

        {canUpload && (
          <p className="mt-1 text-[10px] text-slate-500">
            {uploading ? "Uploading..." : "Click logo to change"}
          </p>
        )}
      </div>
    </div>
  );
};

export default SidebarBrand;
