export const StatusBadge = ({ status }: { status: "published" | "draft" | string }) => {
  const isPublished = status === "published";

  return (
    <span
      className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
        isPublished ? "bg-[#ECFDF3] text-[#027A48]" : "bg-[#F2F4F7] text-text-secondary"
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${isPublished ? "bg-success" : "bg-text-tertiary"}`} />
      {isPublished ? "Activo" : "Inactivo"}
    </span>
  );
}