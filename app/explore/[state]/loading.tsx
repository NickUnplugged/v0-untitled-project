export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <div className="container py-12">
        <div className="w-full h-[50vh] bg-zinc-900 animate-pulse rounded-lg mb-8"></div>
        <div className="h-10 w-1/3 bg-zinc-900 animate-pulse rounded-lg mb-4"></div>
        <div className="h-6 w-1/2 bg-zinc-900 animate-pulse rounded-lg mb-8"></div>

        <div className="flex gap-4 mb-8 overflow-x-auto">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-10 w-32 bg-zinc-900 animate-pulse rounded-lg flex-shrink-0"></div>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-zinc-900 animate-pulse rounded-lg overflow-hidden">
              <div className="h-48 bg-zinc-800"></div>
              <div className="p-4">
                <div className="h-6 w-3/4 bg-zinc-800 rounded mb-2"></div>
                <div className="h-4 w-1/2 bg-zinc-800 rounded mb-4"></div>
                <div className="h-4 w-full bg-zinc-800 rounded mb-4"></div>
                <div className="h-10 w-full bg-zinc-800 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
