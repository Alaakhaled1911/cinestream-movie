"use client"

import { TrendingUp, Clock, Star } from "lucide-react"
import { MovieRow } from "./movie-row"
import { MovieGrid } from "./movie-grid"

interface Movie {
  id: string
  title: string
  poster: string
  year: number
  rating: number
  newRelease?: boolean
}

interface MovieSectionsProps {
  filteredMovies: Movie[]
  trendingMovies: Movie[]
  newReleases: Movie[]
  popularMovies: Movie[]
  selectedGenre: string
}

export function MovieSections({
  filteredMovies,
  trendingMovies,
  newReleases,
  popularMovies,
  selectedGenre,
}: MovieSectionsProps) {
  const genreSuffix = selectedGenre !== "All" ? ` - ${selectedGenre}` : ""

  return (
    <>
      <MovieGrid movies={filteredMovies} title="All Movies" />

      <MovieRow
        title={`Trending Movies${genreSuffix}`}
        movies={trendingMovies}
        icon={<TrendingUp className="w-6 h-6 text-red-500" />}
      />

      <MovieRow
        title={`New Releases${genreSuffix}`}
        movies={newReleases}
        icon={<Clock className="w-6 h-6 text-green-500" />}
      />

      <MovieRow
        title={`Popular Movies${genreSuffix}`}
        movies={popularMovies}
        icon={<Star className="w-6 h-6 text-yellow-500" />}
      />
    </>
  )
}
