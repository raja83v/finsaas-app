import { supabase } from "@/lib/supabase";
import { Database } from "@/types/supabase";

export type Customer = Database["public"]["Tables"]["customers"]["Row"];
export type CustomerInsert =
  Database["public"]["Tables"]["customers"]["Insert"];
export type CustomerUpdate =
  Database["public"]["Tables"]["customers"]["Update"];

export const getCustomers = async (clientId: string) => {
  try {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .eq("client_id", clientId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

export const getCustomerById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching customer with id ${id}:`, error);
    throw error;
  }
};

export const createCustomer = async (customer: CustomerInsert) => {
  try {
    const { data, error } = await supabase
      .from("customers")
      .insert(customer)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
};

export const updateCustomer = async (id: string, updates: CustomerUpdate) => {
  try {
    const { data, error } = await supabase
      .from("customers")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error updating customer with id ${id}:`, error);
    throw error;
  }
};

export const deleteCustomer = async (id: string) => {
  try {
    const { error } = await supabase.from("customers").delete().eq("id", id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error(`Error deleting customer with id ${id}:`, error);
    throw error;
  }
};

export const searchCustomers = async (clientId: string, query: string) => {
  try {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .eq("client_id", clientId)
      .or(
        `first_name.ilike.%${query}%,last_name.ilike.%${query}%,email.ilike.%${query}%,phone.ilike.%${query}%,id_number.ilike.%${query}%`,
      )
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error searching customers:", error);
    throw error;
  }
};

export const getCustomerDocuments = async (customerId: string) => {
  try {
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .eq("customer_id", customerId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(
      `Error fetching documents for customer ${customerId}:`,
      error,
    );
    throw error;
  }
};

export const getCustomerLoans = async (customerId: string) => {
  try {
    const { data, error } = await supabase
      .from("loans")
      .select("*")
      .eq("customer_id", customerId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching loans for customer ${customerId}:`, error);
    throw error;
  }
};

export const verifyCustomerKYC = async (
  customerId: string,
  verified: boolean,
) => {
  try {
    const { data, error } = await supabase
      .from("customers")
      .update({ kyc_verified: verified })
      .eq("id", customerId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(
      `Error updating KYC status for customer ${customerId}:`,
      error,
    );
    throw error;
  }
};
