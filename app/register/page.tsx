"use client"

import Link from "next/link"
import { Diamond, ShoppingBag, Store, ArrowRight } from "lucide-react"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 w-fit">
            <Diamond className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold text-foreground">Ceylon Sapphires</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Join Ceylon Sapphires</h1>
            <p className="text-muted-foreground text-lg">Choose how you want to participate in our marketplace</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Buyer Card */}
            <Link href="/register/buyer" className="group">
              <div className="bg-card border border-border rounded-xl p-8 hover:shadow-lg hover:border-primary/50 transition-all h-full">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <ShoppingBag className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-card-foreground mb-3">Register as Buyer</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Browse and bid on authentic Sri Lankan gemstones. Get your first 3 purchases free of platform fees.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Access live auctions
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Certified gemstones
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Secure worldwide shipping
                  </li>
                </ul>
                <div className="flex items-center text-primary font-medium group-hover:gap-3 gap-2 transition-all">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* Seller Card */}
            <Link href="/register/seller" className="group">
              <div className="bg-card border border-border rounded-xl p-8 hover:shadow-lg hover:border-primary/50 transition-all h-full">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Store className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-card-foreground mb-3">Register as Seller</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  List your gemstones and reach thousands of collectors worldwide. Professional verification included.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Global buyer network
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Expert gem verification
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Secure payment processing
                  </li>
                </ul>
                <div className="flex items-center text-primary font-medium group-hover:gap-3 gap-2 transition-all">
                  Start Selling
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
