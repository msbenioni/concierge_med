-- Check Table Structure and Debug 406 Error
-- Run this in your Supabase SQL Editor

-- 1. Check if companions table actually exists and its structure
SELECT 'Checking companions table structure:' as info;
\d companions

-- 2. Check if the specific interest_id exists
SELECT 'Checking if interest_id exists in interests table:' as info;
SELECT id, booking_ref FROM interests WHERE id = '88977d44-cf92-49c1-9b84-459dbf850752';

-- 3. Check if there are any companions for this interest_id
SELECT 'Checking companions for this interest_id:' as info;
SELECT * FROM companions WHERE interest_id = '88977d44-cf92-49c1-9b84-459dbf850752';

-- 4. Check all companions to see data structure
SELECT 'All companions in database:' as info;
SELECT * FROM companions LIMIT 5;

-- 5. Try a simple API-like query
SELECT 'Testing simple query:' as info;
SELECT * FROM companions LIMIT 1;

-- 6. Check if there are any constraints or issues
SELECT 'Checking table constraints:' as info;
SELECT conname, contype FROM pg_constraint WHERE conrelid = 'companions'::regclass;
