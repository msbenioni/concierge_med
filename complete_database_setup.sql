-- Complete Database Setup for Compass Connect
-- Run this in your Supabase SQL Editor or via Docker

-- 1. Create interests table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS interests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_ref VARCHAR(50) UNIQUE NOT NULL,
  user JSONB NOT NULL, -- Stores user information as JSON (full_name, email, phone, country)
  trip_title VARCHAR(255) NOT NULL,
  travelers_count INTEGER DEFAULT 1,
  preferred_date DATE,
  booking_status VARCHAR(50) DEFAULT 'pending',
  payment_status VARCHAR(50) DEFAULT 'unpaid',
  questionnaire_complete BOOLEAN DEFAULT FALSE,
  flight_status VARCHAR(50) DEFAULT 'not_started',
  accommodation_status VARCHAR(50) DEFAULT 'not_started',
  transfers_status VARCHAR(50) DEFAULT 'not_started',
  notes TEXT,
  payment_link_url TEXT,
  q_form_clicked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create companions table
CREATE TABLE IF NOT EXISTS companions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  interest_id UUID NOT NULL REFERENCES interests(id) ON DELETE CASCADE,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  companion_cost DECIMAL(10,2),
  payment_status VARCHAR(50) DEFAULT 'unpaid',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create patient_documents table
CREATE TABLE IF NOT EXISTS patient_documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  interest_id UUID NOT NULL REFERENCES interests(id) ON DELETE CASCADE,
  document_type VARCHAR(50) NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  file_size BIGINT NOT NULL,
  file_type VARCHAR(100) NOT NULL,
  public_url TEXT NOT NULL,
  description TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create indexes for better performance
-- Interests table indexes
CREATE INDEX IF NOT EXISTS idx_interests_booking_ref ON interests(booking_ref);
CREATE INDEX IF NOT EXISTS idx_interests_booking_status ON interests(booking_status);
CREATE INDEX IF NOT EXISTS idx_interests_created_at ON interests(created_at);

-- Companions table indexes
CREATE INDEX IF NOT EXISTS idx_companions_interest_id ON companions(interest_id);

-- Patient documents table indexes
CREATE INDEX IF NOT EXISTS idx_patient_documents_interest_id ON patient_documents(interest_id);
CREATE INDEX IF NOT EXISTS idx_patient_documents_document_type ON patient_documents(document_type);
CREATE INDEX IF NOT EXISTS idx_patient_documents_uploaded_at ON patient_documents(uploaded_at);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE companions ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_documents ENABLE ROW LEVEL SECURITY;

-- 6. Create RLS policies for interests
CREATE POLICY "Allow authenticated users to view interests" ON interests
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert interests" ON interests
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update interests" ON interests
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete interests" ON interests
  FOR DELETE USING (auth.role() = 'authenticated');

-- 7. Create RLS policies for companions
CREATE POLICY "Allow authenticated users to manage companions" ON companions
  FOR ALL USING (auth.role() = 'authenticated');

-- 8. Create RLS policies for patient_documents
CREATE POLICY "Allow authenticated users to manage documents" ON patient_documents
  FOR ALL USING (auth.role() = 'authenticated');

-- 9. Create functions to automatically update updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 10. Create triggers for updated_at
CREATE TRIGGER update_interests_updated_at
  BEFORE UPDATE ON interests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_companions_updated_at
  BEFORE UPDATE ON companions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_patient_documents_updated_at
  BEFORE UPDATE ON patient_documents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 11. Storage bucket setup (run this in Supabase Dashboard)
-- Create bucket named: patient-documents
-- Enable public access

-- 12. Storage policies (run after creating the bucket)
CREATE POLICY "Allow authenticated users to manage files" ON storage.objects
  FOR ALL USING (
    bucket_id = 'patient-documents' AND
    auth.role() = 'authenticated'
  );

-- 13. Grant necessary permissions
GRANT ALL ON interests TO authenticated;
GRANT ALL ON companions TO authenticated;
GRANT ALL ON patient_documents TO authenticated;
GRANT SELECT ON interests TO anon;
GRANT SELECT ON companions TO anon;
GRANT SELECT ON patient_documents TO anon;

-- 14. Add helpful comments
COMMENT ON TABLE interests IS 'Stores patient booking interests and inquiries';
COMMENT ON TABLE companions IS 'Stores companion information for patient trips';
COMMENT ON TABLE patient_documents IS 'Stores patient-related documents uploaded by users';

-- 15. Test queries to verify setup
SELECT 'Database setup completed successfully!' as status,
       (SELECT COUNT(*) FROM interests) as interests_count,
       (SELECT COUNT(*) FROM companions) as companions_count,
       (SELECT COUNT(*) FROM patient_documents) as documents_count;
