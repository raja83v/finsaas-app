import { supabase } from "@/lib/supabase";

export type SignUpData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  companyName: string;
  phone: string;
};

export type SignInData = {
  email: string;
  password: string;
};

export const signUp = async (data: SignUpData) => {
  try {
    // 1. Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
        },
      },
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error("User creation failed");

    // 2. Create client record
    const { data: clientData, error: clientError } = await supabase
      .from("clients")
      .insert({
        id: authData.user.id,
        name: data.companyName,
        email: data.email,
        phone: data.phone,
        status: "active",
        subscription_tier: "free",
      })
      .select()
      .single();

    if (clientError) throw clientError;

    // 3. Create admin user for the client
    const { error: userError } = await supabase.from("users").insert({
      client_id: authData.user.id,
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      role: "admin",
      status: "active",
    });

    if (userError) throw userError;

    return { user: authData.user, client: clientData };
  } catch (error) {
    console.error("Error during sign up:", error);
    throw error;
  }
};

export const signIn = async ({ email, password }: SignInData) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Update last login time for the user
    if (data.user) {
      const { error: updateError } = await supabase
        .from("users")
        .update({ last_login: new Date().toISOString() })
        .eq("email", email);

      if (updateError) console.error("Error updating last login:", updateError);
    }

    return data;
  } catch (error) {
    console.error("Error during sign in:", error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error during sign out:", error);
    throw error;
  }
};

export const resetPassword = async (email: string) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error during password reset:", error);
    throw error;
  }
};

export const updatePassword = async (password: string) => {
  try {
    const { error } = await supabase.auth.updateUser({
      password,
    });
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

export const getCurrentSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  } catch (error) {
    console.error("Error getting current session:", error);
    return null;
  }
};
