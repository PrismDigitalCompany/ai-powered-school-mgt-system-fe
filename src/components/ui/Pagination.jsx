import Btn from "./Btn";
import Icon from "../icons/Icon.jsx";
const Pagination = ({ page, pageSize, totalItems, onPageChange }) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const start = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-col items-center justify-between gap-3 border-t border-border px-4 py-3 sm:flex-row"
    >
      <p className="text-sm text-text-muted">
        Showing <span className="font-medium text-text">{start}</span>–
        <span className="font-medium text-text">{end}</span> of{" "}
        <span className="font-medium text-text">{totalItems}</span>
      </p>
      <div className="flex items-center gap-2">
        <Btn
          variant="secondary"
          size="sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          <Icon name="chevronLeft" className="h-4 w-4" />
        </Btn>
        <span className="text-sm text-text-muted">
          Page {page} of {totalPages}
        </span>
        <Btn
          variant="secondary"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          <Icon name="chevronRight" className="h-4 w-4" />
        </Btn>
      </div>
    </nav>
  );
};

export default Pagination;
