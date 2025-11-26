import Image from "next/image"
import Link from "next/link"

const gemTypes = [
  {
    name: "Blue Sapphire",
    image: "/blue-sapphire-gemstone.png",
    href: "/auctions?type=blue-sapphire",
  },
  {
    name: "Pink Sapphire",
    image: "/pink-sapphire-gemstone.jpg",
    href: "/auctions?type=pink-sapphire",
  },
  {
    name: "Yellow Sapphire",
    image: "/yellow-sapphire-gemstone.jpg",
    href: "/auctions?type=yellow-sapphire",
  },
  {
    name: "Padparadscha",
    image: "/padparadscha-sapphire-gemstone-orange-pink.jpg",
    href: "/auctions?type=padparadscha",
  },
  {
    name: "Star Sapphire",
    image: "/star-sapphire-cabochon-gemstone.jpg",
    href: "/auctions?type=star-sapphire",
  },
  {
    name: "Ruby",
    image: "/red-ruby-gemstone.jpg",
    href: "/auctions?type=ruby",
  },
]

export function GemTypes() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Explore by Gem Type</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Discover the finest varieties of Ceylon gemstones</p>
        </div>

        {/* Gem Types Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {gemTypes.map((gem) => (
            <Link
              key={gem.name}
              href={gem.href}
              className="group bg-card border border-border rounded-xl p-4 hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="aspect-square relative rounded-lg overflow-hidden mb-3 bg-muted">
                <Image
                  src={gem.image || "/placeholder.svg"}
                  alt={gem.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-sm font-medium text-card-foreground text-center">{gem.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
