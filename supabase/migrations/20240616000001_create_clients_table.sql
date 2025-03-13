-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  address TEXT,
  city TEXT,
  state TEXT,
  pincode TEXT,
  logo_url TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  subscription_tier TEXT NOT NULL DEFAULT 'free',
  subscription_ends_at TIMESTAMPTZ,
  settings JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable row level security
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Create policy for clients table
DROP POLICY IF EXISTS "Clients are viewable by authenticated users" ON clients;
CREATE POLICY "Clients are viewable by authenticated users"
  ON clients FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Clients are editable by themselves" ON clients;
CREATE POLICY "Clients are editable by themselves"
  ON clients FOR UPDATE
  USING (auth.uid() = id);

-- Enable realtime
alter publication supabase_realtime add table clients;
