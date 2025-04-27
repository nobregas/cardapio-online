import { Link, useLocation } from "react-router-dom";
import { NavItem } from "../../types";

interface SidebarProps {
  collapsed?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed = false }) => {
  const location = useLocation();

  const navItems: NavItem[] = [
    { path: "/", icon: "fa-chart-pie", label: "Dashboard" },
    { path: "/produtos", icon: "fa-box", label: "Produtos" },
    { path: "/categorias", icon: "fa-list", label: "Categorias" },
    { path: "/adicionais", icon: "fa-plus-circle", label: "Adicionais" },
    { path: "/promocoes", icon: "fa-tag", label: "Promoções" },
    { path: "/pedidos", icon: "fa-shopping-cart", label: "Pedidos" },
    {
      path: "/personalizacao",
      icon: "fa-paint-brush",
      label: "Personalização",
    },
    { path: "/configuracoes", icon: "fa-cog", label: "Configurações" },
  ];

  return (
    <div
      className={`bg-gray-800 text-white h-100% flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-60"
      }`}
    >
      <div
        className={`p-5 text-center border-b border-gray-700/30 ${
          collapsed ? "p-2" : "p-5"
        }`}
      >
        {!collapsed && (
          <img
            src="/api/placeholder/160/80"
            alt="Logo"
            className="w-40 h-auto mx-auto"
          />
        )}
        {collapsed ? (
          <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold mx-auto">
            B
          </div>
        ) : (
          <div className="mt-2 font-semibold">Pizza do Beto</div>
        )}
      </div>

      <ul className="py-2">
        {navItems.map((item, index) => {
          const isActive =
            location.pathname === item.path ||
            (item.path !== "/" && location.pathname.startsWith(item.path));

          return (
            <li key={index} className="mb-1">
              <Link
                to={item.path}
                className={`flex items-center ${
                  collapsed ? "justify-center px-3" : "px-5"
                } py-3 text-gray-300 hover:bg-gray-700/30 hover:text-white transition-colors ${
                  isActive ? "bg-gray-700/30 text-white" : ""
                }`}
              >
                <i
                  className={`fas ${item.icon} ${
                    collapsed ? "" : "w-5 text-center mr-3"
                  } text-lg`}
                ></i>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
