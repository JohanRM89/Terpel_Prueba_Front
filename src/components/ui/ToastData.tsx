import { useEffect, useState } from "react";
import { CheckCircle, XCircle, X, AlertTriangle } from "lucide-react";

export type ToastType = "success" | "error" | "warning";

export interface ToastData {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastProps {
  toast: ToastData;
  onDismiss: (id: string) => void;
}
interface ToastContainerProps {
  toasts: ToastData[];
  onDismiss: (id: string) => void;
}
function Toast({ toast, onDismiss }: ToastProps) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => onDismiss(toast.id), 300);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const icons = {
    success: <CheckCircle size={18} className="text-success" />,
    error: <XCircle size={18} className="text-error" />,
    warning: <AlertTriangle size={18} className="text-warning" />,
  };

  const borders = {
    success: "border-l-[#12B76A]",
    error: "border-l-[#F04438]",
    warning: "border-l-[#F79009]",
  };

  return (
    <div
      className={`flex items-start gap-3 bg-white rounded-xl shadow-lg border border-border border-l-4 ${
        borders[toast.type]
      } px-4 py-3.5 min-w-[320px] max-w-sm ${
        exiting ? "toast-exit" : "toast-enter"
      }`}
    >
      <div className="mt-0.5 shrink-0">{icons[toast.type]}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-text-primary">{toast.title}</p>
        {toast.message && (
          <p className="text-xs text-text-secondary mt-0.5">{toast.message}</p>
        )}
      </div>
      <button
        onClick={() => {
          setExiting(true);
          setTimeout(() => onDismiss(toast.id), 300);
        }}
        className="text-text-tertiary hover:text-text-secondary transition-colors mt-0.5 shrink-0"
      >
        <X size={14} />
      </button>
    </div>
  );
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-100 flex flex-col gap-2">
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}