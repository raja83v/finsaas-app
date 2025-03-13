export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      account_transactions: {
        Row: {
          account_id: string
          amount: number
          cheque_number: string | null
          created_at: string
          description: string
          id: string
          mode: string
          performed_by: string
          reference_number: string
          related_transaction_id: string | null
          remarks: string | null
          running_balance: number
          transaction_date: string
          transaction_status: string
          transaction_type: string
          updated_at: string
          value_date: string
        }
        Insert: {
          account_id: string
          amount: number
          cheque_number?: string | null
          created_at?: string
          description: string
          id?: string
          mode: string
          performed_by: string
          reference_number: string
          related_transaction_id?: string | null
          remarks?: string | null
          running_balance: number
          transaction_date?: string
          transaction_status: string
          transaction_type: string
          updated_at?: string
          value_date?: string
        }
        Update: {
          account_id?: string
          amount?: number
          cheque_number?: string | null
          created_at?: string
          description?: string
          id?: string
          mode?: string
          performed_by?: string
          reference_number?: string
          related_transaction_id?: string | null
          remarks?: string | null
          running_balance?: number
          transaction_date?: string
          transaction_status?: string
          transaction_type?: string
          updated_at?: string
          value_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "account_transactions_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "savings_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "account_transactions_related_transaction_id_fkey"
            columns: ["related_transaction_id"]
            isOneToOne: false
            referencedRelation: "account_transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          address: string | null
          city: string | null
          created_at: string | null
          email: string
          id: string
          logo_url: string | null
          name: string
          phone: string
          pincode: string | null
          settings: Json | null
          state: string | null
          status: string
          subscription_ends_at: string | null
          subscription_tier: string
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string | null
          email: string
          id?: string
          logo_url?: string | null
          name: string
          phone: string
          pincode?: string | null
          settings?: Json | null
          state?: string | null
          status: string
          subscription_ends_at?: string | null
          subscription_tier: string
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string | null
          email?: string
          id?: string
          logo_url?: string | null
          name?: string
          phone?: string
          pincode?: string | null
          settings?: Json | null
          state?: string | null
          status?: string
          subscription_ends_at?: string | null
          subscription_tier?: string
        }
        Relationships: []
      }
      customers: {
        Row: {
          address: string | null
          annual_income: number | null
          city: string | null
          created_at: string
          customer_type: string | null
          date_of_birth: string | null
          email: string | null
          first_name: string
          id: string
          id_number: string | null
          id_type: string | null
          institution_id: string
          kyc_verified: boolean | null
          last_name: string
          occupation: string | null
          phone: string | null
          pincode: string | null
          profile_image_url: string | null
          risk_category: string | null
          state: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          annual_income?: number | null
          city?: string | null
          created_at?: string
          customer_type?: string | null
          date_of_birth?: string | null
          email?: string | null
          first_name: string
          id?: string
          id_number?: string | null
          id_type?: string | null
          institution_id: string
          kyc_verified?: boolean | null
          last_name: string
          occupation?: string | null
          phone?: string | null
          pincode?: string | null
          profile_image_url?: string | null
          risk_category?: string | null
          state?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          annual_income?: number | null
          city?: string | null
          created_at?: string
          customer_type?: string | null
          date_of_birth?: string | null
          email?: string | null
          first_name?: string
          id?: string
          id_number?: string | null
          id_type?: string | null
          institution_id?: string
          kyc_verified?: boolean | null
          last_name?: string
          occupation?: string | null
          phone?: string | null
          pincode?: string | null
          profile_image_url?: string | null
          risk_category?: string | null
          state?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "customers_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      institutions: {
        Row: {
          address: string | null
          business_type: string | null
          city: string | null
          contact_person: string | null
          created_at: string | null
          email: string | null
          id: string
          logo_url: string | null
          name: string
          number_of_branches: number | null
          phone: string | null
          pincode: string | null
          registration_number: string | null
          state: string | null
          updated_at: string | null
          years_in_business: number | null
        }
        Insert: {
          address?: string | null
          business_type?: string | null
          city?: string | null
          contact_person?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          logo_url?: string | null
          name: string
          number_of_branches?: number | null
          phone?: string | null
          pincode?: string | null
          registration_number?: string | null
          state?: string | null
          updated_at?: string | null
          years_in_business?: number | null
        }
        Update: {
          address?: string | null
          business_type?: string | null
          city?: string | null
          contact_person?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          number_of_branches?: number | null
          phone?: string | null
          pincode?: string | null
          registration_number?: string | null
          state?: string | null
          updated_at?: string | null
          years_in_business?: number | null
        }
        Relationships: []
      }
      interest_calculations: {
        Row: {
          account_id: string
          calculated_amount: number
          calculation_date: string
          created_at: string
          daily_balance: number
          id: string
          interest_days: number
          interest_rate: number
          is_posted: boolean
          posted_date: string | null
          posted_transaction_id: string | null
          updated_at: string
        }
        Insert: {
          account_id: string
          calculated_amount: number
          calculation_date?: string
          created_at?: string
          daily_balance: number
          id?: string
          interest_days: number
          interest_rate: number
          is_posted?: boolean
          posted_date?: string | null
          posted_transaction_id?: string | null
          updated_at?: string
        }
        Update: {
          account_id?: string
          calculated_amount?: number
          calculation_date?: string
          created_at?: string
          daily_balance?: number
          id?: string
          interest_days?: number
          interest_rate?: number
          is_posted?: boolean
          posted_date?: string | null
          posted_transaction_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "interest_calculations_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "savings_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interest_calculations_posted_transaction_id_fkey"
            columns: ["posted_transaction_id"]
            isOneToOne: false
            referencedRelation: "account_transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          full_name: string | null
          has_completed_onboarding: boolean | null
          id: string
          institution_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          full_name?: string | null
          has_completed_onboarding?: boolean | null
          id: string
          institution_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          full_name?: string | null
          has_completed_onboarding?: boolean | null
          id?: string
          institution_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      savings_accounts: {
        Row: {
          account_number: string
          account_type: string
          alert_preferences: Json
          approval_status: string
          approved_by: string | null
          approved_date: string | null
          available_balance: number
          balance: number
          created_at: string
          customer_id: string
          id: string
          institution_id: string
          interest_calculation_method: string
          interest_posting_frequency: string
          interest_rate: number
          is_tax_applicable: boolean
          last_interest_calculated_date: string | null
          last_interest_posted_date: string | null
          nomination_details: Json | null
          opening_date: string
          statement_delivery_method: string
          statement_frequency: string
          status: string
          updated_at: string
        }
        Insert: {
          account_number: string
          account_type: string
          alert_preferences?: Json
          approval_status: string
          approved_by?: string | null
          approved_date?: string | null
          available_balance?: number
          balance?: number
          created_at?: string
          customer_id: string
          id?: string
          institution_id: string
          interest_calculation_method: string
          interest_posting_frequency: string
          interest_rate: number
          is_tax_applicable?: boolean
          last_interest_calculated_date?: string | null
          last_interest_posted_date?: string | null
          nomination_details?: Json | null
          opening_date?: string
          statement_delivery_method: string
          statement_frequency: string
          status: string
          updated_at?: string
        }
        Update: {
          account_number?: string
          account_type?: string
          alert_preferences?: Json
          approval_status?: string
          approved_by?: string | null
          approved_date?: string | null
          available_balance?: number
          balance?: number
          created_at?: string
          customer_id?: string
          id?: string
          institution_id?: string
          interest_calculation_method?: string
          interest_posting_frequency?: string
          interest_rate?: number
          is_tax_applicable?: boolean
          last_interest_calculated_date?: string | null
          last_interest_posted_date?: string | null
          nomination_details?: Json | null
          opening_date?: string
          statement_delivery_method?: string
          statement_frequency?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "savings_accounts_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "savings_accounts_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      standing_instructions: {
        Row: {
          account_id: string
          amount: number
          beneficiary_details: Json
          created_at: string
          end_date: string | null
          frequency: string
          id: string
          last_execution_date: string | null
          last_execution_status: string | null
          last_failure_reason: string | null
          next_execution_date: string
          si_type: string
          start_date: string
          status: string
          updated_at: string
        }
        Insert: {
          account_id: string
          amount: number
          beneficiary_details: Json
          created_at?: string
          end_date?: string | null
          frequency: string
          id?: string
          last_execution_date?: string | null
          last_execution_status?: string | null
          last_failure_reason?: string | null
          next_execution_date: string
          si_type: string
          start_date: string
          status: string
          updated_at?: string
        }
        Update: {
          account_id?: string
          amount?: number
          beneficiary_details?: Json
          created_at?: string
          end_date?: string | null
          frequency?: string
          id?: string
          last_execution_date?: string | null
          last_execution_status?: string | null
          last_failure_reason?: string | null
          next_execution_date?: string
          si_type?: string
          start_date?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "standing_instructions_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "savings_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_interest: {
        Args: {
          p_account_id: string
          p_calculation_date: string
        }
        Returns: Json
      }
      create_account_transaction: {
        Args: {
          transaction_data: Json
          new_balance: number
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
