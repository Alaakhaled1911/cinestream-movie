"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Star, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"
import { movies, genres } from "@/lib/movies"

export default function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("All")

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedGenre === "All" || movie.genre === selectedGenre),
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link href="/">
              <h1 className="text-2xl font-bold text-primary cursor-pointer">🎬 CineStream</h1>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/movies" className="text-sm font-medium text-primary">
                Movies
              </Link>
              <Link href="/series" className="text-sm font-medium hover:text-primary transition-colors">
                TV Shows
              </Link>
              <Link href="/favorites" className="text-sm font-medium hover:text-primary transition-colors">
                My List
              </Link>
            </nav>
          </motion.div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">All Movies</h1>

        {/* Genre Filter */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
          {genres.map((genre) => (
            <Button
              key={genre}
              variant={selectedGenre === genre ? "default" : "outline"}
              onClick={() => setSelectedGenre(genre)}
              className="whitespace-nowrap"
            >
              {genre}
            </Button>
          ))}
        </div>

        {/* Movies Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredMovies.map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group cursor-pointer"
            >
              <Link href={`/movie/${movie.id}`}>
                <Card className="overflow-hidden border-0 bg-transparent">
                  <CardContent className="p-0">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                      <Image
                        src={movie.poster || "/placeholder.svg"}
                        alt={movie.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="icon" className="rounded-full">
                          <Play className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-2">
                      <h3 className="font-semibold truncate">{movie.title}</h3>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{movie.year}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{movie.rating}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {filteredMovies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No movies found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
