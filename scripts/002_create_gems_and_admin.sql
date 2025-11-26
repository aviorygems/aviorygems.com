-- Create gems/listings table for sellers
CREATE TABLE IF NOT EXISTS public.gems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  gem_type TEXT NOT NULL,
  weight_carats DECIMAL(10,2),
  color TEXT,
  clarity TEXT,
  origin TEXT,
  certification TEXT,
  starting_price DECIMAL(12,2) NOT NULL,
  current_bid DECIMAL(12,2),
  reserve_price DECIMAL(12,2),
  images TEXT[],
  status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'rejected', 'active', 'sold', 'expired')) DEFAULT 'pending',
  rejection_reason TEXT,
  auction_start TIMESTAMPTZ,
  auction_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on gems table
ALTER TABLE public.gems ENABLE ROW LEVEL SECURITY;

-- Sellers can view their own gems
CREATE POLICY "sellers_view_own_gems"
  ON public.gems FOR SELECT
  USING (auth.uid() = seller_id);

-- Sellers can insert their own gems
CREATE POLICY "sellers_insert_gems"
  ON public.gems FOR INSERT
  WITH CHECK (auth.uid() = seller_id);

-- Sellers can update their own pending gems
CREATE POLICY "sellers_update_own_gems"
  ON public.gems FOR UPDATE
  USING (auth.uid() = seller_id AND status = 'pending');

-- Sellers can delete their own pending gems
CREATE POLICY "sellers_delete_own_gems"
  ON public.gems FOR DELETE
  USING (auth.uid() = seller_id AND status = 'pending');

-- Buyers can view approved/active gems only
CREATE POLICY "buyers_view_approved_gems"
  ON public.gems FOR SELECT
  USING (
    status IN ('approved', 'active', 'sold') AND
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('buyer', 'admin')
    )
  );

-- Admins can view all gems
CREATE POLICY "admins_view_all_gems"
  ON public.gems FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can update all gems (for approval/rejection)
CREATE POLICY "admins_update_all_gems"
  ON public.gems FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_gems_seller_id ON public.gems(seller_id);
CREATE INDEX IF NOT EXISTS idx_gems_status ON public.gems(status);
CREATE INDEX IF NOT EXISTS idx_gems_gem_type ON public.gems(gem_type);

-- Function to create an admin user (run manually with desired email)
-- Usage: SELECT create_admin_user('admin@example.com');
CREATE OR REPLACE FUNCTION create_admin_user(admin_email TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_id UUID;
BEGIN
  SELECT id INTO user_id FROM auth.users WHERE email = admin_email;
  
  IF user_id IS NULL THEN
    RETURN 'User not found. Please register first, then run this function.';
  END IF;
  
  UPDATE public.profiles 
  SET role = 'admin', is_approved = true
  WHERE id = user_id;
  
  RETURN 'Admin user created successfully for ' || admin_email;
END;
$$;
