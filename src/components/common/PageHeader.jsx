import { motion } from 'framer-motion';

const PageHeader =({ eyebrow, title, description, actions })=> {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex flex-col gap-4 border-b border-border-line pb-5 mb-6 sm:flex-row sm:items-end sm:justify-between"
    >
      <div>
        {eyebrow && (
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-warning mb-1">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-2xl sm:text-3xl text-text-body font-semibold">{title}</h1>
        {description && <p className="text-text-body/60 mt-1 max-w-2xl text-sm">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </motion.div>
  );
}

export default PageHeader;