import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Music, Landmark, Palette, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import StateSelector from "@/components/state-selector"
import FeaturedHeritage from "@/components/featured-heritage"
import { SearchBar } from "@/components/search-bar"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
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
              className="h-6 w-6 text-amber-500"
            >
              <path d="M12 2a8 8 0 0 0-8 8c0 5.4 7.4 11.5 7.6 11.7.2.1.5.1.8 0 .2-.2 7.6-6.3 7.6-11.7a8 8 0 0 0-8-8z" />
              <path d="M12 13V9" />
              <path d="M12 6h.01" />
            </svg>
            <span className="text-xl font-bold">
              भारत<span className="text-amber-500">Heritage</span>
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/about" className="text-sm font-medium transition-colors hover:text-amber-500">
              About
            </Link>
            <Link href="/explore" className="text-sm font-medium transition-colors hover:text-amber-500">
              Explore
            </Link>
            <Link href="/collections" className="text-sm font-medium transition-colors hover:text-amber-500">
              Collections
            </Link>
            <Link href="/contribute" className="text-sm font-medium transition-colors hover:text-amber-500">
              Contribute
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <SearchBar className="hidden md:flex" />
            <Button variant="outline" size="sm" className="hidden md:flex border-zinc-700 text-white hover:bg-zinc-900">
              Sign In
            </Button>
            <Button size="sm" className="bg-amber-500 text-black hover:bg-amber-600">
              Join Free
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center relative">
          <div className="absolute inset-0 bg-black/70"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Discover India's Rich Cultural Heritage
                </h1>
                <p className="mx-auto max-w-[700px] text-zinc-300 md:text-xl">
                  Explore the diverse traditions, monuments, arts, and festivals across the states of India.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <div className="bg-zinc-900/90 backdrop-blur-sm rounded-lg p-4 border border-zinc-800">
                  <StateSelector />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-zinc-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-amber-500/10 text-amber-500 px-3 py-1 text-sm border border-amber-500/20">
                  Explore India
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Cultural Categories</h2>
                <p className="max-w-[900px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Dive into different aspects of India's cultural heritage and discover the richness of its traditions.
                </p>
              </div>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 pt-8">
              <Card className="flex flex-col items-center justify-center p-4 transition-all hover:scale-105 bg-zinc-900 border-zinc-800 hover:border-amber-500/50">
                <Landmark className="h-8 w-8 mb-2 text-amber-500" />
                <CardContent className="p-0 text-center">
                  <h3 className="font-semibold text-white">Monuments</h3>
                  <p className="text-sm text-zinc-400">Historic sites & landmarks</p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center justify-center p-4 transition-all hover:scale-105 bg-zinc-900 border-zinc-800 hover:border-amber-500/50">
                <BookOpen className="h-8 w-8 mb-2 text-amber-500" />
                <CardContent className="p-0 text-center">
                  <h3 className="font-semibold text-white">History</h3>
                  <p className="text-sm text-zinc-400">Stories of ancient India</p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center justify-center p-4 transition-all hover:scale-105 bg-zinc-900 border-zinc-800 hover:border-amber-500/50">
                <Palette className="h-8 w-8 mb-2 text-amber-500" />
                <CardContent className="p-0 text-center">
                  <h3 className="font-semibold text-white">Art & Craft</h3>
                  <p className="text-sm text-zinc-400">Traditional artforms</p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center justify-center p-4 transition-all hover:scale-105 bg-zinc-900 border-zinc-800 hover:border-amber-500/50">
                <Music className="h-8 w-8 mb-2 text-amber-500" />
                <CardContent className="p-0 text-center">
                  <h3 className="font-semibold text-white">Music</h3>
                  <p className="text-sm text-zinc-400">Classical & folk sounds</p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center justify-center p-4 transition-all hover:scale-105 bg-zinc-900 border-zinc-800 hover:border-amber-500/50">
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
                  className="h-8 w-8 mb-2 text-amber-500"
                >
                  <path d="m12 9 5 3-5 3-5-3 5-3" />
                  <path d="m12 17 5-3" />
                  <path d="m7 14 5 3" />
                  <path d="M19 6.94 12 3 5 6.94" />
                  <path d="M12 21v-9" />
                </svg>
                <CardContent className="p-0 text-center">
                  <h3 className="font-semibold text-white">Dance</h3>
                  <p className="text-sm text-zinc-400">Classical & folk dances</p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center justify-center p-4 transition-all hover:scale-105 bg-zinc-900 border-zinc-800 hover:border-amber-500/50">
                <Calendar className="h-8 w-8 mb-2 text-amber-500" />
                <CardContent className="p-0 text-center">
                  <h3 className="font-semibold text-white">Festivals</h3>
                  <p className="text-sm text-zinc-400">Celebrations & rituals</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-black border-t border-zinc-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-amber-500/10 text-amber-500 px-3 py-1 text-sm border border-amber-500/20">
                  Featured
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Cultural Treasures</h2>
                <p className="max-w-[900px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover highlighted cultural treasures from across India.
                </p>
              </div>
            </div>
            <Tabs defaultValue="north" className="mt-8">
              <div className="flex justify-center">
                <TabsList className="mb-8 bg-zinc-900 p-1">
                  <TabsTrigger
                    value="north"
                    className="data-[state=active]:bg-zinc-800 data-[state=active]:text-amber-500"
                  >
                    North India
                  </TabsTrigger>
                  <TabsTrigger
                    value="south"
                    className="data-[state=active]:bg-zinc-800 data-[state=active]:text-amber-500"
                  >
                    South India
                  </TabsTrigger>
                  <TabsTrigger
                    value="east"
                    className="data-[state=active]:bg-zinc-800 data-[state=active]:text-amber-500"
                  >
                    East India
                  </TabsTrigger>
                  <TabsTrigger
                    value="west"
                    className="data-[state=active]:bg-zinc-800 data-[state=active]:text-amber-500"
                  >
                    West India
                  </TabsTrigger>
                  <TabsTrigger
                    value="central"
                    className="data-[state=active]:bg-zinc-800 data-[state=active]:text-amber-500"
                  >
                    Central India
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="north" className="space-y-4">
                <FeaturedHeritage />
              </TabsContent>
              <TabsContent value="south" className="space-y-4">
                <FeaturedHeritage />
              </TabsContent>
              <TabsContent value="east" className="space-y-4">
                <FeaturedHeritage />
              </TabsContent>
              <TabsContent value="west" className="space-y-4">
                <FeaturedHeritage />
              </TabsContent>
              <TabsContent value="central" className="space-y-4">
                <FeaturedHeritage />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-zinc-950 border-t border-zinc-900">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-amber-500/10 text-amber-500 px-3 py-1 text-sm border border-amber-500/20">
                    Join Us
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Begin Your Cultural Journey Today</h2>
                  <p className="max-w-[600px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Create an account to save your favorite cultural treasures, build custom itineraries, and contribute
                    to our growing database of Indian heritage.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="px-8 bg-amber-500 text-black hover:bg-amber-600">
                    Sign Up Free
                  </Button>
                  <Button size="lg" variant="outline" className="px-8 border-zinc-700 text-white hover:bg-zinc-900">
                    Learn More
                  </Button>
                </div>
              </div>
              <Image
                src="/placeholder.svg?height=400&width=500"
                width={500}
                height={400}
                alt="Cultural exploration"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full border border-zinc-800"
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t border-zinc-800 bg-black">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
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
              className="h-6 w-6 text-amber-500"
            >
              <path d="M12 2a8 8 0 0 0-8 8c0 5.4 7.4 11.5 7.6 11.7.2.1.5.1.8 0 .2-.2 7.6-6.3 7.6-11.7a8 8 0 0 0-8-8z" />
              <path d="M12 13V9" />
              <path d="M12 6h.01" />
            </svg>
            <p className="text-center text-sm leading-loose text-zinc-400 md:text-left">
              &copy; {new Date().getFullYear()} भारतHeritage. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-zinc-400 underline underline-offset-4 hover:text-amber-500">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-zinc-400 underline underline-offset-4 hover:text-amber-500">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
