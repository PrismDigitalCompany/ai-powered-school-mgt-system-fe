import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebars/Sidebar";
import Topbar from "./topbar/Topbar";

const DashboardLayout = ({ navGroups = [] }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <div className="flex overflow-hidden h-screen bg-surface-alt">
      <Sidebar
        open={openSidebar}
        onClose={() => setOpenSidebar(false)}
        navGroups={navGroups}
      />
      <div className="flex flex-col flex-col-1 min-w-0">
        <Topbar onMenuClick={() => setOpenSidebar(true)} />
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
