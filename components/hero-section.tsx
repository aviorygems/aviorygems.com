"use client"

import { ArrowRight, CheckCircle2, Diamond } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-blue-50/80 to-background py-20 lg:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-8">
          <Diamond className="w-4 h-4 text-primary" />
          <span className="text-sm text-foreground font-medium">Premium Sri Lankan Gemstones</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-foreground mb-6 text-balance">
          Discover Authentic
          <span className="block text-primary">Ceylon Sapphires</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Bid on rare, certified gemstones directly from Sri Lanka. Join thousands of collectors and enthusiasts in our
          premium auction marketplace.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/auctions">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base group w-full sm:w-auto"
            >
              Browse Auctions
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/register/seller">
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-base border-border hover:bg-muted bg-background w-full sm:w-auto"
            >
              Start Selling
            </Button>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <span>Certified Gems</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <span>Secure Bidding</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <span>3 Free Purchases</span>
          </div>
        </div>
      </div>
    </section>
  )
}
