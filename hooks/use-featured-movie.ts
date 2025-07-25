"use client"

import { useState, useEffect } from "react"

interface Movie {
  id: string
  featured?: boolean
  trending?: boolean
}

export function useFeaturedMovie(movies: Movie[]) {
  const featuredMovies = movies.filter((m) => m.featured || m.trending).slice(0, 3)
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0)
  const [featuredMovie, setFeaturedMovie] = useState(movies.find((m) => m.featured) || movies[0])

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentFeaturedIndex + 1) % featuredMovies.length
      setCurrentFeaturedIndex(nextIndex)
      setFeaturedMovie(featuredMovies[nextIndex])
    }, 8000)

    return () => clearInterval(interval)
  }, [currentFeaturedIndex, featuredMovies])

  const handleIndicatorClick = (index: number) => {
    setCurrentFeaturedIndex(index)
    setFeaturedMovie(featuredMovies[index])
  }

  return {
    featuredMovie,
    featuredMovies,
    currentFeaturedIndex,
    handleIndicatorClick,
  }
}
