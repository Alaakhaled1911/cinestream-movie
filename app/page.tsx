"use client"

import { useState } from "react"
import { movies, genres } from "@/lib/movies"
import { Header } from "@/components/header"
import { FeaturedMovieHero } from "@/components/hero-section"
import { AdvancedGenreFilter } from "@/components/genre-filter"
import { Footer } from "@/components/footer"
import { SearchResults } from "@/components/search-results"
import { MovieSections } from "@/components/movie-sections"
import { useMovieFilter } from "@/hooks/use-movie-filter"
import { useFeaturedMovie } from "@/hooks/use-featured-movie"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("All")

  const { featuredMovie, featuredMovies, currentFeaturedIndex, handleIndicatorClick } = useFeaturedMovie(movies)

  const { filteredMovies, trendingMovies, popularMovies, newReleases } = useMovieFilter(
    movies,
    searchQuery,
    selectedGenre,
  )

  const isSearching = searchQuery.trim() !== ""

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {!isSearching && (
        <FeaturedMovieHero
          featuredMovie={featuredMovie}
          featuredMovies={featuredMovies}
          currentFeaturedIndex={currentFeaturedIndex}
          onIndicatorClick={handleIndicatorClick}
        />
      )}

      <AdvancedGenreFilter genres={genres} selectedGenre={selectedGenre} onGenreChange={setSelectedGenre} />

      <div className="container mx-auto px-4 pb-12">
        {isSearching ? (
          <SearchResults movies={filteredMovies} searchQuery={searchQuery} selectedGenre={selectedGenre} />
        ) : (
          <MovieSections
            filteredMovies={filteredMovies}
            trendingMovies={trendingMovies}
            newReleases={newReleases}
            popularMovies={popularMovies}
            selectedGenre={selectedGenre}
          />
        )}
      </div>

      <Footer />
    </div>
  )
}
