"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { BookmarkIcon } from "lucide-react"
import { bookmarkHeritage, removeBookmark, getBookmarks } from "@/app/actions"
import { toast } from "@/components/ui/use-toast"

interface BookmarkButtonProps {
  id: string
}

export default function BookmarkButton({ id }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkIfBookmarked = async () => {
      try {
        const { bookmarks } = await getBookmarks()
        setIsBookmarked(bookmarks.some((item) => item.id === id))
      } catch (error) {
        console.error("Error checking bookmarks:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkIfBookmarked()
  }, [id])

  const handleToggleBookmark = async () => {
    setIsLoading(true)
    try {
      if (isBookmarked) {
        await removeBookmark(id)
        setIsBookmarked(false)
        toast({
          title: "Bookmark removed",
          description: "This item has been removed from your bookmarks.",
        })
      } else {
        await bookmarkHeritage(id)
        setIsBookmarked(true)
        toast({
          title: "Item bookmarked",
          description: "This item has been added to your bookmarks.",
        })
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error)
      toast({
        title: "Error",
        description: "Failed to update bookmark. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`${isBookmarked ? "text-amber-500" : "text-zinc-400"} hover:text-amber-500 hover:bg-zinc-900`}
      onClick={handleToggleBookmark}
      disabled={isLoading}
    >
      <BookmarkIcon className="h-5 w-5" />
      <span className="sr-only">{isBookmarked ? "Remove bookmark" : "Bookmark"}</span>
    </Button>
  )
}
