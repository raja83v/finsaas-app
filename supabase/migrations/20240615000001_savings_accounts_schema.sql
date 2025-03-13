-- Create savings account types table
CREATE TABLE IF NOT EXISTS account_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id),
  name TEXT NOT NULL,
  description TEXT,
  min_balance DECIMAL(12,2) NOT NULL DEFAULT 0,
  interest_rate DECIMAL(5,2) NOT NULL,
  interest_calculation_method TEXT NOT NULL DEFAULT 'daily',
  interest_posting_frequency TEXT NOT NULL DEFAULT 'quarterly',
  features JSONB,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create savings accounts table
CREATE TABLE IF NOT EXISTS savings_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_number TEXT NOT NULL UNIQUE,
  client_id UUID NOT NULL REFERENCES clients(id),
  customer_id UUID NOT NULL REFERENCES customers(id),
  account_type_id UUID NOT NULL REFERENCES account_types(id),
  current_balance DECIMAL(12,2) NOT NULL DEFAULT 0,
  available_balance DECIMAL(12,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active',
  opening_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_transaction_date TIMESTAMP WITH TIME ZONE,
  interest_rate DECIMAL(5,2) NOT NULL,
  maturity_date TIMESTAMP WITH TIME ZONE,
  statement_frequency TEXT DEFAULT 'monthly',
  statement_delivery_method TEXT DEFAULT 'email',
  is_dormant BOOLEAN DEFAULT FALSE,
  dormant_since TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'active', 'frozen', 'closed', 'dormant'))
);

-- Create account nominees table
CREATE TABLE IF NOT EXISTS account_nominees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_id UUID NOT NULL REFERENCES savings_accounts(id),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  relationship TEXT NOT NULL,
  date_of_birth DATE,
  address TEXT,
  phone TEXT,
  email TEXT,
  id_type TEXT,
  id_number TEXT,
  percentage DECIMAL(5,2) DEFAULT 100,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create account transactions table
CREATE TABLE IF NOT EXISTS account_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_id UUID NOT NULL REFERENCES savings_accounts(id),
  transaction_type TEXT NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  running_balance DECIMAL(12,2) NOT NULL,
  transaction_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  description TEXT,
  reference_number TEXT,
  transaction_method TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'completed',
  performed_by UUID REFERENCES users(id),
  receipt_number TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT valid_transaction_type CHECK (transaction_type IN ('deposit', 'withdrawal', 'transfer_in', 'transfer_out', 'interest_credit', 'fee_debit', 'adjustment'))
);

-- Create standing instructions table
CREATE TABLE IF NOT EXISTS standing_instructions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_id UUID NOT NULL REFERENCES savings_accounts(id),
  instruction_type TEXT NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  frequency TEXT NOT NULL,
  next_execution_date DATE NOT NULL,
  end_date DATE,
  beneficiary_type TEXT NOT NULL,
  beneficiary_id TEXT NOT NULL,
  beneficiary_account TEXT,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT valid_instruction_type CHECK (instruction_type IN ('transfer', 'payment', 'sweep_in', 'sweep_out'))
);

-- Create interest accruals table
CREATE TABLE IF NOT EXISTS interest_accruals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_id UUID NOT NULL REFERENCES savings_accounts(id),
  calculation_date DATE NOT NULL,
  balance_amount DECIMAL(12,2) NOT NULL,
  interest_rate DECIMAL(5,2) NOT NULL,
  accrued_amount DECIMAL(12,2) NOT NULL,
  is_posted BOOLEAN DEFAULT FALSE,
  posting_date TIMESTAMP WITH TIME ZONE,
  posting_reference TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create account statements table
CREATE TABLE IF NOT EXISTS account_statements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_id UUID NOT NULL REFERENCES savings_accounts(id),
  statement_date DATE NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  opening_balance DECIMAL(12,2) NOT NULL,
  closing_balance DECIMAL(12,2) NOT NULL,
  total_deposits DECIMAL(12,2) NOT NULL DEFAULT 0,
  total_withdrawals DECIMAL(12,2) NOT NULL DEFAULT 0,
  interest_earned DECIMAL(12,2) NOT NULL DEFAULT 0,
  file_url TEXT,
  delivery_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT valid_delivery_status CHECK (delivery_status IN ('pending', 'delivered', 'failed'))
);

-- Create account holds table
CREATE TABLE IF NOT EXISTS account_holds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_id UUID NOT NULL REFERENCES savings_accounts(id),
  amount DECIMAL(12,2) NOT NULL,
  hold_reason TEXT NOT NULL,
  hold_type TEXT NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  end_date TIMESTAMP WITH TIME ZONE,
  reference_id TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_by UUID REFERENCES users(id),
  released_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT valid_hold_type CHECK (hold_type IN ('cheque', 'legal', 'administrative', 'other'))
);

-- Create account opening applications table
CREATE TABLE IF NOT EXISTS account_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id),
  customer_id UUID NOT NULL REFERENCES customers(id),
  account_type_id UUID NOT NULL REFERENCES account_types(id),
  initial_deposit DECIMAL(12,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending',
  submitted_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  approved_by UUID REFERENCES users(id),
  approved_date TIMESTAMP WITH TIME ZONE,
  rejection_reason TEXT,
  account_id UUID REFERENCES savings_accounts(id),
  application_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT valid_application_status CHECK (status IN ('draft', 'pending', 'under_review', 'approved', 'rejected'))
);

-- Add realtime support
alter publication supabase_realtime add table savings_accounts;
alter publication supabase_realtime add table account_transactions;
alter publication supabase_realtime add table account_applications;
