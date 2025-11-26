"use client"

import type React from "react"

import { useState } from "react"
import { Send, Diamond } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log("Newsletter signup:", email)
    setEmail("")
  }

  return (
    <section className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-8">
          <Diamond className="w-8 h-8 text-secondary" />
        </div>

        <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 text-balance">
          Join Our Exclusive Circle
        </h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
          Be the first to know about rare gemstone arrivals, private auctions, and collector insights.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 h-12 bg-muted border-border"
            required
          />
          <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8">
            Subscribe
            <Send className="ml-2 h-4 w-4" />
          </Button>
        </form>

        <p className="text-xs text-muted-foreground mt-4">Join 5,000+ collectors. Unsubscribe anytime.</p>
      </div>
    </section>
  )
}
