"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Diamond, Users, Package, Clock, CheckCircle, XCircle, LogOut, ShoppingBag, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"

interface Seller {
  id: string
  first_name: string
  last_name: string
  business_name: string
  email: string
  phone: string
  location: string
  is_approved: boolean
  created_at: string
}

interface Gem {
  id: string
  title: string
  gem_type: string
  weight_carats: number
  starting_price: number
  status: string
  created_at: string
  seller: {
    id: string
    first_name: string
    last_name: string
    business_name: string
    email: string
  }
}

interface AdminDashboardProps {
  pendingGems: Gem[]
  sellers: Seller[]
  buyers: Seller[]
  stats: {
    totalGems: number
    pendingApproval: number
    activeListings: number
    totalSellers: number
    totalBuyers: number
  }
}

export function AdminDashboard({ pendingGems, sellers, buyers, stats }: AdminDashboardProps) {
  const [selectedGem, setSelectedGem] = useState<Gem | null>(null)
  const [rejectReason, setRejectReason] = useState("")
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleApprove = async (gemId: string) => {
    setIsLoading(true)
    try {
      const { error } = await supabase
        .from("gems")
        .update({ status: "approved", updated_at: new Date().toISOString() })
        .eq("id", gemId)

      if (error) throw error
      router.refresh()
    } catch (err) {
      console.error("[v0] Error approving gem:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReject = async () => {
    if (!selectedGem) return
    setIsLoading(true)
    try {
      const { error } = await supabase
        .from("gems")
        .update({
          status: "rejected",
          rejection_reason: rejectReason,
          updated_at: new Date().toISOString(),
        })
        .eq("id", selectedGem.id)

      if (error) throw error
      setIsRejectDialogOpen(false)
      setSelectedGem(null)
      setRejectReason("")
      router.refresh()
    } catch (err) {
      console.error("[v0] Error rejecting gem:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleApproveSeller = async (sellerId: string) => {
    setIsLoading(true)
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ is_approved: true, updated_at: new Date().toISOString() })
        .eq("id", sellerId)

      if (error) throw error
      router.refresh()
    } catch (err) {
      console.error("[v0] Error approving seller:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Diamond className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-foreground">Ceylon Sapphires</span>
              <Badge variant="secondary" className="ml-2">
                Admin
              </Badge>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-foreground mb-6">Admin Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Gems</p>
                  <p className="text-2xl font-bold">{stats.totalGems}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending Approval</p>
                  <p className="text-2xl font-bold">{stats.pendingApproval}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Listings</p>
                  <p className="text-2xl font-bold">{stats.activeListings}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <ShoppingBag className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Sellers</p>
                  <p className="text-2xl font-bold">{stats.totalSellers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Users className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Buyers</p>
                  <p className="text-2xl font-bold">{stats.totalBuyers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Pending Gems ({pendingGems.length})
            </TabsTrigger>
            <TabsTrigger value="sellers" className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Sellers ({sellers.length})
            </TabsTrigger>
            <TabsTrigger value="buyers" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Buyers ({buyers.length})
            </TabsTrigger>
          </TabsList>

          {/* Pending Gems Tab */}
          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Gem Approvals</CardTitle>
                <CardDescription>Review and approve or reject gem listings from sellers</CardDescription>
              </CardHeader>
              <CardContent>
                {pendingGems.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No pending gems to review</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Gem</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Weight</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Seller</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingGems.map((gem) => (
                        <TableRow key={gem.id}>
                          <TableCell className="font-medium">{gem.title}</TableCell>
                          <TableCell>{gem.gem_type}</TableCell>
                          <TableCell>{gem.weight_carats} ct</TableCell>
                          <TableCell>${gem.starting_price?.toLocaleString()}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{gem.seller?.business_name}</p>
                              <p className="text-sm text-muted-foreground">{gem.seller?.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>{new Date(gem.created_at).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleApprove(gem.id)}
                                disabled={isLoading}
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => {
                                  setSelectedGem(gem)
                                  setIsRejectDialogOpen(true)
                                }}
                                disabled={isLoading}
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sellers Tab */}
          <TabsContent value="sellers">
            <Card>
              <CardHeader>
                <CardTitle>Registered Sellers</CardTitle>
                <CardDescription>Manage seller accounts and approvals</CardDescription>
              </CardHeader>
              <CardContent>
                {sellers.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No sellers registered yet</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Business</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sellers.map((seller) => (
                        <TableRow key={seller.id}>
                          <TableCell className="font-medium">
                            {seller.first_name} {seller.last_name}
                          </TableCell>
                          <TableCell>{seller.business_name || "-"}</TableCell>
                          <TableCell>{seller.email}</TableCell>
                          <TableCell>{seller.location || "-"}</TableCell>
                          <TableCell>
                            {seller.is_approved ? (
                              <Badge variant="default" className="bg-green-500">
                                Approved
                              </Badge>
                            ) : (
                              <Badge variant="secondary">Pending</Badge>
                            )}
                          </TableCell>
                          <TableCell>{new Date(seller.created_at).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            {!seller.is_approved && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleApproveSeller(seller.id)}
                                disabled={isLoading}
                              >
                                <UserCheck className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Buyers Tab */}
          <TabsContent value="buyers">
            <Card>
              <CardHeader>
                <CardTitle>Registered Buyers</CardTitle>
                <CardDescription>View all registered buyers</CardDescription>
              </CardHeader>
              <CardContent>
                {buyers.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No buyers registered yet</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Joined</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {buyers.map((buyer) => (
                        <TableRow key={buyer.id}>
                          <TableCell className="font-medium">
                            {buyer.first_name} {buyer.last_name}
                          </TableCell>
                          <TableCell>{buyer.email}</TableCell>
                          <TableCell>{buyer.phone || "-"}</TableCell>
                          <TableCell>{new Date(buyer.created_at).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Reject Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Gem Listing</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting "{selectedGem?.title}". The seller will be notified.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Rejection Reason</Label>
              <Textarea
                id="reason"
                placeholder="Enter the reason for rejection..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject} disabled={!rejectReason.trim() || isLoading}>
              {isLoading ? "Rejecting..." : "Reject Listing"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
