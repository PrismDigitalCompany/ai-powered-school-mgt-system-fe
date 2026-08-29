import { forwardRef } from "react";
import { cn } from "../../../lib/clsx";

/* Card */

const Card = forwardRef(function Card({ className, children, ...props }, ref) {
  return (
    <section
      ref={ref}
      className={cn(
        "rounded-xl border border-slate-200 bg-white shadow-sm",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
});

Card.displayName = "Card";

/*Card Header*/

const CardHeader = forwardRef(function CardHeader(
  { className, children, ...props },
  ref,
) {
  return (
    <header
      ref={ref}
      className={cn(
        "flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4",
        className,
      )}
      {...props}
    >
      {children}
    </header>
  );
});

CardHeader.displayName = "CardHeader";

/* Card Title */

const CardTitle = forwardRef(function CardTitle(
  { className, children, ...props },
  ref,
) {
  return (
    <h3
      ref={ref}
      className={cn(
        "text-base font-semibold tracking-tight text-slate-900",
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  );
});

CardTitle.displayName = "CardTitle";

/* Card Description*/

const CardDescription = forwardRef(function CardDescription(
  { className, children, ...props },
  ref,
) {
  return (
    <p
      ref={ref}
      className={cn("mt-1 text-sm text-slate-500", className)}
      {...props}
    >
      {children}
    </p>
  );
});

CardDescription.displayName = "CardDescription";

/*Card Body */

const CardBody = forwardRef(function CardBody(
  { className, children, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn("p-5", className)} {...props}>
      {children}
    </div>
  );
});

CardBody.displayName = "CardBody";

/*Card Footer */

const CardFooter = forwardRef(function CardFooter(
  { className, children, ...props },
  ref,
) {
  return (
    <footer
      ref={ref}
      className={cn(
        "flex items-center justify-end gap-3 border-t border-slate-100 px-5 py-4",
        className,
      )}
      {...props}
    >
      {children}
    </footer>
  );
});

CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardBody, CardFooter };
