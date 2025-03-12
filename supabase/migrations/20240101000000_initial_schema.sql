-- Create schema for the financial management system

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Clients table
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  address TEXT,
  city TEXT,
  state TEXT,
  pincode TEXT,
  logo_url TEXT,
  status TEXT NOT NULL CHECK (status IN ('active', 'inactive', 'pending')) DEFAULT 'active',
  subscription_tier TEXT NOT NULL CHECK (subscription_tier IN ('free', 'basic', 'premium', 'enterprise')) DEFAULT 'free',
  subscription_ends_at TIMESTAMP WITH TIME ZONE,
  settings JSONB
);

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'manager', 'loan_officer', 'staff')) DEFAULT 'staff',
  avatar_url TEXT,
  status TEXT NOT NULL CHECK (status IN ('active', 'inactive')) DEFAULT 'active',
  last_login TIMESTAMP WITH TIME ZONE
);

-- Customers table
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT,
  city TEXT,
  state TEXT,
  pincode TEXT,
  id_type TEXT,
  id_number TEXT,
  date_of_birth DATE,
  occupation TEXT,
  monthly_income NUMERIC,
  employer TEXT,
  bank_name TEXT,
  account_number TEXT,
  ifsc_code TEXT,
  status TEXT NOT NULL CHECK (status IN ('active', 'inactive', 'blacklisted')) DEFAULT 'active',
  profile_image_url TEXT,
  kyc_verified BOOLEAN DEFAULT FALSE,
  notes TEXT,
  UNIQUE(client_id, email),
  UNIQUE(client_id, phone)
);

-- Loans table
CREATE TABLE loans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  client_id UUID NOT NULL REFERENCES clients(id) ON