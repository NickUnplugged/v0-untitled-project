// API utilities for fetching data from Wikipedia and Indian tourism websites

// Wikipedia API endpoint
const WIKIPEDIA_API = "https://en.wikipedia.org/api/rest_v1/page/summary/"
const WIKIPEDIA_SEARCH_API = "https://en.wikipedia.org/w/api.php"

// Indian Tourism official websites
const INCREDIBLE_INDIA_API = "https://api.incredibleindia.org" // Placeholder URL

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
  rating?: number
  visitCount?: number
  isFeatured?: boolean
  tags?: string[]
  latitude?: number
  longitude?: number
}

export type RelatedItem = {
  id: string
  title: string
  image: string
  category: string
}

export type Region = {
  id: string
  name: string
  states: string[]
  description: string
  image: string
}

// Fetch heritage item from Wikipedia
export async function fetchFromWikipedia(title: string): Promise<Partial<HeritageItem>> {
  try {
    const response = await fetch(`${WIKIPEDIA_API}${encodeURIComponent(title)}`, {
      headers: {
        "User-Agent": "IndiaAura/1.0 (educational project)",
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
      srsearch: `${query} india heritage`,
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

// Get heritage items by category
export async function getHeritageItemsByCategory(category: string): Promise<HeritageItem[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Return mock data
  return MOCK_HERITAGE_ITEMS.filter((item) => item.category.toLowerCase() === category.toLowerCase())
}

// Get heritage items by state
export async function getHeritageItemsByState(state: string): Promise<HeritageItem[]> {
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
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Return mock data
  return MOCK_HERITAGE_ITEMS.filter((item) => item.region.toLowerCase().includes(region.toLowerCase()))
}

// Get featured heritage items
export async function getFeaturedHeritageItems(limit = 8): Promise<HeritageItem[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Return mock data
  return MOCK_HERITAGE_ITEMS.filter((item) => item.isFeatured)
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, limit)
}

// Get heritage item by ID
export async function getHeritageItemById(id: string): Promise<HeritageItem | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Return mock data
  const item = MOCK_HERITAGE_ITEMS.find((item) => item.id === id)
  return item || null
}

// Search heritage items
export async function searchHeritageItems(query: string): Promise<HeritageItem[]> {
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
      item.category.toLowerCase().includes(lowerQuery) ||
      (item.tags && item.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))),
  )
}

