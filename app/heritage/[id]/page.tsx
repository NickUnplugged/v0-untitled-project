import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Globe, Calendar, MapPin, Info, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getHeritageDetails } from "@/app/actions"
import { notFound } from "next/navigation"
import BookmarkButton from "@/components/bookmark-button"
import ShareButton from "@/components/share-button"

interface HeritageDetailProps {
  params: {
    id: string
  }
}

export default async function HeritageDetail({ params }: HeritageDetailProps) {
  const { item, error } = await getHeritageDetails(params.id)

  if (error || !item) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span className="font-medium">Back to Home</span>
          </Link>
          <div className="flex items-center gap-4">
            <BookmarkButton id={item.id} />
            <ShareButton item={item} />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="relative h-[50vh]">
          <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full p-6">
            <div className="container">
              <Badge className="mb-2 bg-amber-500 text-black hover:bg-amber-600">{item.category}</Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white drop-shadow-sm">
                {item.title}
              </h1>
              <div className="flex flex-wrap gap-4 mt-2 text-zinc-300">
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4 text-amber-500" />
                  <span>
                    {item.state}, {item.region}
                  </span>
                </div>
                {item.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-amber-500" />
                    <span>{item.location}</span>
                  </div>
                )}
                {item.period && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-amber-500" />
                    <span>{item.period}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <section className="w-full py-12 bg-zinc-950">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start mb-8 overflow-x-auto bg-zinc-900 p-1">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-zinc-800 data-[state=active]:text-amber-500"
                >
                  Overview
                </TabsTrigger>
                {item.gallery && item.gallery.length > 0 && (
                  <TabsTrigger
                    value="gallery"
                    className="data-[state=active]:bg-zinc-800 data-[state=active]:text-amber-500"
                  >
                    Gallery
                  </TabsTrigger>
                )}
                <TabsTrigger
                  value="history"
                  className="data-[state=active]:bg-zinc-800 data-[state=active]:text-amber-500"
                >
                  History
                </TabsTrigger>
                {item.significance && (
                  <TabsTrigger
                    value="significance"
                    className="data-[state=active]:bg-zinc-800 data-[state=active]:text-amber-500"
                  >
                    Cultural Significance
                  </TabsTrigger>
                )}
                {item.relatedItems && item.relatedItems.length > 0 && (
                  <TabsTrigger
                    value="related"
                    className="data-[state=active]:bg-zinc-800 data-[state=active]:text-amber-500"
                  >
                    Related Items
                  </TabsTrigger>
                )}
              </TabsList>
              <TabsContent value="overview" className="space-y-6">
                <div className="prose prose-invert max-w-none">
                  <p className="text-xl leading-relaxed text-zinc-300">{item.description}</p>
                  {item.longDescription && (
                    <div
                      className="leading-relaxed text-zinc-400"
                      dangerouslySetInnerHTML={{ __html: item.longDescription }}
                    />
                  )}
                </div>
                <div className="flex flex-col gap-4 md:flex-row md:gap-8">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-2">
                      <Info className="h-5 w-5 text-amber-500" />
                      <h3 className="text-lg font-medium text-white">Quick Facts</h3>
                    </div>
                    <ul className="space-y-2 text-sm">
                      {item.location && (
                        <li className="flex justify-between border-b border-zinc-800 pb-2">
                          <span className="font-medium text-zinc-300">Location:</span>
                          <span className="text-zinc-400">{item.location}</span>
                        </li>
                      )}
                      {item.period && (
                        <li className="flex justify-between border-b border-zinc-800 pb-2">
                          <span className="font-medium text-zinc-300">Period:</span>
                          <span className="text-zinc-400">{item.period}</span>
                        </li>
                      )}
                      <li className="flex justify-between border-b border-zinc-800 pb-2">
                        <span className="font-medium text-zinc-300">Category:</span>
                        <span className="text-zinc-400">{item.category}</span>
                      </li>
                      <li className="flex justify-between border-b border-zinc-800 pb-2">
                        <span className="font-medium text-zinc-300">Region:</span>
                        <span className="text-zinc-400">{item.region}</span>
                      </li>
                      <li className="flex justify-between pb-2">
                        <span className="font-medium text-zinc-300">State:</span>
                        <span className="text-zinc-400">{item.state}</span>
                      </li>
                    </ul>

                    {item.source && (
                      <div className="pt-4 border-t border-zinc-800">
                        <p className="text-sm text-zinc-500">
                          Source:{" "}
                          <a
                            href={item.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-500 hover:underline inline-flex items-center gap-1"
                          >
                            {item.source === "wikipedia"
                              ? "Wikipedia"
                              : item.source === "incredibleindia"
                                ? "Incredible India"
                                : item.source === "ministryofculture"
                                  ? "Ministry of Culture"
                                  : "Local"}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="aspect-video overflow-hidden rounded-lg border border-zinc-800">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(
                          item.location || item.title + ", " + item.state + ", India",
                        )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                        frameBorder="0"
                        scrolling="no"
                        marginHeight={0}
                        marginWidth={0}
                        title={`Map of ${item.title}`}
                      ></iframe>
                    </div>
                  </div>
                </div>
              </TabsContent>
              {item.gallery && item.gallery.length > 0 && (
                <TabsContent value="gallery" className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {item.gallery.map((image, index) => (
                      <div
                        key={index}
                        className="overflow-hidden rounded-lg border border-zinc-800 hover:border-amber-500/50 transition-all duration-300"
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Gallery image ${index + 1} of ${item.title}`}
                          width={400}
                          height={300}
                          className="h-full w-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>
              )}
              <TabsContent value="history" className="space-y-6">
                <div className="prose prose-invert max-w-none">
                  <h3 className="text-xl font-bold text-white">Historical Context</h3>
                  {item.longDescription ? (
                    <div className="text-zinc-300" dangerouslySetInnerHTML={{ __html: item.longDescription }} />
                  ) : (
                    <p className="text-zinc-300">{item.description}</p>
                  )}
                  {item.period && (
                    <p className="text-zinc-300">
                      This {item.category.toLowerCase()} dates back to the period of {item.period}.
                    </p>
                  )}
                </div>
              </TabsContent>
              {item.significance && (
                <TabsContent value="significance" className="space-y-6">
                  <div className="prose prose-invert max-w-none">
                    <h3 className="text-xl font-bold text-white">Cultural Significance</h3>
                    <p className="text-zinc-300">{item.significance}</p>
                  </div>
                </TabsContent>
              )}
              {item.relatedItems && item.relatedItems.length > 0 && (
                <TabsContent value="related" className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {item.relatedItems.map((relatedItem) => (
                      <Link href={`/heritage/${relatedItem.id}`} key={relatedItem.id}>
                        <div className="group overflow-hidden rounded-lg border border-zinc-800 hover:border-amber-500/50 transition-all duration-300 bg-zinc-900">
                          <div className="relative h-48">
                            <Image
                              src={relatedItem.image || "/placeholder.svg"}
                              alt={relatedItem.title}
                              fill
                              className="object-cover"
                            />
                            <Badge className="absolute top-2 right-2 bg-amber-500 text-black hover:bg-amber-600">
                              {relatedItem.category}
                            </Badge>
                          </div>
                          <div className="p-4">
                            <h3 className="font-medium text-white group-hover:text-amber-500">{relatedItem.title}</h3>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </TabsContent>
              )}
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
          <div className="flex items-center gap-4">
            <p className="text-xs text-zinc-500">Data sourced from Wikipedia and official Indian tourism websites</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
