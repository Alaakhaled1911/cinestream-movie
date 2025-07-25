"use client"

import { MovieGrid } from "./movie-grid"

interface Movie {
  id: string
  title: string
  poster: string
  year: number
  rating: number
  newRelease?: boolean
}

interface SearchResultsProps {
  movies: Movie[]
  searchQuery: string
  selectedGenre: string
}

export function SearchResults({ movies, searchQuery, selectedGenre }: SearchResultsProps) {
  const title = `Search Results for "${searchQuery}"${
    selectedGenre !== "All" ? ` in ${selectedGenre}` : ""
  } (${movies.length} results)`

  if (movies.length === 0) {
    return (
      <section>
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No movies found matching "{searchQuery}"{selectedGenre !== "All" && ` in ${selectedGenre} category`}.
          </p>
        </div>
      </section>
    )
  }

  return <MovieGrid movies={movies} title={title} />
}
