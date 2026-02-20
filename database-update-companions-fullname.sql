-- Update companions table to use full_name instead of first_name and last_name

-- Step 1: Add the full_name column
ALTER TABLE companions 
ADD COLUMN full_name TEXT;

-- Step 2: Populate full_name from existing first_name and last_name
UPDATE companions 
SET full_name = COALESCE(first_name, '') || ' ' || COALESCE(last_name, '')
WHERE full_name IS NULL;

-- Step 3: Clean up the full_name values (remove extra spaces)
UPDATE companions 
SET full_name = TRIM(REGEXP_REPLACE(full_name, '\s+', ' ', 'g'))
WHERE full_name IS NOT NULL;

-- Step 4: Drop the old first_name and last_name columns
ALTER TABLE companions 
DROP COLUMN first_name,
DROP COLUMN last_name;

-- Step 5: Update RLS policies to reference the new structure
DROP POLICY IF EXISTS "Authenticated users can view companions for their interests" ON companions;
DROP POLICY IF EXISTS "Authenticated users can insert companions" ON companions;
DROP POLICY IF EXISTS "Authenticated users can update companions" ON companions;
DROP POLICY IF EXISTS "Authenticated users can delete companions" ON companions;

-- Recreate RLS policies for the updated schema
CREATE POLICY "Authenticated users can view companions for their interests" ON companions
    FOR SELECT USING (
        auth.role() = 'authenticated' AND 
        interest_id IN (
            SELECT id FROM interests WHERE 
            -- Add any additional conditions here if needed
            true
        )
    );

CREATE POLICY "Authenticated users can insert companions" ON companions
    FOR INSERT WITH CHECK (
        auth.role() = 'authenticated' AND 
        interest_id IN (
            SELECT id FROM interests WHERE 
            -- Add any additional conditions here if needed
            true
        )
    );

CREATE POLICY "Authenticated users can update companions" ON companions
    FOR UPDATE USING (
        auth.role() = 'authenticated' AND 
        interest_id IN (
            SELECT id FROM interests WHERE 
            -- Add any additional conditions here if needed
            true
        )
    );

CREATE POLICY "Authenticated users can delete companions" ON companions
    FOR DELETE USING (
        auth.role() = 'authenticated' AND 
        interest_id IN (
            SELECT id FROM interests WHERE 
            -- Add any additional conditions here if needed
            true
        )
    );

-- Step 6: Verify the changes
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'companions' 
ORDER BY ordinal_position;
