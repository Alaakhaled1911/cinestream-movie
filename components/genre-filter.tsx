"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Filter, X, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface AdvancedGenreFilterProps {
  genres: string[]
  selectedGenre: string
  onGenreChange: (genre: string) => void
  movieCounts?: Record<string, number>
  className?: string
  showCounts?: boolean
  showClearButton?: boolean
}

export const AdvancedGenreFilter = ({ 
  genres, 
  selectedGenre, 
  onGenreChange,
  movieCounts = {},
  className = "",
  showCounts = false,
  showClearButton = true
}: AdvancedGenreFilterProps) => {
  const [showAll, setShowAll] = useState(false)
  const visibleGenres = showAll ? genres : genres.slice(0, 8)
  const hasMoreGenres = genres.length > 8

  const clearFilter = () => {
    onGenreChange("All")
  }

  return (
    <section className={`container mx-auto px-4 py-8 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold">Filter by Genre</h3>
          {selectedGenre !== "All" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {selectedGenre}
              {showClearButton && (
                <button
                  onClick={clearFilter}
                  className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </Badge>
          )}
        </div>

        {hasMoreGenres && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                More Genres
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {genres.slice(8).map((genre) => (
                <DropdownMenuItem
                  key={genre}
                  onClick={() => onGenreChange(genre)}
                  className="flex items-center justify-between"
                >
                  <span>{genre}</span>
                  {showCounts && movieCounts[genre] && (
                    <Badge variant="secondary" className="text-xs">
                      {movieCounts[genre]}
                    </Badge>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {visibleGenres.map((genre) => (
          <Button
            key={genre}
            variant={selectedGenre === genre ? "default" : "outline"}
            onClick={() => onGenreChange(genre)}
            className="whitespace-nowrap flex-shrink-0 gap-2"
            size="sm"
          >
            {genre}
            {showCounts && movieCounts[genre] && (
              <Badge 
                variant={selectedGenre === genre ? "secondary" : "outline"} 
                className="text-xs"
              >
                {movieCounts[genre]}
              </Badge>
            )}
          </Button>
        ))}
      </div>
    </section>
  )
}