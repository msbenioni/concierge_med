-- Compass Connect Database Migration
-- Run this script in your Supabase SQL Editor to add trip_type column

-- Add trip_type column to interests table
ALTER TABLE interests 
ADD COLUMN IF NOT EXISTS trip_type VARCHAR(100) DEFAULT 'bariatric';

-- Update existing records to have default trip_type based on trip_title (if needed)
UPDATE interests 
SET trip_type = 'bariatric' 
WHERE trip_type IS NULL OR trip_type = '';

-- Optional: Create index for better performance on trip_type queries
CREATE INDEX IF NOT EXISTS idx_interests_trip_type ON interests(trip_type);

-- Verify the column was added successfully
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'interests' AND column_name = 'trip_type';
