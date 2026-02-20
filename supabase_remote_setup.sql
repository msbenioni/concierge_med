-- Supabase Remote Database Setup for Compass Connect
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/oxcchsarokkxuqirbhib

-- First, let's check what tables already exist
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;

-- Create interests table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS interests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_ref VARCHAR(50) UNIQUE NOT NULL,
  user_data JSONB NOT NULL, -- Changed from 'user' to 'user_data' to avoid SQL reserved keyword
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

-- Create companions table
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

-- Create patient_documents table
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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_interests_booking_ref ON interests(booking_ref);
CREATE INDEX IF NOT EXISTS idx_interests_booking_status ON interests(booking_status);
CREATE INDEX IF NOT EXISTS idx_interests_created_at ON interests(created_at);
CREATE INDEX IF NOT EXISTS idx_companions_interest_id ON companions(interest_id);
CREATE INDEX IF NOT EXISTS idx_patient_documents_interest_id ON patient_documents(interest_id);
CREATE INDEX IF NOT EXISTS idx_patient_documents_document_type ON patient_documents(document_type);
CREATE INDEX IF NOT EXISTS idx_patient_documents_uploaded_at ON patient_documents(uploaded_at);

-- Enable RLS
ALTER TABLE interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE companions ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_documents ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Enable insert for authenticated users" ON interests FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable select for authenticated users" ON interests FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users" ON interests FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users" ON interests FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all for authenticated users on companions" ON companions FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all for authenticated users on patient_documents" ON patient_documents FOR ALL USING (auth.role() = 'authenticated');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
CREATE TRIGGER update_interests_updated_at BEFORE UPDATE ON interests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_companions_updated_at BEFORE UPDATE ON companions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_patient_documents_updated_at BEFORE UPDATE ON patient_documents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions
GRANT ALL ON interests TO authenticated;
GRANT ALL ON companions TO authenticated;
GRANT ALL ON patient_documents TO authenticated;
GRANT SELECT ON interests TO anon;
GRANT SELECT ON companions TO anon;
GRANT SELECT ON patient_documents TO anon;

-- Verify setup
SELECT 'Database setup completed!' as status,
       (SELECT COUNT(*) FROM interests) as interests_count,
       (SELECT COUNT(*) FROM companions) as companions_count,
       (SELECT COUNT(*) FROM patient_documents) as documents_count;
