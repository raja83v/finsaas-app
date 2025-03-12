import { supabase } from "@/lib/supabase";
import { Database } from "@/types/supabase";

export type Loan = Database["public"]["Tables"]["loans"]["Row"];
export type LoanInsert = Database["public"]["Tables"]["loans"]["Insert"];
export type LoanUpdate = Database["public"]["Tables"]["loans"]["Update"];

export type GoldItem = Database["public"]["Tables"]["gold_items"]["Row"];
export type GoldItemInsert =
  Database["public"]["Tables"]["gold_items"]["Insert"];

export const getLoans = async (clientId: string) => {
  try {
    const { data, error } = await supabase
      .from("loans")
      .select("*, customers(first_name, last_name)")
      .eq("client_id", clientId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching loans:", error);
    throw error;
  }
};

export const getLoanById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("loans")
      .select("*, customers(first_name, last_name)")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching loan with id ${id}:`, error);
    throw error;
  }
};

export const createLoan = async (
  loan: LoanInsert,
  goldItems: Omit<GoldItemInsert, "loan_id">[],
) => {
  // Start a transaction
  const { data, error } = await supabase.rpc("create_loan_with_items", {
    loan_data: loan,
    gold_items_data: goldItems.map((item) => ({
      ...item,
      status: "in_custody",
    })),
  });

  if (error) {
    console.error("Error creating loan with items:", error);
    throw error;
  }

  return data;
};

export const updateLoan = async (id: string, updates: LoanUpdate) => {
  try {
    const { data, error } = await supabase
      .from("loans")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error updating loan with id ${id}:`, error);
    throw error;
  }
};

export const approveLoan = async (id: string, approvedBy: string) => {
  try {
    const { data, error } = await supabase
      .from("loans")
      .update({
        status: "approved",
        approved_by: approvedBy,
        approved_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error approving loan with id ${id}:`, error);
    throw error;
  }
};

export const rejectLoan = async (id: string, notes: string) => {
  try {
    const { data, error } = await supabase
      .from("loans")
      .update({
        status: "rejected",
        notes,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error rejecting loan with id ${id}:`, error);
    throw error;
  }
};

export const disburseLoan = async (id: string, disbursementDate: string) => {
  try {
    // Calculate maturity date based on loan term
    const { data: loan } = await supabase
      .from("loans")
      .select("loan_term_months")
      .eq("id", id)
      .single();

    if (!loan) throw new Error("Loan not found");

    const maturityDate = new Date(disbursementDate);
    maturityDate.setMonth(maturityDate.getMonth() + loan.loan_term_months);

    const { data, error } = await supabase
      .from("loans")
      .update({
        status: "active",
        disbursement_date: disbursementDate,
        maturity_date: maturityDate.toISOString().split("T")[0],
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error disbursing loan with id ${id}:`, error);
    throw error;
  }
};

export const closeLoan = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("loans")
      .update({
        status: "closed",
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    // Release all gold items
    const { error: goldItemError } = await supabase
      .from("gold_items")
      .update({
        status: "released",
      })
      .eq("loan_id", id);

    if (goldItemError) throw goldItemError;

    return data;
  } catch (error) {
    console.error(`Error closing loan with id ${id}:`, error);
    throw error;
  }
};

export const getLoanGoldItems = async (loanId: string) => {
  try {
    const { data, error } = await supabase
      .from("gold_items")
      .select("*")
      .eq("loan_id", loanId);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching gold items for loan ${loanId}:`, error);
    throw error;
  }
};

export const getLoanDocuments = async (loanId: string) => {
  try {
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .eq("loan_id", loanId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching documents for loan ${loanId}:`, error);
    throw error;
  }
};

export const getLoanPayments = async (loanId: string) => {
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

export const getLoanComments = async (loanId: string) => {
  try {
    const { data, error } = await supabase
      .from("comments")
      .select("*, users(first_name, last_name, avatar_url)")
      .eq("loan_id", loanId)
      .order("created_at", { ascending: true });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching comments for loan ${loanId}:`, error);
    throw error;
  }
};

export const addLoanComment = async (
  comment: Database["public"]["Tables"]["comments"]["Insert"],
) => {
  try {
    const { data, error } = await supabase
      .from("comments")
      .insert(comment)
      .select("*, users(first_name, last_name, avatar_url)")
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

export const getPendingApprovals = async (clientId: string) => {
  try {
    const { data, error } = await supabase
      .from("loans")
      .select("*, customers(first_name, last_name)")
      .eq("client_id", clientId)
      .eq("status", "pending")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching pending approvals:", error);
    throw error;
  }
};
