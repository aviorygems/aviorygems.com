import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-20 bg-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
              Ready to Start Your Collection?
            </h2>
            <p className="text-primary-foreground/80">Join thousands of gem enthusiasts and start bidding today.</p>
          </div>
          <Link href="/register">
            <Button
              size="lg"
              variant="outline"
              className="bg-background text-foreground hover:bg-muted border-0 px-8 py-6 text-base whitespace-nowrap"
            >
              Create Account
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
