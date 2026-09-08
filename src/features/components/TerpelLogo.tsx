




export const TerpelLogo = ({ white = false }: { white?: boolean }) => {
    return (
        <div className="flex items-center gap-2">
            <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm"
                style={{ background: white ? "rgba(255,255,255,0.2)" : "#E30613", color: "white" }}
            >
                T
            </div>
            <span
                className="text-xl font-bold tracking-tight"
                style={{ color: white ? "white" : "#E30613" }}
            >
                TERPEL
            </span>
        </div>
    );
}