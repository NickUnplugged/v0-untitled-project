"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import type { HeritageItem } from "@/lib/api"

interface ShareButtonProps {
  item: HeritageItem
}

export default function ShareButton({ item }: ShareButtonProps) {
  const [isSharing, setIsSharing] = useState(false)

  const handleShare = async () => {
    setIsSharing(true)
    try {
      if (navigator.share) {
        await navigator.share({
          title: item.title,
          text: item.description,
          url: window.location.href,
        })
      } else {
        // Fallback for browsers that don't support the Web Share API
        await navigator.clipboard.writeText(window.location.href)
        toast({
          title: "Link copied",
          description: "The link has been copied to your clipboard.",
        })
      }
    } catch (error) {
      console.error("Error sharing:", error)
    } finally {
      setIsSharing(false)
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-zinc-400 hover:text-amber-500 hover:bg-zinc-900"
      onClick={handleShare}
      disabled={isSharing}
    >
      <Share2 className="h-5 w-5" />
      <span className="sr-only">Share</span>
    </Button>
  )
}
