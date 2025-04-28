import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { SearchBar } from "@/components/search-bar"
import { searchHeritage } from "@/app/actions"

interface SearchPageProps {
  searchParams: {
    q?: string
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""
  const { items } = await searchHeritage(query)

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span className="font-medium">Back to Home</span>
          </Link>
          <SearchBar className="max-w-sm mx-auto" />
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-16 bg-zinc-950">
          <div className="container px-4 md:px-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">Search Results</h1>
              <p className="mt-2 text-zinc-400">
                {items.length} results found for "{query}"
              </p>
            </div>

            {items.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <Card
                    key={item.id}
                    className="overflow-hidden bg-zinc-900 border-zinc-800 hover:border-amber-500/50 transition-all duration-300"
                  >
                    <div className="relative h-48">
                      <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                      <Badge className="absolute top-2 right-2 bg-amber-500 text-black hover:bg-amber-600">
                        {item.category}
                      </Badge>
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="line-clamp-1 text-white">{item.title}</CardTitle>
                      <CardDescription className="text-zinc-400">
                        {item.state} • {item.region}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-zinc-400 line-clamp-2">{item.description}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-zinc-700 text-white hover:bg-zinc-800 hover:border-amber-500/50"
                      >
                        <Link href={`/heritage/${item.id}`} className="w-full">
                          View Details
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-900 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 text-amber-500"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">No results found</h2>
                <p className="text-zinc-400 max-w-md mx-auto">
                  We couldn't find any heritage items matching "{query}". Try different keywords or browse by category.
                </p>
                <Button className="mt-6 bg-amber-500 text-black hover:bg-amber-600" asChild>
                  <Link href="/">Return to Home</Link>
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <footer className="w-full border-t border-zinc-800 bg-black">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-zinc-400 md:text-left">
              &copy; {new Date().getFullYear()} भारतHeritage. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-xs text-zinc-500">Data sourced from Wikipedia and official Indian tourism websites</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
