"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Search, Menu, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible)
  }

  return (
    <header className={`sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b transition-all ${
      isScrolled ? "shadow-sm" : ""
    }`}>
      <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
        {/* Left side - Logo and Desktop Nav */}
        <motion.div
          className="flex items-center gap-4 sm:gap-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>

          <Link href="/">
            <h1 className="text-xl sm:text-2xl font-bold text-primary cursor-pointer">
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
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </motion.div>
        
        {/* Right side - Search and Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile search button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleSearch}
          >
            <Search className="w-4 h-4" />
          </Button>

          {/* Search input - hidden on mobile unless activated */}
          <div className={`${isSearchVisible ? "block" : "hidden"} md:block absolute top-16 left-0 right-0 px-4 md:px-0 md:relative md:top-0`}>
            <SearchInput 
              value={searchQuery}
              onChange={onSearchChange}
            />
          </div>
          
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div 
          className="md:hidden bg-background border-t"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <nav className="flex flex-col px-4 py-2">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`py-3 px-2 text-sm font-medium transition-colors border-b ${
                  item.isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
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
        className="pl-10 w-full md:w-64"
      />
    </div>
  )
}