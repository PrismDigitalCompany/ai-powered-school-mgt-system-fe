import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "./Table";
import TableSkeletonLoader from "../loaders/TableSkeletonLoader";
import EmptyState from "../feedback/EmptyState";
import ErrorState from "../feedback/ErrorState";

const DataTable = ({
  columns,
  data = [],
  getRowId = (row) => row.id,
  isLoading = false,
  isError = false,
  errorMessage,
  onRetry,
  emptyTitle = "Nothing here yet",
  emptyDescription,
}) => {
  if (isLoading) {
    return <TableSkeletonLoader rows={5} columns={columns.length} />;
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-border">
        <ErrorState description={errorMessage} onRetry={onRetry} />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-border">
        <EmptyState title={emptyTitle} description={emptyDescription} />
      </div>
    );
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableHeader key={column.key} className={column.className}>
              {column.header}
            </TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <TableRow key={getRowId(row)}>
            {columns.map((column) => (
              <TableCell key={column.key} className={column.className}>
                {column.render ? column.render(row) : row[column.key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
