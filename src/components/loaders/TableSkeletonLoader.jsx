import Skeleton from "./SkeletonLoader";

const TableSkeletonLoader = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="overflow-hidden rounded-xl border">
      <table className="w-full">
        <thead>
          <tr>
            {Array.from({ length: columns }).map((_, column) => (
              <th key={column} className="px-4 py-3">
                <Skeleton className="h-4 w-20" />
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: rows }).map((_, row) => (
            <tr key={row} className="border-t">
              {Array.from({ length: columns }).map((_, column) => (
                <td key={column} className="px-4 py-4">
                  <Skeleton className="h-4 w-full" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TableSkeletonLoader;
