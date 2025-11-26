import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default async function AdminPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Check if user is admin
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (profile?.role !== "admin") {
    redirect("/")
  }

  // Fetch pending gems for approval
  const { data: pendingGems } = await supabase
    .from("gems")
    .select(`
      *,
      seller:profiles!gems_seller_id_fkey(
        id,
        first_name,
        last_name,
        business_name,
        email
      )
    `)
    .eq("status", "pending")
    .order("created_at", { ascending: false })

  // Fetch all sellers
  const { data: sellers } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "seller")
    .order("created_at", { ascending: false })

  // Fetch all buyers
  const { data: buyers } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "buyer")
    .order("created_at", { ascending: false })

  // Fetch stats
  const { count: totalGems } = await supabase.from("gems").select("*", { count: "exact", head: true })

  const { count: pendingCount } = await supabase
    .from("gems")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending")

  const { count: activeCount } = await supabase
    .from("gems")
    .select("*", { count: "exact", head: true })
    .eq("status", "active")

  return (
    <AdminDashboard
      pendingGems={pendingGems || []}
      sellers={sellers || []}
      buyers={buyers || []}
      stats={{
        totalGems: totalGems || 0,
        pendingApproval: pendingCount || 0,
        activeListings: activeCount || 0,
        totalSellers: sellers?.length || 0,
        totalBuyers: buyers?.length || 0,
      }}
    />
  )
}
