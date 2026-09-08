import { useState } from "react";
import { Loader2, AlertTriangle, CheckCircle } from "lucide-react";

interface StatusModalProps {
  stationName: string;
  currentStatus: "active" | "inactive" | "published" | "draft";
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

export const StatusModal = ({
  stationName,
  currentStatus,
  onConfirm,
  onCancel,
}: StatusModalProps) => {
  const [loading, setLoading] = useState(false);
  const isDeactivating = currentStatus === "active" || currentStatus === "published";

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(17, 24, 39, 0.4)" }}
      onClick={(e) => e.target === e.currentTarget && !loading && onCancel()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md modal-enter">
        <div className="p-6">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
              isDeactivating ? "bg-[#FEF3F2]" : "bg-[#ECFDF3]"
            }`}
          >
            {isDeactivating ? (
              <AlertTriangle size={22} className="text-error" />
            ) : (
              <CheckCircle size={22} className="text-success" />
            )}
          </div>

          <h2 className="text-lg font-bold text-text-primary mb-2">
            {isDeactivating ? "¿Desactivar esta estación?" : "¿Activar esta estación?"}
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            {isDeactivating
              ? `Los usuarios ya no podrán ver la información asociada a "${stationName}".`
              : `"${stationName}" estará disponible nuevamente y su información será visible.`}
          </p>
        </div>

        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-lg border border-border text-sm font-semibold text-text-primary hover:bg-bg-secondary transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-all ${
              isDeactivating
                ? "bg-error hover:bg-[#D92D20]"
                : "bg-success hover:bg-[#039855]"
            } disabled:opacity-60`}
          >
            {loading ? (
              <>
                <Loader2 size={15} className="animate-spin" /> Procesando...
              </>
            ) : isDeactivating ? (
              "Desactivar estación"
            ) : (
              "Activar estación"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}