"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link href="/">
              <h1 className="text-2xl font-bold text-primary cursor-pointer">🎬 CineStream</h1>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/movies" className="text-sm font-medium hover:text-primary transition-colors">
                Movies
              </Link>
              <Link href="/series" className="text-sm font-medium hover:text-primary transition-colors">
                TV Shows
              </Link>
              <Link href="/favorites" className="text-sm font-medium text-primary">
                My List
              </Link>
            </nav>
          </motion.div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Search favorites..." className="pl-10 w-64" />
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My List</h1>
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">Your favorite movies will appear here!</p>
        </div>
      </div>
    </div>
  )
}
