"use client"

import { useMemo } from "react"

interface Movie {
  id: string
  title: string
  description: string
  genre: string
  trending?: boolean
  popular?: boolean
  newRelease?: boolean
}

export function useMovieFilter(movies: Movie[], searchQuery: string, selectedGenre: string) {
  return useMemo(() => {
    const filteredMovies = movies.filter((movie) => {
      const matchesSearch =
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesGenre = selectedGenre === "All" || movie.genre === selectedGenre

      return matchesSearch && matchesGenre
    })

    const trendingMovies = filteredMovies.filter((m) => m.trending)
    const popularMovies = filteredMovies.filter((m) => m.popular)
    const newReleases = filteredMovies.filter((m) => m.newRelease)

    return {
      filteredMovies,
      trendingMovies,
      popularMovies,
      newReleases,
    }
  }, [movies, searchQuery, selectedGenre])
}
