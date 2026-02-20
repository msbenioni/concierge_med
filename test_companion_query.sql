-- Test the exact query that's failing
-- Run this in your Supabase SQL Editor

-- 1. Test the exact query the admin panel is making
SELECT 'Testing exact admin panel query:' as info;
SELECT * FROM companions WHERE interest_id = '88977d44-cf92-49c1-9b84-459dbf850752';

-- 2. Test the interest that DOES have a companion
SELECT 'Testing interest with companion:' as info;
SELECT * FROM companions WHERE interest_id = '2edcee62-1bb1-476e-b5d1-687185979b44';

-- 3. Check if there are any companions at all
SELECT 'All companions in database:' as info;
SELECT * FROM companions;

-- 4. Try a different approach - check if the issue is with empty results
SELECT 'Testing with a different interest_id (should return empty):' as info;
SELECT * FROM companions WHERE interest_id = '00000000-0000-0000-0000-000000000000';
