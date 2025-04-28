"use server"
import { cookies } from "next/headers"
import {
  searchHeritageItems,
  getHeritageItemsByState,
  getHeritageItemsByRegion,
  getHeritageItemById,
  fetchFromWikipedia,
  type HeritageItem,
} from "@/lib/api"

// Search for heritage items
export async function searchHeritage(query: string) {
  if (!query || query.trim() === "") {
    return { items: [] }
  }

  const items = await searchHeritageItems(query)
  return { items }
}

// Get heritage items by state
export async function getStateHeritage(state: string) {
  const items = await getHeritageItemsByState(state)
  return { items }
}

// Get heritage items by region
export async function getRegionHeritage(region: string) {
  const items = await getHeritageItemsByRegion(region)
  return { items }
}

// Get heritage item details
export async function getHeritageDetails(id: string) {
  const item = await getHeritageItemById(id)

  if (!item) {
    return { item: null, error: "Item not found" }
  }

  // If the item exists but we need more details from Wikipedia
  if (item && item.source === "wikipedia" && (!item.longDescription || !item.significance)) {
    try {
      const wikiData = await fetchFromWikipedia(item.title)

      // Merge the Wikipedia data with our existing data
      const updatedItem = {
        ...item,
        longDescription: item.longDescription || wikiData.longDescription,
        image: item.image || wikiData.image,
        sourceUrl: item.sourceUrl || wikiData.sourceUrl,
      }

      return { item: updatedItem }
    } catch (error) {
      console.error("Error fetching additional data from Wikipedia:", error)
      return { item }
    }
  }

  return { item }
}

// Save bookmark to cookies
export async function bookmarkHeritage(id: string) {
  const cookieStore = cookies()
  const existingBookmarks = cookieStore.get("bookmarks")?.value

  let bookmarkArray: string[] = []

  if (existingBookmarks) {
    try {
      bookmarkArray = JSON.parse(existingBookmarks)
    } catch (e) {
      bookmarkArray = []
    }
  }

  // Add the ID if it doesn't exist
  if (!bookmarkArray.includes(id)) {
    bookmarkArray.push(id)
  }

  // Save back to cookies
  cookieStore.set("bookmarks", JSON.stringify(bookmarkArray), {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  })

  return { success: true, bookmarks: bookmarkArray }
}

// Remove bookmark from cookies
export async function removeBookmark(id: string) {
  const cookieStore = cookies()
  const existingBookmarks = cookieStore.get("bookmarks")?.value

  let bookmarkArray: string[] = []

  if (existingBookmarks) {
    try {
      bookmarkArray = JSON.parse(existingBookmarks)
      bookmarkArray = bookmarkArray.filter((bookmarkId) => bookmarkId !== id)
    } catch (e) {
      bookmarkArray = []
    }
  }

  // Save back to cookies
  cookieStore.set("bookmarks", JSON.stringify(bookmarkArray), {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  })

  return { success: true, bookmarks: bookmarkArray }
}

// Get all bookmarks
export async function getBookmarks() {
  const cookieStore = cookies()
  const existingBookmarks = cookieStore.get("bookmarks")?.value

  let bookmarkArray: string[] = []

  if (existingBookmarks) {
    try {
      bookmarkArray = JSON.parse(existingBookmarks)
    } catch (e) {
      bookmarkArray = []
    }
  }

  // Fetch details for each bookmarked item
  const bookmarkedItems: HeritageItem[] = []

  for (const id of bookmarkArray) {
    const { item } = await getHeritageDetails(id)
    if (item) {
      bookmarkedItems.push(item)
    }
  }

  return { bookmarks: bookmarkedItems }
}
