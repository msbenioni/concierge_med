-- Debug RLS Issues for Compass Connect
-- Run this in your Supabase SQL Editor

-- 1. Check current RLS status
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND tablename IN ('interests', 'companions', 'patient_documents');

-- 2. Check existing policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public' AND tablename IN ('interests', 'companions', 'patient_documents');

-- 3. Test direct access to companions table
SELECT 'Testing direct access to companions:' as info;
SELECT COUNT(*) as companion_count FROM companions;

-- 4. Test with a specific interest_id (replace with actual ID from your data)
SELECT 'Testing specific companion query:' as info;
SELECT * FROM companions WHERE interest_id = '88977d44-cf92-49c1-9b84-459dbf850752';

-- 5. Check if RLS is actually disabled for testing
-- Temporarily disable RLS for debugging
ALTER TABLE companions DISABLE ROW LEVEL SECURITY;

-- 6. Test again with RLS disabled
SELECT 'Testing with RLS disabled:' as info;
SELECT * FROM companions WHERE interest_id = '88977d44-cf92-49c1-9b84-459dbf850752';

-- 7. Re-enable RLS with a simple policy
ALTER TABLE companions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable all on companions" ON companions;
CREATE POLICY "Allow all access" ON companions FOR ALL USING (true);

-- 8. Final test
SELECT 'Final test with new policy:' as info;
SELECT * FROM companions WHERE interest_id = '88977d44-cf92-49c1-9b84-459dbf850752';
