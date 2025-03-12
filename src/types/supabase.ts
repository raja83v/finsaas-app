export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      clients: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
          phone: string;
          address: string | null;
          city: string | null;
          state: string | null;
          pincode: string | null;
          logo_url: string | null;
          status: "active" | "inactive" | "pending";
          subscription_tier: "free" | "basic" | "premium" | "enterprise";
          subscription_ends_at: string | null;
          settings: Json | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          email: string;
          phone: string;
          address?: string | null;
          city?: string | null;
          state?: string | null;
          pincode?: string | null;
          logo_url?: string | null;
          status?: "active" | "inactive" | "pending";
          subscription_tier?: "free" | "basic" | "premium" | "enterprise";
          subscription_ends_at?: string | null;
          settings?: Json | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          email?: string;
          phone?: string;
          address?: string | null;
          city?: string | null;
          state?: string | null;
          pincode?: string | null;
          logo_url?: string | null;
          status?: "active" | "inactive" | "pending";
          subscription_tier?: "free" | "basic" | "premium" | "enterprise";
          subscription_ends_at?: string | null;
          settings?: Json | null;
        };
      };
      customers: {
        Row: {
          id: string;
          created_at: string;
          client_id: string;
          first_name: string;
          last_name: string;
          email: string;
          phone: string;
          address: string | null;
          city: string | null;
          state: string | null;
          pincode: string | null;
          id_type: string | null;
          id_number: string | null;
          date_of_birth: string | null;
          occupation: string | null;
          monthly_income: number | null;
          employer: string | null;
          bank_name: string | null;
          account_number: string | null;
          ifsc_code: string | null;
          status: "active" | "inactive" | "blacklisted";
          profile_image_url: string | null;
          kyc_verified: boolean;
          notes: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          client_id: string;
          first_name: string;
          last_name: string;
          email: string;
          phone: string;
          address?: string | null;
          city?: string | null;
          state?: string | null;
          pincode?: string | null;
          id_type?: string | null;
          id_number?: string | null;
          date_of_birth?: string | null;
          occupation?: string | null;
          monthly_income?: number | null;
          employer?: string | null;
          bank_name?: string | null;
          account_number?: string | null;
          ifsc_code?: string | null;
          status?: "active" | "inactive" | "blacklisted";
          profile_image_url?: string | null;
          kyc_verified?: boolean;
          notes?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          client_id?: string;
          first_name?: string;
          last_name?: string;
          email?: string;
          phone?: string;
          address?: string | null;
          city?: string | null;
          state?: string | null;
          pincode?: string | null;
          id_type?: string | null;
          id_number?: string | null;
          date_of_birth?: string | null;
          occupation?: string | null;
          monthly_income?: number | null;
          employer?: string | null;
          bank_name?: string | null;
          account_number?: string | null;
          ifsc_code?: string | null;
          status?: "active" | "inactive" | "blacklisted";
          profile_image_url?: string | null;
          kyc_verified?: boolean;
          notes?: string | null;
        };
      };
      documents: {
        Row: {
          id: string;
          created_at: string;
          client_id: string;
          customer_id: string | null;
          loan_id: string | null;
          name: string;
          type: string;
          file_url: string;
          file_type: string;
          file_size: number;
          status: "pending" | "verified" | "rejected";
          verified_by: string | null;
          verified_at: string | null;
          notes: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          client_id: string;
          customer_id?: string | null;
          loan_id?: string | null;
          name: string;
          type: string;
          file_url: string;
          file_type: string;
          file_size: number;
          status?: "pending" | "verified" | "rejected";
          verified_by?: string | null;
          verified_at?: string | null;
          notes?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          client_id?: string;
          customer_id?: string | null;
          loan_id?: string | null;
          name?: string;
          type?: string;
          file_url?: string;
          file_type?: string;
          file_size?: number;
          status?: "pending" | "verified" | "rejected";
          verified_by?: string | null;
          verified_at?: string | null;
          notes?: string | null;
        };
      };
      gold_items: {
        Row: {
          id: string;
          created_at: string;
          client_id: string;
          loan_id: string;
          customer_id: string;
          type: string;
          description: string;
          weight_grams: number;
          purity: number;
          value: number;
          item_code: string;
          status: "in_custody" | "released" | "in_transit";
          location: string | null;
          image_url: string | null;
          notes: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          client_id: string;
          loan_id: string;
          customer_id: string;
          type: string;
          description: string;
          weight_grams: number;
          purity: number;
          value: number;
          item_code: string;
          status?: "in_custody" | "released" | "in_transit";
          location?: string | null;
          image_url?: string | null;
          notes?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          client_id?: string;
          loan_id?: string;
          customer_id?: string;
          type?: string;
          description?: string;
          weight_grams?: number;
          purity?: number;
          value?: number;
          item_code?: string;
          status?: "in_custody" | "released" | "in_transit";
          location?: string | null;
          image_url?: string | null;
          notes?: string | null;
        };
      };
      loans: {
        Row: {
          id: string;
          created_at: string;
          client_id: string;
          customer_id: string;
          loan_type: string;
          principal_amount: number;
          interest_rate: number;
          loan_term_months: number;
          emi_amount: number;
          disbursement_date: string | null;
          maturity_date: string | null;
          ltv_ratio: number;
          processing_fee: number;
          total_interest: number;
          total_repayment: number;
          collateral_value: number;
          repayment_frequency:
            | "monthly"
            | "quarterly"
            | "semi_annually"
            | "annually";
          status:
            | "pending"
            | "approved"
            | "rejected"
            | "active"
            | "closed"
            | "defaulted";
          assigned_to: string | null;
          approved_by: string | null;
          approved_at: string | null;
          notes: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          client_id: string;
          customer_id: string;
          loan_type: string;
          principal_amount: number;
          interest_rate: number;
          loan_term_months: number;
          emi_amount: number;
          disbursement_date?: string | null;
          maturity_date?: string | null;
          ltv_ratio: number;
          processing_fee: number;
          total_interest: number;
          total_repayment: number;
          collateral_value: number;
          repayment_frequency?:
            | "monthly"
            | "quarterly"
            | "semi_annually"
            | "annually";
          status?:
            | "pending"
            | "approved"
            | "rejected"
            | "active"
            | "closed"
            | "defaulted";
          assigned_to?: string | null;
          approved_by?: string | null;
          approved_at?: string | null;
          notes?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          client_id?: string;
          customer_id?: string;
          loan_type?: string;
          principal_amount?: number;
          interest_rate?: number;
          loan_term_months?: number;
          emi_amount?: number;
          disbursement_date?: string | null;
          maturity_date?: string | null;
          ltv_ratio?: number;
          processing_fee?: number;
          total_interest?: number;
          total_repayment?: number;
          collateral_value?: number;
          repayment_frequency?:
            | "monthly"
            | "quarterly"
            | "semi_annually"
            | "annually";
          status?:
            | "pending"
            | "approved"
            | "rejected"
            | "active"
            | "closed"
            | "defaulted";
          assigned_to?: string | null;
          approved_by?: string | null;
          approved_at?: string | null;
          notes?: string | null;
        };
      };
      payments: {
        Row: {
          id: string;
          created_at: string;
          client_id: string;
          loan_id: string;
          customer_id: string;
          amount: number;
          payment_date: string;
          payment_method: string;
          transaction_id: string | null;
          status: "pending" | "completed" | "failed";
          notes: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          client_id: string;
          loan_id: string;
          customer_id: string;
          amount: number;
          payment_date: string;
          payment_method: string;
          transaction_id?: string | null;
          status?: "pending" | "completed" | "failed";
          notes?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          client_id?: string;
          loan_id?: string;
          customer_id?: string;
          amount?: number;
          payment_date?: string;
          payment_method?: string;
          transaction_id?: string | null;
          status?: "pending" | "completed" | "failed";
          notes?: string | null;
        };
      };
      comments: {
        Row: {
          id: string;
          created_at: string;
          client_id: string;
          loan_id: string | null;
          customer_id: string | null;
          user_id: string;
          text: string;
          attachments: Json | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          client_id: string;
          loan_id?: string | null;
          customer_id?: string | null;
          user_id: string;
          text: string;
          attachments?: Json | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          client_id?: string;
          loan_id?: string | null;
          customer_id?: string | null;
          user_id?: string;
          text?: string;
          attachments?: Json | null;
        };
      };
      users: {
        Row: {
          id: string;
          created_at: string;
          client_id: string;
          email: string;
          first_name: string;
          last_name: string;
          role: "admin" | "manager" | "loan_officer" | "staff";
          avatar_url: string | null;
          status: "active" | "inactive";
          last_login: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          client_id: string;
          email: string;
          first_name: string;
          last_name: string;
          role?: "admin" | "manager" | "loan_officer" | "staff";
          avatar_url?: string | null;
          status?: "active" | "inactive";
          last_login?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          client_id?: string;
          email?: string;
          first_name?: string;
          last_name?: string;
          role?: "admin" | "manager" | "loan_officer" | "staff";
          avatar_url?: string | null;
          status?: "active" | "inactive";
          last_login?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
