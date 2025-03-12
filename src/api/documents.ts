import { supabase } from "@/lib/supabase";
import { Database } from "@/types/supabase";

export type Document = Database["public"]["Tables"]["documents"]["Row"];
export type DocumentInsert =
  Database["public"]["Tables"]["documents"]["Insert"];
export type DocumentUpdate =
  Database["public"]["Tables"]["documents"]["Update"];

export const uploadDocument = async (
  file: File,
  path: string,
  clientId: string,
  metadata: { customerId?: string; loanId?: string; documentType: string },
) => {
  try {
    // 1. Upload file to storage
    const fileName = `${Date.now()}_${file.name}`;
    const filePath = `${path}/${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("documents")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // 2. Get public URL
    const { data: urlData } = await supabase.storage
      .from("documents")
      .getPublicUrl(filePath);

    // 3. Create document record
    const documentData: DocumentInsert = {
      client_id: clientId,
      customer_id: metadata.customerId || null,
      loan_id: metadata.loanId || null,
      name: file.name,
      type: metadata.documentType,
      file_url: urlData.publicUrl,
      file_type: file.type,
      file_size: file.size,
      status: "pending",
    };

    const { data: document, error: documentError } = await supabase
      .from("documents")
      .insert(documentData)
      .select()
      .single();

    if (documentError) throw documentError;

    return document;
  } catch (error) {
    console.error("Error uploading document:", error);
    throw error;
  }
};

export const getDocuments = async (clientId: string) => {
  try {
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .eq("client_id", clientId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw error;
  }
};

export const getDocumentById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching document with id ${id}:`, error);
    throw error;
  }
};

export const verifyDocument = async (
  id: string,
  userId: string,
  verified: boolean,
  notes?: string,
) => {
  try {
    const { data, error } = await supabase
      .from("documents")
      .update({
        status: verified ? "verified" : "rejected",
        verified_by: userId,
        verified_at: new Date().toISOString(),
        notes: notes || null,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error verifying document with id ${id}:`, error);
    throw error;
  }
};

export const deleteDocument = async (id: string) => {
  try {
    // First get the document to get the file path
    const { data: document, error: fetchError } = await supabase
      .from("documents")
      .select("file_url")
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError;

    // Delete from storage if we have a URL
    if (document?.file_url) {
      const filePathMatch = document.file_url.match(/documents\/(.+)/);
      if (filePathMatch && filePathMatch[1]) {
        const { error: storageError } = await supabase.storage
          .from("documents")
          .remove([filePathMatch[1]]);

        if (storageError)
          console.error("Error removing file from storage:", storageError);
      }
    }

    // Delete the document record
    const { error: deleteError } = await supabase
      .from("documents")
      .delete()
      .eq("id", id);

    if (deleteError) throw deleteError;

    return true;
  } catch (error) {
    console.error(`Error deleting document with id ${id}:`, error);
    throw error;
  }
};
