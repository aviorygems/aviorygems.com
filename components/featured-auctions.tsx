"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Clock, ArrowRight, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const auctions = [
  {
    id: 1,
    name: "Padparadscha Sapphire",
    weight: "3.8 Carats",
    color: "Pink-Orange",
    currentBid: 18500,
    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
    bids: 24,
    image: "/padparadscha-pink-orange-sapphire-gemstone-luxury-.jpg",
    hot: true,
  },
  {
    id: 2,
    name: "Cornflower Blue Sapphire",
    weight: "4.2 Carats",
    color: "Vivid Blue",
    currentBid: 32000,
    endTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
    bids: 31,
    image: "/cornflower-blue-ceylon-sapphire-gemstone-luxury-ph.jpg",
    hot: true,
  },
  {
    id: 3,
    name: "Yellow Ceylon Sapphire",
    weight: "6.1 Carats",
    color: "Canary Yellow",
    currentBid: 12800,
    endTime: new Date(Date.now() + 8 * 60 * 60 * 1000),
    bids: 18,
    image: "/yellow-ceylon-sapphire-gemstone-luxury-jewelry-pho.jpg",
    hot: false,
  },
  {
    id: 4,
    name: "Star Sapphire",
    weight: "8.5 Carats",
    color: "Grey-Blue",
    currentBid: 45000,
    endTime: new Date(Date.now() + 12 * 60 * 60 * 1000),
    bids: 42,
    image: "/star-sapphire-cabochon-gemstone-luxury-photography.jpg",
    hot: true,
  },
]

function CountdownTimer({ endTime }: { endTime: Date }) {
  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const diff = endTime.getTime() - now.getTime()

      if (diff <= 0) {
        setTimeLeft("Ended")
        clearInterval(timer)
        return
      }

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeLeft(
        `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
      )
    }, 1000)

    return () => clearInterval(timer)
  }, [endTime])

  return (
    <div className="flex items-center gap-1.5 text-sm">
      <Clock className="w-4 h-4" />
      <span className="font-mono">{timeLeft || "Loading..."}</span>
    </div>
  )
}

export function FeaturedAuctions() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-sm text-secondary uppercase tracking-widest mb-3">Live Auctions</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground text-balance">
              Featured Gemstones
            </h2>
          </div>
          <Button variant="outline" className="w-fit group bg-transparent">
            View All Auctions
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Auction Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {auctions.map((auction) => (
            <div
              key={auction.id}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={auction.image || "/placeholder.svg"}
                  alt={auction.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {auction.hot && (
                  <Badge className="absolute top-3 left-3 bg-destructive/90 text-destructive-foreground border-0">
                    <Flame className="w-3 h-3 mr-1" />
                    Hot
                  </Badge>
                )}
                <div className="absolute bottom-3 left-3 right-3 bg-card/95 backdrop-blur-sm px-3 py-2 rounded-lg">
                  <CountdownTimer endTime={auction.endTime} />
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-serif font-semibold text-card-foreground mb-1">{auction.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {auction.weight} • {auction.color}
                </p>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Current Bid</p>
                    <p className="text-xl font-serif font-bold text-secondary">
                      ${auction.currentBid.toLocaleString()}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">{auction.bids} bids</p>
                </div>

                <Button className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                  Place Bid
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
