import { Shield, Award, Truck, Clock } from "lucide-react"

const badges = [
  {
    icon: Shield,
    title: "Certified Authentic",
    description: "Every gem verified by GIA experts",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Hand-selected from Sri Lanka",
  },
  {
    icon: Truck,
    title: "Insured Shipping",
    description: "Free worldwide delivery",
  },
  {
    icon: Clock,
    title: "Live Auctions",
    description: "Real-time bidding experience",
  },
]

export function TrustBadges() {
  return (
    <section className="py-12 border-y border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {badges.map((badge) => (
            <div key={badge.title} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                <badge.icon className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">{badge.title}</p>
                <p className="text-xs text-muted-foreground">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