// Get popular states
export async function getPopularStates(limit = 6): Promise<{ state: string; count: number; image: string }[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Group items by state and count them
  const stateCounts = MOCK_HERITAGE_ITEMS.reduce(
    (acc, item) => {
      if (!acc[item.state]) {
        acc[item.state] = { count: 0, image: "" }
      }
      acc[item.state].count++
      if (!acc[item.state].image) {
        acc[item.state].image = item.image
      }
      return acc
    },
    {} as Record<string, { count: number; image: string }>,
  )

  // Convert to array and sort by count
  return Object.entries(stateCounts)
    .map(([state, { count, image }]) => ({ state, count, image }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
}

// Get all regions
export async function getAllRegions(): Promise<Region[]> {
  return [
    {
      id: "north",
      name: "North India",
      states: ["Jammu & Kashmir", "Himachal Pradesh", "Punjab", "Uttarakhand", "Haryana", "Delhi", "Uttar Pradesh"],
      description:
        "Home to the majestic Himalayas and the fertile Indo-Gangetic plains, North India is known for its rich history, diverse cultures, and iconic landmarks.",
      image: "/placeholder.svg?height=600&width=1200&text=North+India",
    },
    {
      id: "south",
      name: "South India",
      states: ["Tamil Nadu", "Kerala", "Karnataka", "Andhra Pradesh", "Telangana"],
      description:
        "South India is famous for its ancient temples, classical arts, rich literature, and delicious cuisine, all set against stunning coastal and mountainous landscapes.",
      image: "/placeholder.svg?height=600&width=1200&text=South+India",
    },
    {
      id: "east",
      name: "East India",
      states: [
        "West Bengal",
        "Odisha",
        "Bihar",
        "Jharkhand",
        "Assam",
        "Arunachal Pradesh",
        "Meghalaya",
        "Tripura",
        "Mizoram",
        "Manipur",
        "Nagaland",
        "Sikkim",
      ],
      description:
        "Eastern India is characterized by its diverse natural beauty, tribal cultures, and historical significance in India's cultural and political development.",
      image: "/placeholder.svg?height=600&width=1200&text=East+India",
    },
    {
      id: "west",
      name: "West India",
      states: ["Rajasthan", "Gujarat", "Goa", "Maharashtra"],
      description:
        "Western India is a colorful blend of desert landscapes, vibrant cities, serene beaches, and a rich tapestry of cultural traditions.",
      image: "/placeholder.svg?height=600&width=1200&text=West+India",
    },
    {
      id: "central",
      name: "Central India",
      states: ["Madhya Pradesh", "Chhattisgarh"],
      description:
        "The heart of India holds many archaeological treasures, ancient temples, wildlife reserves, and tribal cultures in its forested hills and plateaus.",
      image: "/placeholder.svg?height=600&width=1200&text=Central+India",
    },
  ]
}

// Get region by ID
export async function getRegionById(id: string): Promise<Region | null> {
  const regions = await getAllRegions()
  return regions.find((region) => region.id === id) || null
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
    rating: 4.8,
    visitCount: 9800000,
    isFeatured: true,
    tags: ["UNESCO", "Mughal", "Marble", "Mausoleum"],
    latitude: 27.1751,
    longitude: 78.0421,
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
    longDescription:
      "The Red Fort is a historic fort in Old Delhi, Delhi that served as the main residence of the Mughal Emperors. Emperor Shah Jahan commissioned construction of the Red Fort on 12 May 1638, when he decided to shift his capital from Agra to Delhi. Originally red and white, Shah Jahan's favourite colours, its design is credited to architect Ustad Ahmad Lahori, who also constructed the Taj Mahal. It was constructed between May 1639 and April 1648.",
    image: "/placeholder.svg?height=600&width=1200&text=Red+Fort",
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Red+Fort+1",
      "/placeholder.svg?height=300&width=400&text=Red+Fort+2",
      "/placeholder.svg?height=300&width=400&text=Red+Fort+3",
    ],
    category: "Monuments",
    state: "Delhi",
    region: "North India",
    location: "Delhi",
    period: "1638-1648",
    significance:
      "The Red Fort is the location from which the Prime Minister of India addresses the nation on Independence Day. On 15 August 1947, the first Prime Minister of India, Jawaharlal Nehru, raised the Indian national flag above the Lahori Gate. Every year on Independence Day, the Prime Minister hoists the Indian tricolour flag at the fort's main gate and delivers a nationally broadcast speech from its ramparts.",
    source: "wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Red_Fort",
    rating: 4.7,
    visitCount: 5200000,
    isFeatured: true,
    tags: ["UNESCO", "Mughal", "Fort", "Independence Day"],
    latitude: 28.6562,
    longitude: 77.241,
  },
  {
    id: "3",
    title: "Ajanta Caves",
    description: "Ancient rock-cut Buddhist cave monuments dating from the 2nd century BCE.",
    longDescription:
      "The Ajanta Caves are approximately 30 rock-cut Buddhist cave monuments dating from the 2nd century BCE to about 480 CE in the Aurangabad district of Maharashtra state in India. The caves include paintings and rock-cut sculptures described as among the finest surviving examples of ancient Indian art, particularly expressive paintings that present emotions through gesture, pose and form.",
    image: "/placeholder.svg?height=600&width=1200&text=Ajanta+Caves",
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Ajanta+Caves+1",
      "/placeholder.svg?height=300&width=400&text=Ajanta+Caves+2",
      "/placeholder.svg?height=300&width=400&text=Ajanta+Caves+3",
    ],
    category: "Monuments",
    state: "Maharashtra",
    region: "West India",
    location: "Aurangabad, Maharashtra",
    period: "2nd century BCE to 6th century CE",
    significance:
      "The Ajanta Caves constitute ancient monasteries and worship halls of different Buddhist traditions carved into a 250-feet wall of rock. The caves also present paintings depicting the past lives and rebirths of the Buddha, pictorial tales from the Aryasura's Jatakamala, and rock-cut sculptures of Buddhist deities.",
    source: "wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Ajanta_Caves",
    rating: 4.6,
    visitCount: 2800000,
    isFeatured: true,
    tags: ["UNESCO", "Buddhist", "Rock-cut", "Caves", "Paintings"],
    latitude: 20.5519,
    longitude: 75.703,
  },
  {
    id: "4",
    title: "Khajuraho Group of Monuments",
    description:
      "Group of Hindu and Jain temples known for their nagara-style architectural symbolism and erotic sculptures.",
    longDescription:
      "The Khajuraho Group of Monuments are a group of Hindu and Jain temples in Madhya Pradesh, India. The temples are famous for their nagara-style architectural symbolism and their erotic sculptures. Most Khajuraho temples were built between 885 CE and 1050 CE by the Chandela dynasty. Historical records note that the Khajuraho temple site had 85 temples by the 12th century, spread over 20 square kilometers. Of these, only about 20 temples have survived, spread over 6 square kilometers.",
    image: "/placeholder.svg?height=600&width=1200&text=Khajuraho",
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Khajuraho+1",
      "/placeholder.svg?height=300&width=400&text=Khajuraho+2",
      "/placeholder.svg?height=300&width=400&text=Khajuraho+3",
    ],
    category: "Monuments",
    state: "Madhya Pradesh",
    region: "Central India",
    location: "Khajuraho, Madhya Pradesh",
    period: "950-1050 CE",
    significance:
      "The Khajuraho temples are famous for their nagara-style architectural symbolism and their erotic sculptures. These ancient temples celebrate life and the relationships between humans, gods and goddesses.",
    source: "wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Khajuraho_Group_of_Monuments",
    rating: 4.5,
    visitCount: 1800000,
    isFeatured: true,
    tags: ["UNESCO", "Hindu", "Jain", "Sculptures", "Temple"],
    latitude: 24.852,
    longitude: 79.934,
  },
  {
    id: "5",
    title: "Meenakshi Temple",
    description: "Historic Hindu temple located on the southern bank of the Vaigai River in Madurai.",
    longDescription:
      "Arulmigu Meenakshi Sundareshwar Temple is a historic Hindu temple located on the southern bank of the Vaigai River in the temple city of Madurai, Tamil Nadu, India. It is dedicated to the goddess Meenakshi, a form of Parvati, and her consort, Sundareshwar, a form of Shiva. The temple is at the center of the ancient temple city of Madurai mentioned in the Tamil Sangam literature, with the goddess temple mentioned in 6th-century-CE texts.",
    image: "/placeholder.svg?height=600&width=1200&text=Meenakshi+Temple",
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Meenakshi+Temple+1",
      "/placeholder.svg?height=300&width=400&text=Meenakshi+Temple+2",
      "/placeholder.svg?height=300&width=400&text=Meenakshi+Temple+3",
    ],
    category: "Monuments",
    state: "Tamil Nadu",
    region: "South India",
    location: "Madurai, Tamil Nadu",
    period: "1623-1655 CE",
    significance:
      "The temple is a significant symbol for the Tamil people, and has been mentioned since antiquity in Tamil literature, though the present structure was built during the 1600s. The Meenakshi temple's gopurams are elaborately sculptured and painted, depicting stories from Hindu scriptures.",
    source: "wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Meenakshi_Temple",
    rating: 4.7,
    visitCount: 3500000,
    isFeatured: true,
    tags: ["Hindu", "Temple", "Tamil", "Gopuram"],
    latitude: 9.9195,
    longitude: 78.1193,
  },
  {
    id: "6",
    title: "Bharatanatyam",
    description: "Classical dance form originating from Tamil Nadu with ancient origins.",
    longDescription:
      "Bharatanatyam is a major form of Indian classical dance that originated in Tamil Nadu. It has its origins in the devadasi system, and is one of the oldest classical dance traditions in India. It was nurtured in the temples and courts of southern India since ancient times. Later it was codified and documented as a performing art in the 19th century by four brothers known as the Tanjore Quartet.",
    image: "/placeholder.svg?height=600&width=1200&text=Bharatanatyam",
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Bharatanatyam+1",
      "/placeholder.svg?height=300&width=400&text=Bharatanatyam+2",
      "/placeholder.svg?height=300&width=400&text=Bharatanatyam+3",
    ],
    category: "Dance",
    state: "Tamil Nadu",
    region: "South India",
    location: "Tamil Nadu",
    period: "2000 BCE onwards",
    significance:
      "Bharatanatyam is one of the oldest classical dance forms of India. It was nurtured in the temples and courts of southern India since ancient times. The dance form is known for its grace, purity, tenderness, and sculpturesque poses.",
    source: "wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Bharatanatyam",
    rating: 4.9,
    visitCount: 1200000,
    isFeatured: true,
    tags: ["Classical Dance", "Tamil", "Temple Art", "Natyashastra"],
    latitude: 13.0827,
    longitude: 80.2707,
  },
  {
    id: "7",
    title: "Kathakali",
    description: "Classical dance-drama form from Kerala known for elaborate costumes and face paintings.",
    longDescription:
      "Kathakali is a major form of classical Indian dance. It is a story play genre of art, but one distinguished by the elaborately colorful make-up, costumes and face masks that the traditionally male actor-dancers wear. Kathakali originated in the 17th century in present-day Kerala, a state on the southwestern coast of India.",
    image: "/placeholder.svg?height=600&width=1200&text=Kathakali",
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Kathakali+1",
      "/placeholder.svg?height=300&width=400&text=Kathakali+2",
      "/placeholder.svg?height=300&width=400&text=Kathakali+3",
    ],
    category: "Dance",
    state: "Kerala",
    region: "South India",
    location: "Kerala",
    period: "17th century onwards",
    significance:
      "Kathakali is considered one of the most visually dramatic theater forms in the world. It combines dance, music, vocal performances, and elaborate costumes to depict stories, typically from Indian epics.",
    source: "wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Kathakali",
    rating: 4.7,
    visitCount: 950000,
    isFeatured: false,
    tags: ["Classical Dance", "Kerala", "Drama", "Costume Art"],
    latitude: 10.8505,
    longitude: 76.2711,
  },
  {
    id: "8",
    title: "Diwali Festival",
    description: "Festival of lights celebrating the triumph of light over darkness.",
    longDescription:
      "Diwali or Deepavali is a festival of lights and one of the major festivals celebrated by Hindus, Jains, and Sikhs. The festival usually lasts five days and is celebrated during the Hindu lunisolar month Kartika. Diwali symbolizes the spiritual 'victory of light over darkness, good over evil, and knowledge over ignorance'.",
    image: "/placeholder.svg?height=600&width=1200&text=Diwali",
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Diwali+1",
      "/placeholder.svg?height=300&width=400&text=Diwali+2",
      "/placeholder.svg?height=300&width=400&text=Diwali+3",
    ],
    category: "Festivals",
    state: "Pan-India",
    region: "All Regions",
    location: "All across India",
    period: "Ancient to present",
    significance:
      "Diwali is one of the most popular and significant festivals in Hinduism. It spiritually signifies the victory of light over darkness, knowledge over ignorance, good over evil, and hope over despair. The festival preparations and rituals typically extend over a five-day period.",
    source: "wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Diwali",
    rating: 4.9,
    visitCount: 500000000,
    isFeatured: true,
    tags: ["Hindu", "Festival", "Lights", "Religion"],
    latitude: 20.5937,
    longitude: 78.9629,
  },
  {
    id: "9",
    title: "Holi",
    description: "Festival of colors celebrating the arrival of spring and the victory of good over evil.",
    longDescription:
      "Holi is a popular ancient Hindu festival, also known as the Festival of Love, the Festival of Colours, and the Festival of Spring. The festival celebrates the eternal and divine love of Radha and Krishna. It also signifies the triumph of good over evil, as it celebrates the victory of Lord Vishnu as Narasimha Narayana over Hiranyakashipu.",
    image: "/placeholder.svg?height=600&width=1200&text=Holi",
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Holi+1",
      "/placeholder.svg?height=300&width=400&text=Holi+2",
      "/placeholder.svg?height=300&width=400&text=Holi+3",
    ],
    category: "Festivals",
    state: "Pan-India",
    region: "All Regions",
    location: "All across India",
    period: "Ancient to present",
    significance:
      "Holi announces the arrival of spring and the passing of winter. The festival also celebrates the beginning of a good spring harvest season. It lasts for a night and a day, starting on the evening of the Purnima (Full Moon day) falling in the Hindu calendar month of Phalguna.",
    source: "wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Holi",
    rating: 4.8,
    visitCount: 450000000,
    isFeatured: true,
    tags: ["Hindu", "Festival", "Colors", "Spring"],
    latitude: 20.5937,
    longitude: 78.9629,
  },
  {
    id: "10",
    title: "Hindustani Classical Music",
    description: "Traditional music form of northern India with roots in ancient Hindu musical traditions.",
    longDescription:
      "Hindustani classical music is the traditional music of northern regions of the Indian subcontinent. It may also be called North Indian classical music or Śāstriya Sangīt. Its origins date from the 12th century CE, when it diverged from Carnatic music, the classical tradition of southern regions of the Indian subcontinent.",
    image: "/placeholder.svg?height=600&width=1200&text=Hindustani+Music",
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Hindustani+Music+1",
      "/placeholder.svg?height=300&width=400&text=Hindustani+Music+2",
      "/placeholder.svg?height=300&width=400&text=Hindustani+Music+3",
    ],
    category: "Music",
    state: "Pan-India",
    region: "North India",
    location: "North India",
    period: "12th century onwards",
    significance:
      "Hindustani classical music has two foundational elements, raga and tala. The raga forms the fabric of a melodic structure, and the tala measures the time cycle. Both raga and tala are open frameworks for creativity and allow for infinite variations within the set rules.",
    source: "wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Hindustani_classical_music",
    rating: 4.6,
    visitCount: 18000000,
    isFeatured: false,
    tags: ["Classical Music", "Raga", "Tala", "North Indian"],
    latitude: 28.6139,
    longitude: 77.209,
  },
  {
    id: "11",
    title: "Carnatic Music",
    description: "Classical music tradition of southern India with ancient roots.",
    longDescription:
      "Carnatic music, Karnāṭaka saṃgīta, or Karnāṭaka saṅgītam, is a system of music commonly associated with southern India, including the modern Indian states of Karnataka, Andhra Pradesh, Telangana, Kerala and Tamil Nadu, as well as Sri Lanka. It is one of two main subgenres of Indian classical music that evolved from ancient Hindu traditions, the other subgenre being Hindustani music, which emerged as a distinct form because of Persian or Islamic influences from Northern India.",
    image: "/placeholder.svg?height=600&width=1200&text=Carnatic+Music",
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Carnatic+Music+1",
      "/placeholder.svg?height=300&width=400&text=Carnatic+Music+2",
      "/placeholder.svg?height=300&width=400&text=Carnatic+Music+3",
    ],
    category: "Music",
    state: "Pan-India",
    region: "South India",
    location: "South India",
    period: "Ancient to present",
    significance:
      "Carnatic music is largely devotional in nature and purpose. Most compositions are written in praise of divine figures in Hinduism. There are also many songs emphasizing love and other social issues. It developed as a distinct genre during the 15th–16th centuries CE.",
    source: "wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Carnatic_music",
    rating: 4.7,
    visitCount: 15000000,
    isFeatured: true,
    tags: ["Classical Music", "South Indian", "Karnataka", "Tamil Nadu"],
    latitude: 13.0827,
    longitude: 80.2707,
  },
  {
    id: "12",
    title: "Madhubani Art",
    description: "Folk art from the Mithila region of Bihar known for geometric patterns and natural dyes.",
    longDescription:
      "Madhubani art (also Mithila painting) is a style of traditional painting practiced in the Mithila region of India and Nepal. Madhubani painting/art has remained confined to a compact geographical area and the skills have been passed on through generations of women, who painted on walls of their home, as part of their culture.",
    image: "/placeholder.svg?height=600&width=1200&text=Madhubani+Art",
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Madhubani+Art+1",
      "/placeholder.svg?height=300&width=400&text=Madhubani+Art+2",
      "/placeholder.svg?height=300&width=400&text=Madhubani+Art+3",
    ],
    category: "Art & Craft",
    state: "Bihar",
    region: "East India",
    location: "Mithila region, Bihar",
    period: "Ancient to present",
    significance:
      "Madhubani art often depicts people and their association with nature and Hindu deities as the central theme. Traditional Madhubani art was done on freshly plastered mud walls of huts, but now it is also done on cloth, handmade paper, and canvas.",
    source: "wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Madhubani_art",
    rating: 4.5,
    visitCount: 7800000,
    isFeatured: false,
    tags: ["Folk Art", "Bihar", "Painting", "Cultural Heritage"],
    latitude: 26.1542,
    longitude: 85.8918,
  },
  {
    id: "13",
    title: "Konark Sun Temple",
    description: "13th-century Sun Temple at Konark in Odisha, known for its elaborate architecture and stone wheels.",
    longDescription:
      "Konark Sun Temple is a 13th-century CE Sun temple at Konark about 35 kilometres (22 mi) northeast from Puri on the coastline of Odisha, India. The temple is attributed to king Narasimhadeva I of the Eastern Ganga dynasty about 1250 CE. Dedicated to the Hindu Sun God Surya, what remains of the temple complex has the appearance of a 100-foot (30 m) high chariot with immense wheels and horses, all carved from stone.",
    image: "/placeholder.svg?height=600&width=1200&text=Konark+Sun+Temple",
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Konark+Sun+Temple+1",
      "/placeholder.svg?height=300&width=400&text=Konark+Sun+Temple+2",
      "/placeholder.svg?height=300&width=400&text=Konark+Sun+Temple+3",
    ],
    category: "Monuments",
    state: "Odisha",
    region: "East India",
    location: "Konark, Odisha",
    period: "13th century CE",
    significance:
      "The Konark temple is widely known for its architectural grandeur and for the intricacy and profusion of sculptural work. The entire temple has been conceived as a chariot of the sun god with 24 wheels, each about 10 feet in diameter, with a set of spokes and elaborate carvings. Seven horses drag the temple.",
    source: "wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Konark_Sun_Temple",
    rating: 4.7,
    visitCount: 2500000,
    isFeatured: true,
    tags: ["UNESCO", "Hindu", "Temple", "Architecture"],
    latitude: 19.8876,
    longitude: 86.0945,
  },
  {
    id: "14",
    title: "Goa Carnival",
    description: "Annual festival in Goa with parades, music and dance performances.",
    longDescription:
      "The Goa Carnival is an annual festival held in Goa, India. The tradition was introduced by the Portuguese who ruled Goa for over four centuries. The carnival is celebrated for three days and nights, when the legendary King Momo takes over the state and the streets come alive with music and color. Huge parades are organized throughout the state with bands, dances and floats out all night on the streets, and grand balls held in the evenings.",
    image: "/placeholder.svg?height=600&width=1200&text=Goa+Carnival",
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Goa+Carnival+1",
      "/placeholder.svg?height=300&width=400&text=Goa+Carnival+2",
      "/placeholder.svg?height=300&width=400&text=Goa+Carnival+3",
    ],
    category: "Festivals",
    state: "Goa",
    region: "West India",
    location: "Goa",
    period: "Portuguese colonial era to present",
    significance:
      "The Goa Carnival is unique to Goa and was introduced by the Portuguese rulers. It is similar to the festival celebrated in Rio de Janeiro and other parts of the world with Portuguese colonial influence. Although it started as a Christian celebration, it has absorbed multiple influences to become a unique Goan festival.",
    source: "incredibleindia",
    sourceUrl: "https://www.incredibleindia.org",
    rating: 4.6,
    visitCount: 850000,
    isFeatured: false,
    tags: ["Portuguese", "Carnival", "Parade", "Music", "Dance"],
    latitude: 15.2993,
    longitude: 74.124,
  },
  {
    id: "15",
    title: "Jaisalmer Fort",
    description: "Medieval fortress in the golden city of Jaisalmer, Rajasthan.",
    longDescription:
      "Jaisalmer Fort is one of the largest fully preserved fortified cities in the world, situated in the city of Jaisalmer, Rajasthan. It is a World Heritage Site and stands amidst the golden stretches of the Thar Desert on Trikuta Hill. The fort was built in 1156 AD by the Rajput ruler Rawal Jaisal, from whom it derives its name.",
    image: "/placeholder.svg?height=600&width=1200&text=Jaisalmer+Fort",
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Jaisalmer+Fort+1",
      "/placeholder.svg?height=300&width=400&text=Jaisalmer+Fort+2",
      "/placeholder.svg?height=300&width=400&text=Jaisalmer+Fort+3",
    ],
    category: "Monuments",
    state: "Rajasthan",
    region: "West India",
    location: "Jaisalmer, Rajasthan",
    period: "1156 CE",
    significance:
      "Unlike most forts in India, the Jaisalmer Fort is a living fort with a quarter of the city's population still residing within its walls. The fort has an ingenious drainage system called ghut nali which allows for the easy drainage of rainwater away from the fort in all four directions.",
    source: "wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Jaisalmer_Fort",
    rating: 4.7,
    visitCount: 1200000,
    isFeatured: true,
    tags: ["UNESCO", "Rajput", "Fort", "Desert", "Living Fort"],
    latitude: 26.9157,
    longitude: 70.9083,
  },
  {
    id: "16",
    title: "Kumbh Mela",
    description: "Major pilgrimage and festival in Hinduism, held four times over 12 years.",
    longDescription:
      "Kumbh Mela is a major pilgrimage and festival in Hinduism. It is celebrated in a cycle of approximately 12 years, to celebrate every revolution Brihaspati (Jupiter) completes, at four river-bank pilgrimage sites: the Allahabad (Prayagraj) (Ganges-Yamuna-Sarasvati rivers confluence), Haridwar (Ganges), Nashik (Godavari), and Ujjain (Shipra).",
    image: "/placeholder.svg?height=600&width=1200&text=Kumbh+Mela",
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Kumbh+Mela+1",
      "/placeholder.svg?height=300&width=400&text=Kumbh+Mela+2",
      "/placeholder.svg?height=300&width=400&text=Kumbh+Mela+3",
    ],
    category: "Festivals",
    state: "Uttar Pradesh",
    region: "North India",
    location: "Prayagraj, Haridwar, Nashik, Ujjain",
    period: "Ancient to present",
    significance:
      "The Kumbh Mela is the largest peaceful gathering of people in the world. The size and scale of the Kumbh Mela has led to its being inscribed on UNESCO's Representative List of Intangible Cultural Heritage of Humanity. Visitors come to bathe in the sacred rivers for spiritual cleansing.",
    source: "wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Kumbh_Mela",
    rating: 4.9,
    visitCount: 120000000,
    isFeatured: true,
    tags: ["UNESCO", "Hindu", "Pilgrimage", "Spiritual", "Holy Rivers"],
    latitude: 25.4358,
    longitude: 81.8463,
  },
  {
    id: "17",
    title: "Hampi",
    description: "Ancient village with ruins of Vijayanagara Empire in Karnataka.",
    longDescription:
      "Hampi is an ancient village in the south Indian state of Karnataka. It's dotted with numerous ruined temple complexes from the Vijayanagara Empire. On the south bank of the River Tungabhadra is the 7th-century Hindu Virupaksha Temple, near the revived Hampi Bazaar. A carved stone chariot stands in front of the ruined Vittala Temple, the site's main attraction.",
    image: "/placeholder.svg?height=600&width=1200&text=Hampi",
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Hampi+1",
      "/placeholder.svg?height=300&width=400&text=Hampi+2",
      "/placeholder.svg?height=300&width=400&text=Hampi+3",
    ],
    category: "Monuments",
    state: "Karnataka",
    region: "South India",
    location: "Hampi, Karnataka",
    period: "14th-16th century CE",
    significance:
      "Hampi was the capital of the Vijayanagara Empire in the 14th century, and is a UNESCO World Heritage Site. The ruins at Hampi showcase an integration of intricate architecture with nature, representing a harmonious blend of human creation and natural landscape.",
    source: "wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Hampi",
    rating: 4.8,
    visitCount: 2300000,
    isFeatured: true,
    tags: ["UNESCO", "Vijayanagara", "Ruins", "Ancient City", "Temple"],
    latitude: 15.335,
    longitude: 76.46,
  },
  {
    id: "18",
    title: "Bihu",
    description: "Set of three important Assamese festivals celebrated in Assam.",
    longDescription:
      "Bihu is a set of three important Assamese festivals in the Indian state of Assam – 'Rongali' or 'Bohag Bihu' observed in April, 'Kongali' or 'Kati Bihu' observed in October, and 'Bhogali' or 'Magh Bihu' observed in January. The Rongali Bihu is the most important of the three, celebrating the Assamese New Year and the arrival of spring.",
    image: "/placeholder.svg?height=600&width=1200&text=Bihu",
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Bihu+1",
      "/placeholder.svg?height=300&width=400&text=Bihu+2",
      "/placeholder.svg?height=300&width=400&text=Bihu+3",
    ],
    category: "Festivals",
    state: "Assam",
    region: "East India",
    location: "Assam",
    period: "Ancient to present",
    significance:
      "Bihu is the chief festival in the Assamese culture. The three Bihu festivals signify three distinct phases in the farming calendar: Rongali Bihu marks the sowing season, Kongali Bihu the growing season, and Bhogali Bihu the harvest festival.",
    source: "wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Bihu",
    rating: 4.7,
    visitCount: 3500000,
    isFeatured: false,
    tags: ["Assamese", "Harvest Festival", "Folk Dance", "New Year"],
    latitude: 26.2006,
    longitude: 92.9376,
  },
  {
    id: "19",
    title: "Golden Temple",
    description: "Holiest Gurdwara and important pilgrimage site of Sikhism in Amritsar, Punjab.",
    longDescription:
      "The Harmandir Sahib ('Abode of God'), colloquially known as the Golden Temple, is a Gurdwara located in the city of Amritsar, Punjab, India. It is the preeminent spiritual site of Sikhism. The Gurdwara is built around a man-made pool (sarovar) that was completed by the fourth Sikh Guru, Guru Ram Das, in 1577.",
    image: "/placeholder.svg?height=600&width=1200&text=Golden+Temple",
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Golden+Temple+1",
      "/placeholder.svg?height=300&width=400&text=Golden+Temple+2",
      "/placeholder.svg?height=300&width=400&text=Golden+Temple+3",
    ],
    category: "Monuments",
    state: "Punjab",
    region: "North India",
    location: "Amritsar, Punjab",
    period: "1577 CE onwards",
    significance:
      "The Golden Temple is spiritually the most significant shrine in Sikhism. The temple is a symbol of brotherhood and equality. It has entrances in all four directions, signifying that it's open to all without distinction of caste, creed, sex, or religion.",
    source: "wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Golden_Temple",
    rating: 4.9,
    visitCount: 30000000,
    isFeatured: true,
    tags: ["Sikh", "Gurdwara", "Holy Site", "Architecture", "Gold"],
    latitude: 31.62,
    longitude: 74.8765,
  },
  {
    id: "20",
    title: "Ellora Caves",
    description: "Archaeological site with Buddhist, Hindu and Jain cave temples in Maharashtra.",
    longDescription:
      "Ellora is a UNESCO World Heritage Site located in the Aurangabad district of Maharashtra, India. It is one of the largest rock-cut monastery-temple cave complexes in the world, featuring Hindu, Buddhist and Jain monuments, and artwork, dating from the 600-1000 CE period. It consists of 100 caves, of which 34 caves are open to public.",
    image: "/placeholder.svg?height=600&width=1200&text=Ellora+Caves",
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Ellora+Caves+1",
      "/placeholder.svg?height=300&width=400&text=Ellora+Caves+2",
      "/placeholder.svg?height=300&width=400&text=Ellora+Caves+3",
    ],
    category: "Monuments",
    state: "Maharashtra",
    region: "West India",
    location: "Aurangabad, Maharashtra",
    period: "600-1000 CE",
    significance:
      "The Ellora caves represent the epitome of Indian rock-cut architecture. The 34 caves are actually structures excavated out of the vertical face of a basaltic hill. Cave 16, also known as Kailasa Temple, is the largest monolithic structure in the world, carved out of a single rock.",
    source: "wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Ellora_Caves",
    rating: 4.8,
    visitCount: 2800000,
    isFeatured: true,
    tags: ["UNESCO", "Buddhist", "Hindu", "Jain", "Rock-cut", "Caves"],
    latitude: 20.0258,
    longitude: 75.1777,
  },
]
