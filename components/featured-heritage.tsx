"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookmarkIcon, Share2, ExternalLink } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { getRegionHeritage, bookmarkHeritage, getBookmarks } from "@/app/actions"
import type { HeritageItem } from "@/lib/api"
import { toast } from "@/components/ui/use-toast"

interface FeaturedHeritageProps {
  region?: string
}

export default function FeaturedHeritage({ region = "north" }: FeaturedHeritageProps) {
  const [items, setItems] = useState<HeritageItem[]>([])
  const [loading, setLoading] = useState(true)
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([])

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true)
      try {
        // Use getHeritageItemsByRegion but we'll filter by region string, not route
        const { items } = await getRegionHeritage(region)
        setItems(items)
      } catch (error) {
        console.error("Error fetching heritage items:", error)
      } finally {
        setLoading(false)
      }
    }

    const fetchBookmarks = async () => {
      try {
        const result = await getBookmarks()
        // Check if result and result.bookmarks exist before accessing
        setBookmarkedIds((result?.bookmarks || []).map((item) => item.id))
      } catch (error) {
        console.error("Error fetching bookmarks:", error)
        // Set to empty array in case of error
        setBookmarkedIds([])
      }
    }

    fetchItems()
    fetchBookmarks()
  }, [region])

  const handleBookmark = async (id: string) => {
    try {
      const { bookmarks } = await bookmarkHeritage(id)
      setBookmarkedIds(bookmarks)
      toast({
        title: "Item bookmarked",
        description: "This item has been added to your bookmarks.",
      })
    } catch (error) {
      console.error("Error bookmarking item:", error)
      toast({
        title: "Error",
        description: "Failed to bookmark this item. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleShare = (item: HeritageItem) => {
    if (navigator.share) {
      navigator
        .share({
          title: item.title,
          text: item.description,
          url: window.location.origin + `/heritage/${item.id}`,
        })
        .catch((error) => console.log("Error sharing", error))
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.origin + `/heritage/${item.id}`)
      toast({
        title: "Link copied",
        description: "The link has been copied to your clipboard.",
      })
    }
  }

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="overflow-hidden bg-zinc-900 border-zinc-800 animate-pulse">
            <div className="relative h-48 bg-zinc-800"></div>
            <CardHeader className="p-4">
              <div className="h-6 w-3/4 bg-zinc-800 rounded mb-2"></div>
              <div className="h-4 w-1/2 bg-zinc-800 rounded"></div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="h-4 w-full bg-zinc-800 rounded"></div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between">
              <div className="h-8 w-1/2 bg-zinc-800 rounded"></div>
              <div className="flex gap-2">
                <div className="h-8 w-8 bg-zinc-800 rounded"></div>
                <div className="h-8 w-8 bg-zinc-800 rounded"></div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <Card
          key={item.id}
          className="overflow-hidden bg-zinc-900 border-zinc-800 hover:border-amber-500/50 transition-all duration-300"
        >
          <div className="relative h-48">
            <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
            <Badge className="absolute top-2 right-2 bg-amber-500 text-black hover:bg-amber-600">{item.category}</Badge>
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
          <CardFooter className="p-4 pt-0 flex justify-between">
            <Button
              variant="outline"
              size="sm"
              className="w-full border-zinc-700 text-white hover:bg-zinc-800 hover:border-amber-500/50"
            >
              <Link href={`/heritage/${item.id}`} className="w-full">
                Explore
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`${bookmarkedIds.includes(item.id) ? "text-amber-500" : "text-zinc-400"} hover:text-amber-500 hover:bg-zinc-800`}
              onClick={() => handleBookmark(item.id)}
            >
              <BookmarkIcon className="h-4 w-4" />
              <span className="sr-only">Bookmark</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-400 hover:text-amber-500 hover:bg-zinc-800"
              onClick={() => handleShare(item)}
            >
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Share</span>
            </Button>
          </CardFooter>
          {item.source && (
            <div className="px-4 pb-2 flex items-center justify-end">
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-zinc-500 hover:text-amber-500 flex items-center gap-1"
              >
                Source:{" "}
                {item.source === "wikipedia"
                  ? "Wikipedia"
                  : item.source === "incredibleindia"
                    ? "Incredible India"
                    : item.source === "ministryofculture"
                      ? "Ministry of Culture"
                      : "Local"}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}
