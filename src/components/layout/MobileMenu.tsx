import { X, LayoutDashboard, Radio, FileText, Settings, HelpCircle, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { persistor } from "@/store";
import { PATHS } from "@/routes/paths";

interface MobileMenuProps {
  onLogout?: () => void;
  onClose: () => void;
}

const NAV_ITEMS = [
  { path: PATHS.DASHBOARD, label: "Dashboard", icon: LayoutDashboard },
  { path: PATHS.STATIONS, label: "Stations", icon: Radio },
  { path: "/content", label: "Content", icon: FileText },
  { path: "/settings", label: "Settings", icon: Settings },
];

export const MobileMenu = ({ onLogout: onLogoutProp, onClose }: MobileMenuProps) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      if (onLogoutProp) {
        onLogoutProp();
      }
      await persistor.purge();
      dispatch({ type: "RESET_STORE" });
      window.location.href = PATHS.LOGIN;
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 z-40 bg-black/40 md:hidden" 
        onClick={onClose} 
      />

      <div className="fixed left-0 top-0 bottom-0 w-64 bg-white z-50 flex flex-col md:hidden shadow-2xl">
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#E4E7EC]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#E30613] flex items-center justify-center text-white font-black text-sm">
              T
            </div>
            <span className="font-bold text-[#E30613] text-lg">TERPEL</span>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-lg hover:bg-[#F7F8FA] text-[#667085] transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-0.5">
          {NAV_ITEMS.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={onClose}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
                  isActive
                    ? "bg-[#FFF1F2] text-[#E30613]"
                    : "text-[#667085] hover:bg-[#F7F8FA] hover:text-[#171717]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon 
                    size={18} 
                    className={isActive ? "text-[#E30613]" : "text-[#98A2B3]"} 
                  />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="px-2 pb-6 space-y-0.5 border-t border-[#E4E7EC] pt-4">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#667085] hover:bg-[#F7F8FA] transition-colors">
            <HelpCircle size={18} className="text-[#98A2B3]" />
            Ayuda
          </button>
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#F04438] hover:bg-[#FFF5F5] transition-colors cursor-pointer"
          >
            <LogOut size={18} />
            Cerrar sesión
          </button>
        </div>
      </div>
    </>
  );
};