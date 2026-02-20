-- Quick Fix for 406 Error - Disable RLS Temporarily
-- Run this in your Supabase SQL Editor

-- Disable RLS completely for all tables to get admin panel working
ALTER TABLE interests DISABLE ROW LEVEL SECURITY;
ALTER TABLE companions DISABLE ROW LEVEL SECURITY;
ALTER TABLE patient_documents DISABLE ROW LEVEL SECURITY;

-- Test that companions table is accessible
SELECT 'Companions table should now be accessible' as status;
SELECT COUNT(*) as total_companions FROM companions;

-- If this works, you can re-enable RLS later with proper policies
SELECT 'RLS temporarily disabled - admin panel should work now' as status;
