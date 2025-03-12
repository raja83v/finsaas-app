import { supabase } from "@/lib/supabase";
import { Database } from "@/types/supabase";

export type Payment = Database["public"]["Tables"]["payments"]["Row"];
export type PaymentInsert = Database["public"]["Tables"]["payments"]["Insert"];

export const getPayments = async (clientId: string) => {
  try {
    const { data, error } = await supabase
      .from("payments")
      .select("*, loans(loan_type), customers(first_name, last_name)")
      .eq("client_id", clientId)
      .order("payment_date", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw error;
  }
};

export const getPaymentById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("payments")
      .select("*, loans(loan_type), customers(first_name, last_name)")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching payment with id ${id}:`, error);
    throw error;
  }
};

export const createPayment = async (payment: PaymentInsert) => {
  try {
    const { data, error } = await supabase
      .from("payments")
      .insert(payment)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
};

export const updatePaymentStatus = async (
  id: string,
  status: "pending" | "completed" | "failed",
  notes?: string,
) => {
  try {
    const { data, error } = await supabase
      .from("payments")
      .update({
        status,
        notes: notes || null,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error updating payment status for ${id}:`, error);
    throw error;
  }
};

export const getPaymentsByDateRange = async (
  clientId: string,
  startDate: string,
  endDate: string,
) => {
  try {
    const { data, error } = await supabase
      .from("payments")
      .select("*, loans(loan_type), customers(first_name, last_name)")
      .eq("client_id", clientId)
      .gte("payment_date", startDate)
      .lte("payment_date", endDate)
      .order("payment_date", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching payments by date range:", error);
    throw error;
  }
};

export const getPaymentsByCustomer = async (customerId: string) => {
  try {
    const { data, error } = await supabase
      .from("payments")
      .select("*, loans(loan_type)")
      .eq("customer_id", customerId)
      .order("payment_date", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching payments for customer ${customerId}:`, error);
    throw error;
  }
};

export const getPaymentsByLoan = async (loanId: string) => {
  try {
    const { data, error } = await supabase
      .from("payments")
      .select("*")
      .eq("loan_id", loanId)
      .order("payment_date", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching payments for loan ${loanId}:`, error);
    throw error;
  }
};
