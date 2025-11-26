import Image from "next/image"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Victoria Chen",
    role: "Private Collector",
    image: "/elegant-woman-portrait-professional-headshot.jpg",
    quote:
      "The padparadscha I acquired exceeded all expectations. The authentication process gave me complete confidence in my investment.",
    rating: 5,
  },
  {
    name: "James Rothschild",
    role: "Jewelry Designer",
    image: "/sophisticated-man-portrait-professional-headshot.jpg",
    quote:
      "Ceylon Sapphires has become my exclusive source for exceptional gems. The quality and provenance are unmatched.",
    rating: 5,
  },
  {
    name: "Sophia Laurent",
    role: "Gem Enthusiast",
    image: "/elegant-woman-jewelry-portrait-headshot.jpg",
    quote:
      "From my first free purchase to becoming a regular bidder, the experience has been nothing short of extraordinary.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm text-secondary uppercase tracking-widest mb-3">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground text-balance">
            Trusted by Collectors Worldwide
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow"
            >
              <Quote className="w-10 h-10 text-secondary/30 mb-6" />

              <p className="text-card-foreground leading-relaxed mb-6 italic">"{testimonial.quote}"</p>

              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
              </div>

              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-card-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
