import Link from "next/link"
import { Diamond } from "lucide-react"

const footerLinks = {
  auctions: [
    { name: "Live Auctions", href: "/auctions" },
    { name: "Upcoming", href: "/upcoming" },
    { name: "Past Results", href: "/results" },
  ],
  sellers: [
    { name: "Sell With Us", href: "/register/seller" },
    { name: "Seller Guide", href: "/seller-guide" },
    { name: "Verification", href: "/verification" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "FAQs", href: "/faqs" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Diamond className="h-6 w-6 text-primary" />
              <span className="text-base font-semibold">Ceylon Sapphires</span>
            </Link>
            <p className="text-background/60 text-sm leading-relaxed">
              Premium Sri Lankan gemstones, certified and delivered worldwide.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Auctions</h3>
            <ul className="space-y-2">
              {footerLinks.auctions.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-background/60 hover:text-background transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Sellers</h3>
            <ul className="space-y-2">
              {footerLinks.sellers.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-background/60 hover:text-background transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-background/60 hover:text-background transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-background/60 hover:text-background transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/10 mt-10 pt-6 text-center">
          <p className="text-sm text-background/50">© 2025 Ceylon Sapphires. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
