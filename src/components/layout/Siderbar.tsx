import { 
  LayoutDashboard, 
  Radio, 
  HelpCircle, 
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { PATHS } from "@/routes/paths";
import type { SidebarProps } from "../interfaces/ILayout";



const NAV_ITEMS = [
  { path: PATHS.DASHBOARD, label: "Dashboard", icon: LayoutDashboard },
  { path: PATHS.STATIONS, label: "Estaciones", icon: Radio },

];

export const Sidebar = ({ collapsed }: SidebarProps) => {
  return (
    <aside
      className="hidden md:flex flex-col bg-white border-r border-border transition-all duration-300 relative shrink-0"
      style={{ width: collapsed ? 72 : 240 }}
    >
      <div className="h-16 flex items-center border-b border-border px-4 overflow-hidden shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm text-white shrink-0"
            style={{ background: "#E30613" }}
          >
            T
          </div>
          {!collapsed && (
            <span className="text-base font-bold tracking-tight text-brand truncate">
              TERPEL
            </span>
          )}
        </div>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-hidden">
        {NAV_ITEMS.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            title={collapsed ? label : undefined}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left group ${
                isActive
                  ? "bg-[#FFF1F2] text-brand"
                  : "text-text-secondary hover:bg-background hover:text-text-primary"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={18}
                  className={`shrink-0 transition-colors ${
                    isActive ? "text-brand" : "text-[#98A2B3] group-hover:text-[#344054]"
                  }`}
                />
                {!collapsed && <span className="truncate">{label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="px-2 pb-4 space-y-0.5 border-t border-border pt-4 overflow-hidden">
        <button 
          title={collapsed ? "Help" : undefined} 
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:bg-background hover:text-text-primary transition-all"
        >
          <HelpCircle size={18} className="shrink-0 text-[#98A2B3]" />
          {!collapsed && <span>Ayuda</span>}
        </button>
        <button 
          title={collapsed ? "Profile" : undefined} 
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:bg-background hover:text-text-primary transition-all"
        >
          <div className="w-6 h-6 rounded-full bg-brand flex items-center justify-center text-white text-xs font-bold shrink-0">
            A
          </div>
          {!collapsed && <span className="truncate">Administrator</span>}
        </button>
      </div>
    </aside>
  );
};