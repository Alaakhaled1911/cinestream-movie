"use client"

import { motion } from "framer-motion"
import { MovieCard } from "./movie-card"

interface Movie {
  id: string
  title: string
  poster: string
  year: number
  rating: number
  newRelease?: boolean
}

interface MovieGridProps {
  movies: Movie[]
  title?: string
  className?: string
}

export function MovieGrid({
  movies,
  title,
  className = "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
}: MovieGridProps) {
  return (
    <section className="mb-12">
      {title && (
        <h2 className="text-2xl font-bold mb-6">
          {title} ({movies.length})
        </h2>
      )}
      <motion.div
        className={`grid ${className} gap-6`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {movies.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} index={index} />
        ))}
      </motion.div>
    </section>
  )
}
