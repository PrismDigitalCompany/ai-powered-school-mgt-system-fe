import SidebarItems from "./SidebarItems";

const SidebarGroup = ({ title, items = [], onNavigate }) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="space-y-1">
      {title && (
        <p className="px-2.5 pb-1 text-11 font-semibold uppercase tracking-wide text-slate-400">
          {title}
        </p>
      )}
      <div className="space-y-0.5">
        {items.map((item) => (
          <SidebarItems key={item.id} item={item} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
};

export default SidebarGroup;
