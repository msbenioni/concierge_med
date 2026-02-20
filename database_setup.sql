-- Patient Documents Database Setup for Compass Connect
-- Run these SQL commands in your Supabase SQL Editor

-- 1. Create the patient_documents table
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

-- 2. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_patient_documents_interest_id ON patient_documents(interest_id);
CREATE INDEX IF NOT EXISTS idx_patient_documents_document_type ON patient_documents(document_type);
CREATE INDEX IF NOT EXISTS idx_patient_documents_uploaded_at ON patient_documents(uploaded_at);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE patient_documents ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS policies
-- Policy: Users can view documents for their own interests
CREATE POLICY "Users can view documents for their interests" ON patient_documents
  FOR SELECT USING (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM interests 
      WHERE interests.id = patient_documents.interest_id
      AND (
        -- Check if user's email matches the interest's user_data.email
        interests.user_data->>'email' = auth.email()
        OR
        -- Admin override
        auth.jwt()->>'role' = 'admin'
      )
    )
  );

-- Policy: Users can upload documents for their own interests
CREATE POLICY "Users can upload documents for their interests" ON patient_documents
  FOR INSERT WITH CHECK (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM interests 
      WHERE interests.id = interest_id
      AND (
        -- Check if user's email matches the interest's user_data.email
        interests.user_data->>'email' = auth.email()
        OR
        -- Admin override
        auth.jwt()->>'role' = 'admin'
      )
    )
  );

-- Policy: Users can update documents for their own interests
CREATE POLICY "Users can update documents for their interests" ON patient_documents
  FOR UPDATE USING (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM interests 
      WHERE interests.id = patient_documents.interest_id
      AND (
        -- Check if user's email matches the interest's user_data.email
        interests.user_data->>'email' = auth.email()
        OR
        -- Admin override
        auth.jwt()->>'role' = 'admin'
      )
    )
  );

-- Policy: Users can delete documents for their own interests
CREATE POLICY "Users can delete documents for their interests" ON patient_documents
  FOR DELETE USING (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM interests 
      WHERE interests.id = patient_documents.interest_id
      AND (
        -- Check if user's email matches the interest's user_data.email
        interests.user_data->>'email' = auth.email()
        OR
        -- Admin override
        auth.jwt()->>'role' = 'admin'
      )
    )
  );

-- Policy: Admins can manage all documents (fallback)
CREATE POLICY "Admins can manage all documents" ON patient_documents
  FOR ALL USING (
    auth.jwt()->>'role' = 'admin'
  );

-- 5. Create a function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 6. Create trigger to automatically update updated_at
CREATE TRIGGER update_patient_documents_updated_at
  BEFORE UPDATE ON patient_documents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 7. Create storage bucket for patient documents
-- Note: This needs to be created via Supabase Dashboard or using the storage API
-- Bucket name: patient-documents
-- Public access: Enabled

-- 8. Create storage policies for the patient-documents bucket
-- Policy: Users can upload files to their own folder
CREATE POLICY "Users can upload files to their folder" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'patient-documents' AND
    auth.role() = 'authenticated' AND
    (
      -- Extract interest_id from file path and check ownership
      (storage.foldername(name))[1] IN (
        SELECT id::text FROM interests 
        WHERE interests.user_data->>'email' = auth.email()
      )
      OR
      -- Admin override
      auth.jwt()->>'role' = 'admin'
    )
  );

-- Policy: Users can view their own files
CREATE POLICY "Users can view their own files" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'patient-documents' AND
    auth.role() = 'authenticated' AND
    (
      -- Extract interest_id from file path and check ownership
      (storage.foldername(name))[1] IN (
        SELECT id::text FROM interests 
        WHERE interests.user_data->>'email' = auth.email()
      )
      OR
      -- Admin override
      auth.jwt()->>'role' = 'admin'
    )
  );

-- Policy: Users can update their own files
CREATE POLICY "Users can update their own files" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'patient-documents' AND
    auth.role() = 'authenticated' AND
    (
      -- Extract interest_id from file path and check ownership
      (storage.foldername(name))[1] IN (
        SELECT id::text FROM interests 
        WHERE interests.user_data->>'email' = auth.email()
      )
      OR
      -- Admin override
      auth.jwt()->>'role' = 'admin'
    )
  );

-- Policy: Users can delete their own files
CREATE POLICY "Users can delete their own files" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'patient-documents' AND
    auth.role() = 'authenticated' AND
    (
      -- Extract interest_id from file path and check ownership
      (storage.foldername(name))[1] IN (
        SELECT id::text FROM interests 
        WHERE interests.user_data->>'email' = auth.email()
      )
      OR
      -- Admin override
      auth.jwt()->>'role' = 'admin'
    )
  );

-- Policy: Admins can manage all files
CREATE POLICY "Admins can manage all files" ON storage.objects
  FOR ALL USING (
    bucket_id = 'patient-documents' AND
    auth.jwt()->>'role' = 'admin'
  );

-- 9. Grant necessary permissions
GRANT ALL ON patient_documents TO authenticated;
GRANT SELECT ON patient_documents TO anon;

-- 10. Add helpful comments
COMMENT ON TABLE patient_documents IS 'Stores patient-related documents uploaded by users';
COMMENT ON COLUMN patient_documents.interest_id IS 'Foreign key to the interests table';
COMMENT ON COLUMN patient_documents.document_type IS 'Type of document (medical_report, passport, visa, etc.)';
COMMENT ON COLUMN patient_documents.file_path IS 'Storage path in Supabase Storage';
COMMENT ON COLUMN patient_documents.public_url IS 'Public URL for accessing the file';
