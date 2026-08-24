import { cn } from "../../lib/clsx";

const Table = ({ className, children, ...props }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table
        className={cn("w-full border-collapse text-sm", className)}
        {...props}
      >
        {children}
      </table>
    </div>
  );
};

const TableBody = ({ className, children, ...props }) => {
  return (
    <tbody className={cn("divide-y divide-border", className)} {...props}>
      {children}
    </tbody>
  );
};

const TableCell = ({ className, children, ...props }) => {
  return (
    <td
      className={cn("whitespace-nowrap px-4 py-3 text-text", className)}
      {...props}
    >
      {children}
    </td>
  );
};

const TableHeader = ({ className, children, ...props }) => {
  return (
    <th
      className={cn("whitespace-nowrap px-4 py-3 uppercase", className)}
      {...props}
      scope="col"
    >
      {children}
    </th>
  );
};

const TableHead = ({ className, children, ...props }) => {
  return (
    <thead
      className={cn(
        "bg-paper text-left text-xs font-medium uppercase tracking-wide text-text-muted",
        className,
      )}
      {...props}
    >
      {children}
    </thead>
  );
};

const TableRow = ({ className, children, ...props }) => {
  return (
    <tr
      className={cn("transition-colors hover:bg-paper", className)}
      {...props}
    >
      {children}
    </tr>
  );
};

export { Table, TableBody, TableCell, TableHeader, TableHead, TableRow };
