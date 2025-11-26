"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Diamond, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"

export default function NewListingPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    gemType: "",
    weightCarats: "",
    color: "",
    clarity: "",
    origin: "",
    certification: "",
    startingPrice: "",
    reservePrice: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        throw new Error("You must be logged in to create a listing")
      }

      console.log("[v0] Creating gem listing for seller:", user.id)

      const { error: insertError } = await supabase.from("gems").insert({
        seller_id: user.id,
        title: formData.title,
        description: formData.description,
        gem_type: formData.gemType,
        weight_carats: Number.parseFloat(formData.weightCarats),
        color: formData.color,
        clarity: formData.clarity,
        origin: formData.origin,
        certification: formData.certification,
        starting_price: Number.parseFloat(formData.startingPrice),
        reserve_price: formData.reservePrice ? Number.parseFloat(formData.reservePrice) : null,
        status: "pending",
      })

      if (insertError) {
        console.log("[v0] Insert error:", insertError)
        throw insertError
      }

      console.log("[v0] Gem listing created successfully")
      setSuccess(true)

      // Redirect after short delay
      setTimeout(() => {
        router.push("/dashboard/seller")
        router.refresh()
      }, 2000)
    } catch (err) {
      console.log("[v0] Error creating listing:", err)
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="border-b border-border py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <Diamond className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-foreground">Ceylon Sapphires</span>
            </Link>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center p-6">
          <Card className="w-full max-w-md text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
                <Diamond className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle>Listing Submitted!</CardTitle>
              <CardDescription>
                Your gemstone listing has been submitted for review. Our admin team will review and approve it shortly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/dashboard/seller">Back to Dashboard</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 w-fit">
            <Diamond className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold text-foreground">Ceylon Sapphires</span>
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/dashboard/seller">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Create New Listing</CardTitle>
            <CardDescription>
              Fill in the details about your gemstone. All listings require admin approval before going live.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Listing Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Natural Blue Sapphire - 3.5ct"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your gemstone in detail..."
                  className="min-h-[120px]"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gemType">Gem Type</Label>
                  <Select
                    required
                    value={formData.gemType}
                    onValueChange={(value) => setFormData({ ...formData, gemType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gem type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blue-sapphire">Blue Sapphire</SelectItem>
                      <SelectItem value="pink-sapphire">Pink Sapphire</SelectItem>
                      <SelectItem value="yellow-sapphire">Yellow Sapphire</SelectItem>
                      <SelectItem value="padparadscha">Padparadscha</SelectItem>
                      <SelectItem value="ruby">Ruby</SelectItem>
                      <SelectItem value="emerald">Emerald</SelectItem>
                      <SelectItem value="alexandrite">Alexandrite</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weightCarats">Weight (Carats)</Label>
                  <Input
                    id="weightCarats"
                    type="number"
                    step="0.01"
                    placeholder="e.g., 3.50"
                    required
                    value={formData.weightCarats}
                    onChange={(e) => setFormData({ ...formData, weightCarats: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    placeholder="e.g., Vivid Royal Blue"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clarity">Clarity</Label>
                  <Select
                    value={formData.clarity}
                    onValueChange={(value) => setFormData({ ...formData, clarity: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select clarity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eye-clean">Eye Clean</SelectItem>
                      <SelectItem value="very-slightly-included">Very Slightly Included</SelectItem>
                      <SelectItem value="slightly-included">Slightly Included</SelectItem>
                      <SelectItem value="included">Included</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="origin">Origin</Label>
                  <Select
                    value={formData.origin}
                    onValueChange={(value) => setFormData({ ...formData, origin: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select origin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sri-lanka">Sri Lanka (Ceylon)</SelectItem>
                      <SelectItem value="myanmar">Myanmar (Burma)</SelectItem>
                      <SelectItem value="kashmir">Kashmir</SelectItem>
                      <SelectItem value="madagascar">Madagascar</SelectItem>
                      <SelectItem value="thailand">Thailand</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certification">Certification</Label>
                  <Select
                    value={formData.certification}
                    onValueChange={(value) => setFormData({ ...formData, certification: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select certification" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gia">GIA</SelectItem>
                      <SelectItem value="igi">IGI</SelectItem>
                      <SelectItem value="agl">AGL</SelectItem>
                      <SelectItem value="gubelin">Gubelin</SelectItem>
                      <SelectItem value="ssef">SSEF</SelectItem>
                      <SelectItem value="none">No Certification</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startingPrice">Starting Price (USD)</Label>
                  <Input
                    id="startingPrice"
                    type="number"
                    step="0.01"
                    placeholder="e.g., 5000"
                    required
                    value={formData.startingPrice}
                    onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reservePrice">Reserve Price (USD) - Optional</Label>
                  <Input
                    id="reservePrice"
                    type="number"
                    step="0.01"
                    placeholder="e.g., 8000"
                    value={formData.reservePrice}
                    onChange={(e) => setFormData({ ...formData, reservePrice: e.target.value })}
                  />
                </div>
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <div className="flex gap-4">
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading ? "Submitting..." : "Submit for Approval"}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/dashboard/seller">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
