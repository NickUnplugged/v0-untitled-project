// API utilities for fetching data from Wikipedia and Indian tourism websites

// Wikipedia API endpoint
const WIKIPEDIA_API = "https://en.wikipedia.org/api/rest_v1/page/summary/"
const WIKIPEDIA_SEARCH_API = "https://en.wikipedia.org/w/api.php"

// Indian Tourism official websites
const INCREDIBLE_INDIA_API = "https://api.incredibleindia.org" // Placeholder URL
const MINISTRY_OF_CULTURE_API = "https://api.indiaculture.gov.in" // Placeholder URL

export type HeritageItem = {
  id: string
  title: string
  description: string
  longDescription?: string
  image: string
  gallery?: string[]
  category: string
  state: string
  region: string
  location: string
  period?: string
  significance?: string
  source: "wikipedia" | "incredibleindia" | "ministryofculture" | "local"
  sourceUrl?: string
  relatedItems?: RelatedItem[]
}

export type RelatedItem = {
  id: string
  title: string
  image: string
  category: string
}

// Fetch heritage item from Wikipedia
export async function fetchFromWikipedia(title: string): Promise<Partial<HeritageItem>> {
  try {
    const response = await fetch(`${WIKIPEDIA_API}${encodeURIComponent(title)}`, {
      headers: {
        "User-Agent": "BharatHeritage/1.0 (educational project)",
      },
    })

    if (!response.ok) {
      throw new Error(`Wikipedia API error: ${response.status}`)
    }

    const data = await response.json()

    return {
      title: data.title,
      description: data.extract,
      longDescription: data.extract_html,
      image: data.thumbnail?.source || "",
      source: "wikipedia",
      sourceUrl: data.content_urls?.desktop?.page,
    }
  } catch (error) {
    console.error("Error fetching from Wikipedia:", error)
    return {}
  }
}

// Search Wikipedia for heritage items
export async function searchWikipedia(query: string, limit = 10): Promise<Partial<HeritageItem>[]> {
  try {
    const params = new URLSearchParams({
      action: "query",
      list: "search",
      srsearch: query,
      format: "json",
      srlimit: limit.toString(),
      origin: "*",
    })

    const response = await fetch(`${WIKIPEDIA_SEARCH_API}?${params.toString()}`)

    if (!response.ok) {
      throw new Error(`Wikipedia search API error: ${response.status}`)
    }

    const data = await response.json()

    return data.query.search.map((item: any) => ({
      id: item.pageid.toString(),
      title: item.title,
      description: item.snippet.replace(/<\/?span[^>]*>/g, ""),
      source: "wikipedia",
      sourceUrl: `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title)}`,
    }))
  } catch (error) {
    console.error("Error searching Wikipedia:", error)
    return []
  }
}

// Fetch from Incredible India (placeholder implementation)
export async function fetchFromIncredibleIndia(id: string): Promise<Partial<HeritageItem>> {
  // In a real implementation, this would make an actual API call
  // For now, we'll return mock data
  console.log(`Would fetch from Incredible India API: ${id}`)

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    source: "incredibleindia",
    sourceUrl: "https://www.incredibleindia.org",
  }
}

// Fetch from Ministry of Culture (placeholder implementation)
export async function fetchFromMinistryOfCulture(id: string): Promise<Partial<HeritageItem>> {
  // In a real implementation, this would make an actual API call
  // For now, we'll return mock data
  console.log(`Would fetch from Ministry of Culture API: ${id}`)

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    source: "ministryofculture",
    sourceUrl: "https://www.indiaculture.gov.in",
  }
}

// Get heritage items by state
export async function getHeritageItemsByState(state: string): Promise<HeritageItem[]> {
  // This would typically fetch from a database or API
  // For now, we'll return mock data based on the state

  // Convert state slug to proper name
  const stateName = state
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Return mock data
  return MOCK_HERITAGE_ITEMS.filter((item) => item.state.toLowerCase() === stateName.toLowerCase())
}

// Get heritage items by region
export async function getHeritageItemsByRegion(region: string): Promise<HeritageItem[]> {
  // This would typically fetch from a database or API
  // For now, we'll return mock data based on the region

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Return mock data
  return MOCK_HERITAGE_ITEMS.filter((item) => item.region.toLowerCase().includes(region.toLowerCase()))
}

// Get heritage item by ID
export async function getHeritageItemById(id: string): Promise<HeritageItem | null> {
  // This would typically fetch from a database or API
  // For now, we'll return mock data based on the ID

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Return mock data
  const item = MOCK_HERITAGE_ITEMS.find((item) => item.id === id)
  return item || null
}

// Search heritage items
export async function searchHeritageItems(query: string): Promise<HeritageItem[]> {
  // This would typically search in a database or API
  // For now, we'll search in our mock data

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  if (!query) return []

  const lowerQuery = query.toLowerCase()

  // Return mock data
  return MOCK_HERITAGE_ITEMS.filter(
    (item) =>
      item.title.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery) ||
      item.state.toLowerCase().includes(lowerQuery) ||
      item.category.toLowerCase().includes(lowerQuery),
  )
}

