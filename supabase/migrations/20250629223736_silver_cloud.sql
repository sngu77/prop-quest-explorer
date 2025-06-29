/*
  # Property Management Schema

  1. New Tables
    - `properties`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `title` (text)
      - `address` (text)
      - `city` (text)
      - `state` (text)
      - `zip_code` (text)
      - `rent` (numeric)
      - `bedrooms` (text)
      - `bathrooms` (text)
      - `sqft` (text)
      - `property_type` (text)
      - `description` (text)
      - `amenities` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `rental_applications`
      - `id` (uuid, primary key)
      - `property_id` (uuid, foreign key)
      - `applicant_name` (text)
      - `applicant_email` (text)
      - `applicant_phone` (text)
      - `income` (numeric)
      - `credit_score` (integer)
      - `status` (text)
      - `applied_date` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for users to manage their own data
*/

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  address text NOT NULL,
  city text DEFAULT '',
  state text DEFAULT '',
  zip_code text DEFAULT '',
  rent numeric NOT NULL DEFAULT 0,
  bedrooms text DEFAULT '',
  bathrooms text DEFAULT '',
  sqft text DEFAULT '',
  property_type text DEFAULT '',
  description text DEFAULT '',
  amenities text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create rental applications table
CREATE TABLE IF NOT EXISTS rental_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  applicant_name text NOT NULL,
  applicant_email text NOT NULL,
  applicant_phone text DEFAULT '',
  income numeric DEFAULT 0,
  credit_score integer DEFAULT 0,
  status text DEFAULT 'pending',
  applied_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE rental_applications ENABLE ROW LEVEL SECURITY;

-- Properties policies
CREATE POLICY "Users can view own properties"
  ON properties
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own properties"
  ON properties
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own properties"
  ON properties
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own properties"
  ON properties
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Rental applications policies
CREATE POLICY "Property owners can view applications for their properties"
  ON rental_applications
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM properties 
      WHERE properties.id = rental_applications.property_id 
      AND properties.user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can apply to properties"
  ON rental_applications
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for properties
CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();