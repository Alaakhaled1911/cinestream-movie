"use client"

import { motion } from "framer-motion"
import { Play, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

interface Movie {
  id: string
  title: string
  poster: string
  year: number
  rating: number
  newRelease?: boolean
}

interface MovieCardProps {
  movie: Movie
  index?: number
  delay?: number
}

export function MovieCard({ movie, index = 0, delay = 0.05 }: MovieCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * delay }}
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
              {movie.newRelease && <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-700">New</Badge>}
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
  )
}
