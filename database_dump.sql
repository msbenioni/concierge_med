-- Database dump for interests table structure
-- Run this in Supabase SQL Editor to see the actual table structure

-- Get table information
SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'interests' ORDER BY ordinal_position;

-- Sample data to understand structure
SELECT * FROM interests LIMIT 1;

-- Alternative: Describe table
\d interests;
