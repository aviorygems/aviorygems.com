import { redirect } from "next/navigation"
import Link from "next/link"
import { Diamond, Plus, Package, DollarSign, LogOut, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { createClient } from "@/lib/supabase/server"

export default async function SellerDashboard() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (profile?.role !== "seller") {
    redirect("/login")
  }

  const { data: gems } = await supabase
    .from("gems")
    .select("*")
    .eq("seller_id", user.id)
    .order("created_at", { ascending: false })

  // Calculate stats
  const activeListings = gems?.filter((g) => g.status === "active" || g.status === "approved").length || 0
  const pendingApproval = gems?.filter((g) => g.status === "pending").length || 0
  const rejectedListings = gems?.filter((g) => g.status === "rejected").length || 0

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "approved":
      case "active":
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="destructive">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        )
      case "sold":
        return <Badge className="bg-blue-500">Sold</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Diamond className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold text-foreground">Ceylon Sapphires</span>
          </Link>
          <form action="/api/auth/signout" method="POST">
            <Button variant="ghost" size="sm" type="submit">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </form>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Welcome, {profile?.business_name || profile?.first_name || "Seller"}!
          </h1>
          <p className="text-muted-foreground mt-1">Manage your gemstone listings and auctions.</p>
        </div>

        {!profile?.is_approved && (
          <div className="mb-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
              <div>
                <p className="font-medium text-amber-800 dark:text-amber-200">Account Pending Approval</p>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                  Your seller account is being reviewed by our admin team. You can create listings, but they will
                  require admin approval before going live.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
              <Package className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeListings}</div>
              <p className="text-xs text-muted-foreground">Gems currently on auction</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
              <Clock className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingApproval}</div>
              <p className="text-xs text-muted-foreground">Listings awaiting review</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <XCircle className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rejectedListings}</div>
              <p className="text-xs text-muted-foreground">Needs revision</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$0</div>
              <p className="text-xs text-muted-foreground">Revenue from sold gems</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Your Listings</h2>
          <Button asChild>
            <Link href="/dashboard/seller/new-listing">
              <Plus className="w-4 h-4 mr-2" />
              Create New Listing
            </Link>
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            {!gems || gems.length === 0 ? (
              <div className="text-center py-12">
                <Diamond className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground mb-4">You haven't created any listings yet</p>
                <Button asChild>
                  <Link href="/dashboard/seller/new-listing">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Listing
                  </Link>
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Starting Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gems.map((gem) => (
                    <TableRow key={gem.id}>
                      <TableCell className="font-medium">{gem.title}</TableCell>
                      <TableCell>{gem.gem_type}</TableCell>
                      <TableCell>{gem.weight_carats} ct</TableCell>
                      <TableCell>${gem.starting_price?.toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(gem.status)}</TableCell>
                      <TableCell>{new Date(gem.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
