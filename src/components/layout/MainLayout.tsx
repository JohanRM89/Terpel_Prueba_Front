

import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { PATHS } from "@/routes/paths";
import { Sidebar } from "./Siderbar";

export const MainLayout = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const location = useLocation();

    const getBreadcrumbs = (): string[] => {
        const path = location.pathname;

        if (path.startsWith(PATHS.STATIONS)) {
            return ["Inicio", "Estaciones"];
        }
        if (path.startsWith(PATHS.DASHBOARD)) {
            return ["Inicio", "Dashboard"];
        }

        return ["Inicio"];
    };

    return (
        <div className="flex h-screen bg-[#F7F8FA] overflow-hidden">
            <Sidebar
                collapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed((prev) => !prev)}
            />
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                <Header
                    breadcrumb={getBreadcrumbs()}
                />
                <main className="flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};