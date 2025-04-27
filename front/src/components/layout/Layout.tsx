import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
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
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;