import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Music, Landmark, Palette, Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { SearchBar } from "@/components/search-bar"

interface StatePageProps {
  params: {
    state: string
  }
}

export default function StatePage({ params }: StatePageProps) {
  // This would be fetched from an API in a real application
  const stateName = params.state
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center relative">
          <div className="absolute inset-0 bg-black/70"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-amber-500/10 text-amber-500 px-3 py-1 text-sm border border-amber-500/20">
                  State Heritage
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Exploring {stateName}
                </h1>
                <p className="mx-auto max-w-[700px] text-zinc-300 md:text-xl">
                  Discover the rich cultural heritage of {stateName} through its monuments, history, art, music, dance,
                  and festivals.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-zinc-950">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="monuments" className="w-full">
              <TabsList className="w-full justify-start mb-8 overflow-x-auto bg-zinc-900 p-1">
                <TabsTrigger
                  value="monuments"
                  className="flex items-center gap-2 data-[state=active]:bg-zinc-800 data-[state=active]:text-amber-500"
                >
                  <Landmark className="h-4 w-4" />
                  Monuments
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="flex items-center gap-2 data-[state=active]:bg-zinc-800 data-[state=active]:text-amber-500"
                >
                  <BookOpen className="h-4 w-4" />
                  History
                </TabsTrigger>
                <TabsTrigger
                  value="art"
                  className="flex items-center gap-2 data-[state=active]:bg-zinc-800 data-[state=active]:text-amber-500"
                >
                  <Palette className="h-4 w-4" />
                  Art & Craft
                </TabsTrigger>
                <TabsTrigger
                  value="music"
                  className="flex items-center gap-2 data-[state=active]:bg-zinc-800 data-[state=active]:text-amber-500"
                >
                  <Music className="h-4 w-4" />
                  Music
                </TabsTrigger>
                <TabsTrigger
                  value="dance"
                  className="flex items-center gap-2 data-[state=active]:bg-zinc-800 data-[state=active]:text-amber-500"
                >
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
                    className="h-4 w-4"
                  >
                    <path d="m12 9 5 3-5 3-5-3 5-3" />
                    <path d="m12 17 5-3" />
                    <path d="m7 14 5 3" />
                    <path d="M19 6.94 12 3 5 6.94" />
                    <path d="M12 21v-9" />
                  </svg>
                  Dance
                </TabsTrigger>
                <TabsTrigger
                  value="festivals"
                  className="flex items-center gap-2 data-[state=active]:bg-zinc-800 data-[state=active]:text-amber-500"
                >
                  <Calendar className="h-4 w-4" />
                  Festivals
                </TabsTrigger>
              </TabsList>
              <TabsContent value="monuments" className="space-y-4">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <Card
                      key={item}
                      className="overflow-hidden bg-zinc-900 border-zinc-800 hover:border-amber-500/50 transition-all duration-300"
                    >
                      <div className="relative h-48">
                        <Image
                          src={`/placeholder.svg?height=300&width=400&text=Monument ${item}`}
                          alt={`Monument ${item}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader className="p-4">
                        <CardTitle className="line-clamp-1 text-white">Historic Monument {item}</CardTitle>
                        <CardDescription className="text-zinc-400">{stateName}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-zinc-400 line-clamp-2">
                          A description of this historic monument and its cultural significance to {stateName}.
                        </p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-zinc-700 text-white hover:bg-zinc-800 hover:border-amber-500/50"
                        >
                          Learn More
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                <div className="flex justify-center mt-8">
                  <Button className="bg-amber-500 text-black hover:bg-amber-600">Load More</Button>
                </div>
              </TabsContent>
              <TabsContent value="history" className="space-y-4">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <Card
                      key={item}
                      className="overflow-hidden bg-zinc-900 border-zinc-800 hover:border-amber-500/50 transition-all duration-300"
                    >
                      <div className="relative h-48">
                        <Image
                          src={`/placeholder.svg?height=300&width=400&text=History ${item}`}
                          alt={`History ${item}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader className="p-4">
                        <CardTitle className="line-clamp-1 text-white">Historical Event {item}</CardTitle>
                        <CardDescription className="text-zinc-400">{stateName}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-zinc-400 line-clamp-2">
                          A description of this historical event and its impact on {stateName}'s culture.
                        </p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-zinc-700 text-white hover:bg-zinc-800 hover:border-amber-500/50"
                        >
                          Learn More
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                <div className="flex justify-center mt-8">
                  <Button className="bg-amber-500 text-black hover:bg-amber-600">Load More</Button>
                </div>
              </TabsContent>
              {/* Similar content for other tabs */}
              <TabsContent value="art" className="space-y-4">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <Card
                      key={item}
                      className="overflow-hidden bg-zinc-900 border-zinc-800 hover:border-amber-500/50 transition-all duration-300"
                    >
                      <div className="relative h-48">
                        <Image
                          src={`/placeholder.svg?height=300&width=400&text=Art ${item}`}
                          alt={`Art ${item}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader className="p-4">
                        <CardTitle className="line-clamp-1 text-white">Art Form {item}</CardTitle>
                        <CardDescription className="text-zinc-400">{stateName}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-zinc-400 line-clamp-2">
                          A description of this traditional art form and its significance in {stateName}'s cultural
                          heritage.
                        </p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-zinc-700 text-white hover:bg-zinc-800 hover:border-amber-500/50"
                        >
                          Learn More
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                <div className="flex justify-center mt-8">
                  <Button className="bg-amber-500 text-black hover:bg-amber-600">Load More</Button>
                </div>
              </TabsContent>
              <TabsContent value="music" className="space-y-4">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <Card
                      key={item}
                      className="overflow-hidden bg-zinc-900 border-zinc-800 hover:border-amber-500/50 transition-all duration-300"
                    >
                      <div className="relative h-48">
                        <Image
                          src={`/placeholder.svg?height=300&width=400&text=Music ${item}`}
                          alt={`Music ${item}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader className="p-4">
                        <CardTitle className="line-clamp-1 text-white">Musical Tradition {item}</CardTitle>
                        <CardDescription className="text-zinc-400">{stateName}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-zinc-400 line-clamp-2">
                          A description of this musical tradition and its role in {stateName}'s cultural expression.
                        </p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-zinc-700 text-white hover:bg-zinc-800 hover:border-amber-500/50"
                        >
                          Learn More
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                <div className="flex justify-center mt-8">
                  <Button className="bg-amber-500 text-black hover:bg-amber-600">Load More</Button>
                </div>
              </TabsContent>
              <TabsContent value="dance" className="space-y-4">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <Card
                      key={item}
                      className="overflow-hidden bg-zinc-900 border-zinc-800 hover:border-amber-500/50 transition-all duration-300"
                    >
                      <div className="relative h-48">
                        <Image
                          src={`/placeholder.svg?height=300&width=400&text=Dance ${item}`}
                          alt={`Dance ${item}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader className="p-4">
                        <CardTitle className="line-clamp-1 text-white">Dance Form {item}</CardTitle>
                        <CardDescription className="text-zinc-400">{stateName}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-zinc-400 line-clamp-2">
                          A description of this dance form and its cultural significance in {stateName}.
                        </p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-zinc-700 text-white hover:bg-zinc-800 hover:border-amber-500/50"
                        >
                          Learn More
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                <div className="flex justify-center mt-8">
                  <Button className="bg-amber-500 text-black hover:bg-amber-600">Load More</Button>
                </div>
              </TabsContent>
              <TabsContent value="festivals" className="space-y-4">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <Card
                      key={item}
                      className="overflow-hidden bg-zinc-900 border-zinc-800 hover:border-amber-500/50 transition-all duration-300"
                    >
                      <div className="relative h-48">
                        <Image
                          src={`/placeholder.svg?height=300&width=400&text=Festival ${item}`}
                          alt={`Festival ${item}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader className="p-4">
                        <CardTitle className="line-clamp-1 text-white">Festival {item}</CardTitle>
                        <CardDescription className="text-zinc-400">{stateName}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-zinc-400 line-clamp-2">
                          A description of this festival and its importance in {stateName}'s cultural calendar.
                        </p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-zinc-700 text-white hover:bg-zinc-800 hover:border-amber-500/50"
                        >
                          Learn More
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                <div className="flex justify-center mt-8">
                  <Button className="bg-amber-500 text-black hover:bg-amber-600">Load More</Button>
                </div>
              </TabsContent>
            </Tabs>
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
        </div>
      </footer>
    </div>
  )
}
