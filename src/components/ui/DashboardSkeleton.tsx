export const DashboardSkeleton = () => {
  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-2xl border border-border p-5 h-36" />
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-border h-64" />
    </div>
  );

}