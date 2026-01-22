export function SkeletonCard({ height = "h-24" }: { height?: string }) {
  return (
    <div className={`${height} bg-gray-200 rounded-lg animate-pulse`}></div>
  );
}

export function SkeletonGrid({ columns = 3, count = 6 }: { columns?: number; count?: number }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-6`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonText() {
  return (
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
    </div>
  );
}
