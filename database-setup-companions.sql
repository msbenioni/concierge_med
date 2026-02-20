-- Create companions table if it doesn't exist
CREATE TABLE IF NOT EXISTS companions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    interest_id UUID REFERENCES interests(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    relationship TEXT,
    dietary_requirements TEXT,
    mobility_needs TEXT,
    special_requests TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE companions ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for authenticated users
CREATE POLICY "Authenticated users can view companions for their interests" ON companions
    FOR SELECT USING (
        auth.role() = 'authenticated' AND 
        interest_id IN (
            SELECT id FROM interests WHERE 
            -- Add any additional conditions here if needed
            true
        )
    );

-- Create RLS policy for authenticated users to insert companions
CREATE POLICY "Authenticated users can insert companions" ON companions
    FOR INSERT WITH CHECK (
        auth.role() = 'authenticated' AND 
        interest_id IN (
            SELECT id FROM interests WHERE 
            -- Add any additional conditions here if needed
            true
        )
    );

-- Create RLS policy for authenticated users to update companions
CREATE POLICY "Authenticated users can update companions" ON companions
    FOR UPDATE USING (
        auth.role() = 'authenticated' AND 
        interest_id IN (
            SELECT id FROM interests WHERE 
            -- Add any additional conditions here if needed
            true
        )
    );

-- Create RLS policy for authenticated users to delete companions
CREATE POLICY "Authenticated users can delete companions" ON companions
    FOR DELETE USING (
        auth.role() = 'authenticated' AND 
        interest_id IN (
            SELECT id FROM interests WHERE 
            -- Add any additional conditions here if needed
            true
        )
    );

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_companions_interest_id ON companions(interest_id);

-- Grant permissions
GRANT ALL ON companions TO authenticated;
GRANT SELECT ON companions TO anon;
