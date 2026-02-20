-- Check which interest has the companion data
-- Run this in your Supabase SQL Editor

-- 1. Check the interest that has the companion
SELECT 'Interest that has companion:' as info;
SELECT * FROM interests WHERE id = '2edcee62-1bb1-476e-b5d1-687185979b44';

-- 2. Check all interests to see what's available
SELECT 'All interests in database:' as info;
SELECT id, booking_ref, user_data->>'full_name' as patient_name FROM interests;

-- 3. Check which interest the admin panel is trying to query
SELECT 'Interest admin panel is looking for:' as info;
SELECT * FROM interests WHERE id = '88977d44-cf92-49c1-9b84-459dbf850752';
