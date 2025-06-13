import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import ChatWidget from "./chat/ChatWidget";

const Layout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar collapsed={sidebarCollapsed} />

      <div className="flex flex-col flex-1">
        <TopNavbar toggleSidebar={toggleSidebar} />
        <main className="p-5 flex-1">
          <Outlet />
        </main>
      </div>

      <ChatWidget />
    </div>
  );
};

export default Layout;
