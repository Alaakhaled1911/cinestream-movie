"use client"

import React from "react"
import { motion } from "framer-motion"
import { Play, Star, TrendingUp, Clock, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

interface Movie {
  id: string
  title: string
  description: string
  backdrop: string
  genre: string
  trending?: boolean
  rating: number
  year: number
  duration: string
}

interface FeaturedMovieHeroProps {
  featuredMovie: Movie
  featuredMovies: Movie[]
  currentFeaturedIndex: number
  onIndicatorClick: (index: number) => void
}

const MovieInfo = ({ movie }: { movie: Movie }) => (
  <motion.div
    className="max-w-2xl"
    key={movie.id}
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <MovieBadges movie={movie} />
    <MovieTitle title={movie.title} />
    <MovieDescription description={movie.description} />
    <MovieMetadata movie={movie} />
    <WatchButton movieId={movie.id} />
  </motion.div>
)

const MovieBadges = ({ movie }: { movie: Movie }) => (
  <div className="flex items-center gap-3 mb-4">
    <Badge variant="secondary" className="text-sm">
      {movie.genre}
    </Badge>
    {movie.trending && (
      <Badge className="bg-red-600 hover:bg-red-700 text-sm">
        <TrendingUp className="w-3 h-3 mr-1" />
        Trending Now
      </Badge>
    )}
  </div>
)

const MovieTitle = ({ title }: { title: string }) => (
  <h2 className="text-6xl font-bold mb-6 leading-tight">{title}</h2>
)

const MovieDescription = ({ description }: { description: string }) => (
  <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">
    {description}
  </p>
)

const MovieMetadata = ({ movie }: { movie: Movie }) => (
  <div className="flex items-center gap-6 mb-8">
    <div className="flex items-center gap-2">
      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      <span className="font-semibold text-lg">{movie.rating}</span>
    </div>
    <div className="flex items-center gap-2 text-muted-foreground">
      <Calendar className="w-4 h-4" />
      <span>{movie.year}</span>
    </div>
    <div className="flex items-center gap-2 text-muted-foreground">
      <Clock className="w-4 h-4" />
      <span>{movie.duration}</span>
    </div>
  </div>
)

const WatchButton = ({ movieId }: { movieId: string }) => (
  <Button asChild size="lg" className="gap-2 text-lg px-8 py-3">
    <Link href={`/movie/${movieId}`}>
      <Play className="w-6 h-6" />
      Watch Now
    </Link>
  </Button>
)

const BackgroundImage = ({ movie }: { movie: Movie }) => (
  <div className="absolute inset-0">
    <Image
      src={movie.backdrop || "/placeholder.svg"}
      alt={movie.title}
      fill
      className="object-cover"
      priority
    />
    <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent" />
    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
  </div>
)

const MovieIndicators = ({ 
  featuredMovies, 
  currentFeaturedIndex, 
  onIndicatorClick 
}: {
  featuredMovies: Movie[]
  currentFeaturedIndex: number
  onIndicatorClick: (index: number) => void
}) => (
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
    {featuredMovies.map((_, index) => (
      <button
        key={index}
        className={`w-3 h-3 rounded-full transition-all ${
          index === currentFeaturedIndex ? "bg-white" : "bg-white/30"
        }`}
        onClick={() => onIndicatorClick(index)}
        aria-label={`Go to featured movie ${index + 1}`}
      />
    ))}
  </div>
)

export const FeaturedMovieHero = ({
  featuredMovie,
  featuredMovies,
  currentFeaturedIndex,
  onIndicatorClick,
}: FeaturedMovieHeroProps) => {
  return (
    <section className="relative h-[80vh] overflow-hidden">
      <BackgroundImage movie={featuredMovie} />
      
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <MovieInfo movie={featuredMovie} />
      </div>

      <MovieIndicators
        featuredMovies={featuredMovies}
        currentFeaturedIndex={currentFeaturedIndex}
        onIndicatorClick={onIndicatorClick}
      />
    </section>
  )
}