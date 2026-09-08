import type { Station } from "@/features/types/station.types";

export interface HeaderProps {
  breadcrumb: string[]
  onLogout: () => void
  onMenuToggle?: () => void
}

export interface  SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export interface StationCardProps {
  station: Station;
  menuOpen: boolean;
  onMenuToggle: () => void;
  onView: () => void;
  onStatusChange: () => void;
}