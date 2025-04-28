"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { searchHeritage } from "@/app/actions"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useDebounce } from "@/hooks/use-debounce"
import type { HeritageItem } from "@/lib/api"

interface SearchBarProps {
  className?: string
}

export function SearchBar({ className }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<HeritageItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const debouncedQuery = useDebounce(query, 300)
  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleSearch = async () => {
      if (debouncedQuery.trim() === "") {
        setResults([])
        return
      }

      setIsLoading(true)
      try {
        const { items } = await searchHeritage(debouncedQuery)
        setResults(items)
      } catch (error) {
        console.error("Search error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    handleSearch()
  }, [debouncedQuery])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim() !== "") {
      router.push(`/search?q=${encodeURIComponent(query)}`)
      setIsOpen(false)
    }
  }

  return (
    <div className={cn("relative w-full max-w-sm", className)} ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <Input
          type="search"
          placeholder="Search Indian heritage..."
          className="pr-10 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-amber-500"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
        />
        {query && (
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="absolute right-8 top-0 h-full px-3 text-zinc-400 hover:text-amber-500"
            onClick={() => {
              setQuery("")
              setResults([])
            }}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
        <Button
          type="submit"
          size="icon"
          variant="ghost"
          className="absolute right-0 top-0 h-full px-3 text-zinc-400 hover:text-amber-500"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          <span className="sr-only">Search</span>
        </Button>
      </form>

      {isOpen && (query.trim() !== "" || results.length > 0) && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-[70vh] overflow-y-auto rounded-md border border-zinc-700 bg-zinc-900 shadow-lg">
          {isLoading ? (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-5 w-5 animate-spin text-amber-500" />
              <span className="ml-2 text-zinc-400">Searching...</span>
            </div>
          ) : results.length > 0 ? (
            <ul className="py-2">
              {results.map((item) => (
                <li key={item.id} className="px-3">
                  <Link
                    href={`/heritage/${item.id}`}
                    className="flex items-start gap-3 rounded-md p-2 hover:bg-zinc-800"
                    onClick={() => setIsOpen(false)}
                  >
                    <div
                      className="h-10 w-10 flex-shrink-0 rounded bg-zinc-800 bg-cover bg-center"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div>
                      <p className="text-sm font-medium text-white">{item.title}</p>
                      <p className="text-xs text-zinc-400 line-clamp-1">{item.description}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-amber-500">
                          {item.category}
                        </span>
                        <span className="text-xs text-zinc-500">{item.state}</span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
              <li className="mt-1 border-t border-zinc-800 px-3 pt-2">
                <Button
                  variant="link"
                  className="w-full justify-center text-amber-500 hover:text-amber-400"
                  onClick={() => {
                    router.push(`/search?q=${encodeURIComponent(query)}`)
                    setIsOpen(false)
                  }}
                >
                  View all results
                </Button>
              </li>
            </ul>
          ) : query.trim() !== "" ? (
            <div className="p-4 text-center text-zinc-400">
              <p>No results found for "{query}"</p>
              <p className="mt-1 text-sm">Try different keywords or browse by category</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
