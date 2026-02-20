-- Check the REAL table structure in your remote Supabase
-- Run this in your Supabase SQL Editor

-- 1. Check actual structure of interests table
SELECT 'Real interests table structure:' as info;
\d interests

-- 2. Check all interests with correct column names
SELECT 'All interests (try different column names):' as info;

-- Try with 'user' column instead of 'user_data'
SELECT id, booking_ref, "user"->>'full_name' as patient_name FROM interests;

-- If that doesn't work, try these alternatives:
-- SELECT id, booking_ref, full_name FROM interests;
-- SELECT id, booking_ref, user_name FROM interests;
-- SELECT * FROM interests LIMIT 3;
