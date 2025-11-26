import { Search, Gavel, Gem, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discover",
    description: "Browse our curated collection of certified Ceylon sapphires and rare gemstones from trusted sellers.",
  },
  {
    number: "02",
    icon: Gavel,
    title: "Bid",
    description:
      "Place competitive bids in real-time. Watch as the auction unfolds with live updates and notifications.",
  },
  {
    number: "03",
    icon: Gem,
    title: "Win",
    description:
      "Secure your precious gem with insured worldwide shipping. Your first 3 purchases are completely free!",
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-sm text-secondary uppercase tracking-widest mb-3">Simple Process</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-balance">How It Works</h2>
          <p className="mt-4 text-primary-foreground/70 leading-relaxed">
            Experience the elegance of gem collecting with our streamlined auction platform.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-primary-foreground/20" />
              )}

              <div className="relative z-10 bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-8 hover:bg-primary-foreground/10 transition-colors">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-secondary/20 flex items-center justify-center">
                    <step.icon className="w-7 h-7 text-secondary" />
                  </div>
                  <span className="text-4xl font-serif font-bold text-secondary/50">{step.number}</span>
                </div>
                <h3 className="text-2xl font-serif font-semibold mb-3">{step.title}</h3>
                <p className="text-primary-foreground/70 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button
            size="lg"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-6 text-base group"
          >
            Start Bidding Today
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}