// Mock data for development
const MOCK_HERITAGE_ITEMS: HeritageItem[] = [
  {
    id: "1",
    title: "Taj Mahal",
    description: "Iconic marble mausoleum in Agra, built by Emperor Shah Jahan.",
    longDescription:
      "The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in Agra, Uttar Pradesh, India. It was commissioned in 1631 by the Mughal emperor Shah Jahan to house the tomb of his favourite wife, Mumtaz Mahal; it also houses the tomb of Shah Jahan himself. The Taj Mahal was designated as a UNESCO World Heritage Site in 1983 for being 'the jewel of Muslim art in India and one of the universally admired masterpieces of the world's heritage'.",
    image: "/placeholder.svg?height=600&width=1200&text=Taj+Mahal",
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Taj+Mahal+1",
      "/placeholder.svg?height=300&width=400&text=Taj+Mahal+2",
      "/placeholder.svg?height=300&width=400&text=Taj+Mahal+3",
      "/placeholder.svg?height=300&width=400&text=Taj+Mahal+4",
    ],
    category: "Monuments",
    state: "Uttar Pradesh",
    region: "North India",
    location: "Agra, Uttar Pradesh",
    period: "1631-1648",
    significance:
      "The Taj Mahal represents the finest and most sophisticated example of Mughal architecture. Its origins lie in the moving circumstances of its commission and the culture and history of an Islamic Mughal empire's rule of large parts of India.",
    source: "wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Taj_Mahal",
    relatedItems: [
      {
        id: "2",
        title: "Red Fort",
        image: "/placeholder.svg?height=150&width=200&text=Red+Fort",
        category: "Monuments",
      },
      {
        id: "3",
        title: "Mughal Architecture",
        image: "/placeholder.svg?height=150&width=200&text=Mughal+Architecture",
        category: "History",
      },
    ],
  },
  {
    id: "2",
    title: "Red Fort",
    description: "Historic fort in the city of Delhi that served as the main residence of the Mughal Emperors.",
    image: "/placeholder.svg?height=600&width=1200&text=Red+Fort",
    category: "Monuments",
    state: "Delhi",
    region: "North India",
    location: "Delhi",
    period: "1638-1648",
    source: "wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Red_Fort",
  },
  {
    id: "3",
    title: "Ajanta Caves",
    description: "Ancient rock-cut Buddhist cave monuments dating from the 2nd century BCE.",
    image: "/placeholder.svg?height=600&width=1200&text=Ajanta+Caves",
    category: "Monuments",
    state: "Maharashtra",
    region: "West India",
    location: "Aurangabad, Maharashtra",
    period: "2nd century BCE to 6th century CE",
    source: "wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Ajanta_Caves",
  },
  {
    id: "4",
    title: "Khajuraho Group of Monuments",
    description:
      "Group of Hindu and Jain temples known for their nagara-style architectural symbolism and erotic sculptures.",
    image: "/placeholder.svg?height=600&width=1200&text=Khajuraho",
    category: "Monuments",
    state: "Madhya Pradesh",
    region: "Central India",
    location: "Khajuraho, Madhya Pradesh",
    period: "950-1050 CE",
    source: "wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Khajuraho_Group_of_Monuments",
  },
  {
    id: "5",
    title: "Meenakshi Temple",
    description: "Historic Hindu temple located on the southern bank of the Vaigai River in Madurai.",
    image: "/placeholder.svg?height=600&width=1200&text=Meenakshi+Temple",
    category: "Monuments",
    state: "Tamil Nadu",
    region: "South India",
    location: "Madurai, Tamil Nadu",
    period: "1623-1655 CE",
    source: "wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Meenakshi_Temple",
  },
  {
    id: "6",
    title: "Bharatanatyam",
    description: "Classical dance form originating from Tamil Nadu with ancient origins.",
    image: "/placeholder.svg?height=600&width=1200&text=Bharatanatyam",
    category: "Dance",
    state: "Tamil Nadu",
    region: "South India",
    location: "Tamil Nadu",
    source: "wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Bharatanatyam",
  },
  {
    id: "7",
    title: "Kathakali",
    description: "Classical dance-drama form from Kerala known for elaborate costumes and face paintings.",
    image: "/placeholder.svg?height=600&width=1200&text=Kathakali",
    category: "Dance",
    state: "Kerala",
    region: "South India",
    location: "Kerala",
    source: "wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Kathakali",
  },
  {
    id: "8",
    title: "Diwali Festival",
    description: "Festival of lights celebrating the triumph of light over darkness.",
    image: "/placeholder.svg?height=600&width=1200&text=Diwali",
    category: "Festivals",
    state: "Pan-India",
    region: "All Regions",
    location: "All across India",
    source: "wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Diwali",
  },
  {
    id: "9",
    title: "Holi",
    description: "Festival of colors celebrating the arrival of spring and the victory of good over evil.",
    image: "/placeholder.svg?height=600&width=1200&text=Holi",
    category: "Festivals",
    state: "Pan-India",
    region: "All Regions",
    location: "All across India",
    source: "wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Holi",
  },
  {
    id: "10",
    title: "Hindustani Classical Music",
    description: "Traditional music form of northern India with roots in ancient Hindu musical traditions.",
    image: "/placeholder.svg?height=600&width=1200&text=Hindustani+Music",
    category: "Music",
    state: "Pan-India",
    region: "North India",
    location: "North India",
    source: "wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Hindustani_classical_music",
  },
  {
    id: "11",
    title: "Carnatic Music",
    description: "Classical music tradition of southern India with ancient roots.",
    image: "/placeholder.svg?height=600&width=1200&text=Carnatic+Music",
    category: "Music",
    state: "Pan-India",
    region: "South India",
    location: "South India",
    source: "wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Carnatic_music",
  },
  {
    id: "12",
    title: "Madhubani Art",
    description: "Folk art from the Mithila region of Bihar known for geometric patterns and natural dyes.",
    image: "/placeholder.svg?height=600&width=1200&text=Madhubani+Art",
    category: "Art & Craft",
    state: "Bihar",
    region: "East India",
    location: "Mithila region, Bihar",
    source: "wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Madhubani_art",
  },
]
