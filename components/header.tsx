"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Diamond } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Diamond className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold text-foreground">Ceylon Sapphires</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/auctions" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Auctions
            </Link>
            <Link
              href="/how-it-works"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </Link>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
          </nav>

          {/* Desktop Actions - Added Sign In and Get Started buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="text-sm text-muted-foreground hover:text-foreground">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm px-4">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <nav className="flex flex-col px-4 py-4 gap-2">
            <Link href="/auctions" className="text-sm text-foreground py-2" onClick={() => setIsMenuOpen(false)}>
              Auctions
            </Link>
            <Link href="/how-it-works" className="text-sm text-foreground py-2" onClick={() => setIsMenuOpen(false)}>
              How It Works
            </Link>
            <Link href="/about" className="text-sm text-foreground py-2" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            <div className="flex gap-3 pt-4 border-t border-border mt-2">
              <Link href="/login" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent text-sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/register" className="flex-1">
                <Button className="w-full bg-primary text-primary-foreground text-sm">Get Started</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
