-- Compass Connect Database Schema for Supabase
-- Run these SQL commands in your Supabase SQL Editor

-- 1. Create trips table
CREATE TABLE IF NOT EXISTS trips (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  departure_city VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  departure_date DATE NOT NULL,
  return_date DATE NOT NULL,
  confirmed_count INTEGER DEFAULT 0,
  min_travelers INTEGER DEFAULT 4,
  price DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'available',
  hospital_approved BOOLEAN DEFAULT false,
  hospital_reference VARCHAR(255),
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create interests table
CREATE TABLE IF NOT EXISTS interests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_ref VARCHAR(50) UNIQUE NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  country VARCHAR(255) NOT NULL,
  departure_country VARCHAR(255) NOT NULL,
  departure_city VARCHAR(255) NOT NULL,
  preferred_date VARCHAR(255) NOT NULL,
  other_country VARCHAR(255),
  trip_type VARCHAR(100) DEFAULT 'bariatric',
  trip_title VARCHAR(255) DEFAULT 'Medical Journey Consultation',
  travelers_count INTEGER DEFAULT 1,
  booking_status VARCHAR(50) DEFAULT 'new',
  payment_status VARCHAR(50) DEFAULT 'unpaid',
  flight_status VARCHAR(50) DEFAULT 'not_started',
  accommodation_status VARCHAR(50) DEFAULT 'not_started',
  transfers_status VARCHAR(50) DEFAULT 'not_started',
  questionnaire_complete BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create questionnaires table
CREATE TABLE IF NOT EXISTS questionnaires (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reference VARCHAR(50) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  date_of_birth DATE,
  height VARCHAR(50),
  weight VARCHAR(50),
  medical_conditions TEXT,
  medications TEXT,
  allergies TEXT,
  previous_surgeries TEXT,
  smoking_status VARCHAR(50),
  alcohol_consumption VARCHAR(50),
  exercise_frequency VARCHAR(50),
  dietary_restrictions TEXT,
  travel_history TEXT,
  insurance_coverage TEXT,
  preferred_hospital VARCHAR(255),
  preferred_travel_dates VARCHAR(255),
  emergency_contact VARCHAR(255),
  emergency_phone VARCHAR(50),
  emergency_relationship VARCHAR(255),
  status VARCHAR(50) DEFAULT 'submitted',
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50),
  country VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user',
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_trips_featured ON trips(featured);
CREATE INDEX IF NOT EXISTS idx_trips_status ON trips(status);
CREATE INDEX IF NOT EXISTS idx_trips_departure_date ON trips(departure_date);

CREATE INDEX IF NOT EXISTS idx_interests_email ON interests(email);
CREATE INDEX IF NOT EXISTS idx_interests_status ON interests(booking_status);
CREATE INDEX IF NOT EXISTS idx_interests_ref ON interests(booking_ref);
CREATE INDEX IF NOT EXISTS idx_interests_created_at ON interests(created_at);

CREATE INDEX IF NOT EXISTS idx_questionnaires_reference ON questionnaires(reference);
CREATE INDEX IF NOT EXISTS idx_questionnaires_email ON questionnaires(email);
CREATE INDEX IF NOT EXISTS idx_questionnaires_status ON questionnaires(status);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);

-- 6. Enable Row Level Security (RLS) for all tables
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE questionnaires ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- 7. Create RLS policies (allow all operations for now, you can restrict later)
-- Trips policies
CREATE POLICY "Enable all operations on trips" ON trips
  FOR ALL USING (true);

-- Interests policies  
CREATE POLICY "Enable all operations on interests" ON interests
  FOR ALL USING (true);

-- Questionnaires policies
CREATE POLICY "Enable all operations on questionnaires" ON questionnaires
  FOR ALL USING (true);

-- Users policies
CREATE POLICY "Enable all operations on users" ON users
  FOR ALL USING (true);

-- 8. Insert sample featured trips (optional - you can remove these)
INSERT INTO trips (title, departure_city, destination, departure_date, return_date, confirmed_count, min_travelers, price, status, hospital_approved, hospital_reference, image_url, featured, description) VALUES
('Auckland Medical Journey', 'Auckland', 'Tijuana, Mexico', '2024-03-15', '2024-03-22', 6, 4, 4000.00, 'available', true, 'MBC-2024-0315', '/mexico/medical-facility-1.jpg', true, 'Complete medical journey package from Auckland to Tijuana with accommodation and transfers included.'),
('Sydney Medical Journey', 'Sydney', 'Tijuana, Mexico', '2024-04-12', '2024-04-19', 3, 4, 4000.00, 'available', true, 'MBC-2024-0412', '/mexico/medical-facility-2.jpg', true, 'All-inclusive medical travel package from Sydney with premium hospital partnerships.');

-- 9. Create updated_at trigger function (if not exists)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 10. Create triggers for updated_at
CREATE TRIGGER update_trips_updated_at BEFORE UPDATE ON trips
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_interests_updated_at BEFORE UPDATE ON interests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_questionnaires_updated_at BEFORE UPDATE ON questionnaires
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
