"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MovieCard } from "./movie-card"

interface Movie {
  id: string
  title: string
  poster: string
  year: number
  rating: number
  newRelease?: boolean
}

interface MovieRowProps {
  title: string
  movies: Movie[]
  icon?: React.ReactNode
}

export function MovieRow({ title, movies, icon }: MovieRowProps) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const itemWidth = 200
  const maxScroll = Math.max(0, movies.length * itemWidth - containerWidth)

  const scroll = (direction: "left" | "right") => {
    const scrollAmount = containerWidth * 0.8
    if (direction === "left") {
      setScrollPosition(Math.max(0, scrollPosition - scrollAmount))
    } else {
      setScrollPosition(Math.min(maxScroll, scrollPosition + scrollAmount))
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (movies.length === 0) return null

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {icon}
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        {/* Hide arrows on mobile */}
        {movies.length > 2 && containerWidth > 768 && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              disabled={scrollPosition === 0}
              className="rounded-full"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              disabled={scrollPosition >= maxScroll}
              className="rounded-full"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

     <div
  ref={containerRef}
  className="relative overflow-hidden md:overflow-x-hidden overflow-x-auto"
>

        <motion.div
          className="flex gap-4"
          animate={{ x: -scrollPosition }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ minWidth: "fit-content" }}
        >
          {movies.map((movie, index) => (
            <div key={movie.id} className="flex-shrink-0 w-48">
              <MovieCard movie={movie} index={index} delay={0.1} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
