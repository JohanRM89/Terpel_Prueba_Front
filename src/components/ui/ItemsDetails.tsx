export const InfoItem = ({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ElementType;
    label: string;
    value: string;
}) => {
    return (
        <div>
            <div className="flex items-center gap-1.5 mb-1">
                <Icon size={12} className="text-text-tertiary" />
                <span className="text-xs text-text-tertiary font-medium">{label}</span>
            </div>
            <span className="text-sm font-semibold text-text-primary">{value}</span>
        </div>
    );
};

export const DetailRow = ({
  label,
  value,
  isSuccess,
}: {
  label: string;
  value: string;
  isSuccess?: boolean;
}) => {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <span className="text-sm text-text-secondary">{label}</span>
      <span
        className={`text-sm font-semibold ${
          isSuccess === true
            ? "text-success"
            : isSuccess === false
            ? "text-error"
            : "text-text-primary"
        }`}
      >
        {value}
      </span>
    </div>
  );
}