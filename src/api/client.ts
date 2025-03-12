import { supabase } from "@/lib/supabase";
import { Database } from "@/types/supabase";

export type Client = Database["public"]["Tables"]["clients"]["Row"];
export type ClientUpdate = Database["public"]["Tables"]["clients"]["Update"];

export const getClientProfile = async (clientId: string) => {
  try {
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .eq("id", clientId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching client profile for ${clientId}:`, error);
    throw error;
  }
};

export const updateClientProfile = async (
  clientId: string,
  updates: ClientUpdate,
) => {
  try {
    const { data, error } = await supabase
      .from("clients")
      .update(updates)
      .eq("id", clientId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error updating client profile for ${clientId}:`, error);
    throw error;
  }
};

export const uploadClientLogo = async (clientId: string, file: File) => {
  try {
    // Upload logo to storage
    const fileName = `${clientId}_${Date.now()}_logo${file.name.substring(file.name.lastIndexOf("."))}`;
    const { error: uploadError } = await supabase.storage
      .from("logos")
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: urlData } = await supabase.storage
      .from("logos")
      .getPublicUrl(fileName);

    // Update client record with logo URL
    const { data, error: updateError } = await supabase
      .from("clients")
      .update({ logo_url: urlData.publicUrl })
      .eq("id", clientId)
      .select()
      .single();

    if (updateError) throw updateError;

    return data;
  } catch (error) {
    console.error(`Error uploading logo for client ${clientId}:`, error);
    throw error;
  }
};

export const getClientUsers = async (clientId: string) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("client_id", clientId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching users for client ${clientId}:`, error);
    throw error;
  }
};

export const createClientUser = async (
  user: Database["public"]["Tables"]["users"]["Insert"],
) => {
  try {
    // First create auth user
    const { data: authData, error: authError } =
      await supabase.auth.admin.createUser({
        email: user.email,
        password: Math.random().toString(36).slice(-8), // Generate random password
        email_confirm: true,
        user_metadata: {
          first_name: user.first_name,
          last_name: user.last_name,
          client_id: user.client_id,
          role: user.role,
        },
      });

    if (authError) throw authError;
    if (!authData.user) throw new Error("User creation failed");

    // Then create user record
    const { data, error } = await supabase
      .from("users")
      .insert({
        ...user,
        id: authData.user.id,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateClientUser = async (
  id: string,
  updates: Database["public"]["Tables"]["users"]["Update"],
) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error updating user with id ${id}:`, error);
    throw error;
  }
};

export const deleteClientUser = async (id: string) => {
  try {
    // First update user status to inactive
    const { error: updateError } = await supabase
      .from("users")
      .update({ status: "inactive" })
      .eq("id", id);

    if (updateError) throw updateError;

    // Then disable auth user
    const { error: authError } = await supabase.auth.admin.deleteUser(id);

    if (authError) throw authError;

    return true;
  } catch (error) {
    console.error(`Error deleting user with id ${id}:`, error);
    throw error;
  }
};

export const getDashboardStats = async (clientId: string) => {
  try {
    // Get counts of various entities
    const [customers, activeLoans, pendingLoans, totalCollateral] =
      await Promise.all([
        supabase
          .from("customers")
          .select("id", { count: "exact" })
          .eq("client_id", clientId),
        supabase
          .from("loans")
          .select("id", { count: "exact" })
          .eq("client_id", clientId)
          .eq("status", "active"),
        supabase
          .from("loans")
          .select("id", { count: "exact" })
          .eq("client_id", clientId)
          .eq("status", "pending"),
        supabase
          .from("gold_items")
          .select("value")
          .eq("client_id", clientId)
          .eq("status", "in_custody"),
      ]);

    // Calculate total collateral value
    const collateralValue =
      totalCollateral.data?.reduce((sum, item) => sum + (item.value || 0), 0) ||
      0;

    return {
      customerCount: customers.count || 0,
      activeLoanCount: activeLoans.count || 0,
      pendingLoanCount: pendingLoans.count || 0,
      collateralValue,
    };
  } catch (error) {
    console.error(
      `Error fetching dashboard stats for client ${clientId}:`,
      error,
    );
    throw error;
  }
};
