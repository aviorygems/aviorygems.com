import { Diamond, Award, Clock, Gift } from "lucide-react"

const features = [
  {
    icon: Diamond,
    title: "Certified Authenticity",
    description: "Every gemstone comes with certification and verification of authenticity from Sri Lanka.",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Hand-selected gems meeting the highest standards of color, clarity, and cut.",
  },
  {
    icon: Clock,
    title: "Real-Time Bidding",
    description: "Live auction updates and instant notifications to never miss a winning bid.",
  },
  {
    icon: Gift,
    title: "3 Free Purchases",
    description: "New buyers get their first 3 successful purchases completely free of platform fees.",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose Ceylon Sapphires?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            The trusted marketplace for authentic Sri Lankan gemstones
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-base font-semibold text-card-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
