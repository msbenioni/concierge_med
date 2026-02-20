-- Fix Row Level Security for companions table
-- Run this in your Supabase SQL Editor

-- 1. Drop existing policy if it exists
DROP POLICY IF EXISTS "Enable all operations on companions" ON companions;

-- 2. Create new policy that allows all operations
CREATE POLICY "Enable all operations on companions" ON companions
  FOR ALL USING (true);

-- 3. Make sure RLS is enabled
ALTER TABLE companions ENABLE ROW LEVEL SECURITY;
