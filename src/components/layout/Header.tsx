import { useState } from "react";
import { Search, Bell, ChevronDown, User, Settings, LogOut, Menu } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { persistor } from "@/store";
import { PATHS } from "@/routes/paths";

interface HeaderProps {
    breadcrumb: string[];
    onLogout?: () => void;
    onMenuToggle?: () => void;
}

export const Header = ({ breadcrumb, onLogout: onLogoutProp, onMenuToggle }: HeaderProps) => {
    const [userOpen, setUserOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        if (onLogoutProp) {
            onLogoutProp();
        }
        dispatch({ type: "RESET_STORE" });
        window.location.href = PATHS.LOGIN;
        await persistor.purge();
        navigate(PATHS.LOGIN, { replace: true });
    };
    const listNotifications = [
        { title: "Estación 3 desactivada", time: "hace 3 días" },
        { title: "Contenido de Estación 1 actualizado", time: "hace 2 horas" },
    ];

    const listUserOptions = [
        { icon: User, label: "Mi perfil" },
        { icon: Settings, label: "Configuraciones" },
    ];
    return (
        <header className="h-16 bg-white border-b border-border flex items-center px-4 md:px-6 gap-4 shrink-0 relative z-30">
            <button
                onClick={onMenuToggle}
                className="md:hidden p-2 rounded-lg hover:bg-background text-text-secondary transition-colors"
            >
                <Menu size={20} />
            </button>
            <div className="flex items-center gap-1.5 text-sm text-text-secondary min-w-0 flex-1">
                {breadcrumb.map((crumb, i) => (
                    <span key={i} className="flex items-center gap-1.5">
                        {i > 0 && <span className="text-text-tertiary">/</span>}
                        <span className={i === breadcrumb.length - 1 ? "font-medium text-text-primary truncate" : "truncate"}>
                            {crumb}
                        </span>
                    </span>
                ))}
            </div>


            <div className="relative">
                <button
                    onClick={() => { setNotifOpen(!notifOpen); setUserOpen(false); }}
                    className="relative p-2 rounded-lg hover:bg-background text-text-secondary hover:text-text-primary transition-colors"
                >
                    <Bell size={18} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand rounded-full" />
                </button>

                {notifOpen && (
                    <div className="absolute right-0 top-12 w-72 bg-white rounded-xl shadow-lg border border-border p-4 z-40">
                        <p className="text-sm font-semibold text-text-primary mb-3">Notificaciones</p>
                        <div className="space-y-3">
                            {listNotifications.map((n, i) => (
                                <div key={i} className="flex gap-3 items-start">
                                    <div className="w-2 h-2 bg-brand rounded-full mt-1.5 shrink-0" />
                                    <div>
                                        <p className="text-sm text-text-secondary">{n.title}</p>
                                        <p className="text-xs text-text-prima">{n.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="relative">
                <button
                    onClick={() => { setUserOpen(!userOpen); setNotifOpen(false); }}
                    className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-background transition-colors"
                >
                    <div className="w-7 h-7 rounded-full bg-brand flex items-center justify-center text-white text-xs font-bold shrink-0">
                        A
                    </div>
                    <span className="hidden sm:block text-sm font-medium text-text-primary">Administrador</span>
                    <ChevronDown size={14} className="text-text-secondary hidden sm:block" />
                </button>

                {userOpen && (
                    <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-lg border border-border py-1 z-40">
                        {listUserOptions.map(({ icon: Icon, label }) => (
                            <button
                                key={label}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-text-primary hover:bg-background transition-colors text-left"
                            >
                                <Icon size={15} className="text-text-secondary" />
                                {label}
                            </button>
                        ))}

                        <div className="border-t border-border mt-1 pt-1">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-error hover:bg-[#FFF5F5] transition-colors text-left cursor-pointer"
                            >
                                <LogOut size={15} />
                                Cerrar sesión
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {(userOpen || notifOpen) && (
                <div className="fixed inset-0 z-20" onClick={() => { setUserOpen(false); setNotifOpen(false); }} />
            )}
        </header>
    );
};