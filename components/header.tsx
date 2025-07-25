"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

interface HeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

const navigationItems = [
  { href: "/", label: "Home", isActive: true },
  { href: "/movies", label: "Movies", isActive: false },
  { href: "/series", label: "TV Shows", isActive: false },
  { href: "/favorites", label: "My List", isActive: false },
]

export function Header({ searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div
          className="flex items-center gap-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link href="/">
            <h1 className="text-2xl font-bold text-primary cursor-pointer">
              🎬 CineStream
            </h1>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  item.isActive
                    ? "text-primary"
                    : "hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </motion.div>
        
        <div className="flex items-center gap-4">
          <SearchInput 
            value={searchQuery}
            onChange={onSearchChange}
          />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

interface SearchInputProps {
  value: string
  onChange: (query: string) => void
}

function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
      <Input
        placeholder="Search movies..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 w-64"
      />
    </div>
  )
}