import { motion } from 'framer-motion';


 const DataTable = ({ columns, rows, keyField = 'id', emptyState = 'No records yet.' }) => {
  return (
    <div className="border border-border-line rounded-md overflow-hidden bg-card">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-sidebar text-sidebar-text">
              {columns.map((col) => (
                <th key={col.key} className="text-left font-mono text-[11px] uppercase tracking-wider px-4 py-3 whitespace-nowrap">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-10 text-center text-text-body/60 text-sm">
                  {emptyLabel}
                </td>
              </tr>
            ) : (
              rows.map((row, i) => (
                <motion.tr
                  key={row[keyField] ?? i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25, delay: Math.min(i * 0.02, 0.3) }}
                  className="border-t border-border-line hover:bg-primary/5 transition-colors"
                >
                  {columns.map((col) => (
                    <td key={col.key} className={`px-4 py-3 text-text-body whitespace-nowrap ${col.className || ''}`}>
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;