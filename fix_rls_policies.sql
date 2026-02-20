-- Fix RLS Policies for Compass Connect
-- Run this in your Supabase SQL Editor if you get 406 errors

-- Drop existing policies that might be too restrictive
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON interests;
DROP POLICY IF EXISTS "Enable select for authenticated users" ON interests;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON interests;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON interests;
DROP POLICY IF EXISTS "Enable all for authenticated users on companions" ON companions;
DROP POLICY IF EXISTS "Enable all for authenticated users on patient_documents" ON patient_documents;

-- Create more permissive policies for development
CREATE POLICY "Enable all on interests" ON interests FOR ALL USING (true);
CREATE POLICY "Enable all on companions" ON companions FOR ALL USING (true);
CREATE POLICY "Enable all on patient_documents" ON patient_documents FOR ALL USING (true);

-- Also create storage policies for documents
DROP POLICY IF EXISTS "Allow_authenticated_storage" ON storage.objects;

CREATE POLICY "Enable all on storage" ON storage.objects FOR ALL USING (true);

-- Test the policies
SELECT 'RLS policies updated for development' as status;
