import { Filter, RefreshCw, Search } from "lucide-react";

export const SkeletonGrid = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-border p-5 space-y-3">
                    <div className="flex justify-between">
                        <div className="space-y-2">
                            <div className="skeleton h-3 w-16" />
                            <div className="skeleton h-5 w-36" />
                        </div>
                        <div className="skeleton h-8 w-8 rounded-lg" />
                    </div>
                    <div className="flex gap-2">
                        <div className="skeleton h-8 w-8 rounded-lg" />
                        <div className="skeleton h-8 w-8 rounded-lg" />
                    </div>
                    <div className="skeleton h-px w-full" />
                    <div className="flex justify-between">
                        <div className="skeleton h-3 w-28" />
                        <div className="skeleton h-3 w-20" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export const EmptyState = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-background border-2 border-dashed border-border flex items-center justify-center mb-4">
                <Filter size={24} className="text-text-tertiary" />
            </div>
            <h3 className="text-base font-semibold text-text-primary mb-1">No hay estaciones creadas</h3>
            <p className="text-sm text-text-tertiary max-w-xs">
                Crea una nueva estación para empezar a administrar su contenido y servicios.
            </p>
        </div>
    );
}

export const SearchEmptyState = ({ query }: { query: string }) => {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-background border-2 border-dashed border-border flex items-center justify-center mb-4">
                <Search size={24} className="text-text-tertiary" />
            </div>
            <h3 className="text-base font-semibold text-text-primary mb-1">
                No hay estaciones que coincidan con tu búsqueda
            </h3>
            <p className="text-sm text-text-tertiary max-w-xs">
                No hay resultados para "<strong>{query}</strong>". Intenta con un nombre o ID diferente.
            </p>
        </div>
    );
}

export const ErrorState = ({ onRetry }: { onRetry: () => void }) => {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#FEF3F2] flex items-center justify-center mb-4">
                <RefreshCw size={24} className="text-error" />
            </div>
            <h3 className="text-base font-semibold text-text-primary mb-1">
                No se pudieron cargar las estaciones
            </h3>
            <p className="text-sm text-text-tertiary mb-5 max-w-xs">
                Tenemos problemas para cargar las estaciones       </p>
            <button
                onClick={onRetry}
                className="flex items-center gap-2 px-4 py-2.5 bg-brand text-white text-sm font-semibold rounded-lg hover:bg-brand-dark transition-colors"
            >
                <RefreshCw size={14} />
                Reintentar
            </button>
        </div>
    );
}