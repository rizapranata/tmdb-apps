export default function PopularSkeleton() {
  return (
    <div className="bg-primary">
      <div className="lg:container px-4 py-5">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="h-[200px] lg:h-[250px] xl:h-[350px] bg-gray-400 animate-pulse rounded-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
