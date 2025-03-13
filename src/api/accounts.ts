import { supabase } from "@/lib/supabase";
import { Database } from "@/types/supabase";

export type SavingsAccount =
  Database["public"]["Tables"]["savings_accounts"]["Row"];
export type SavingsAccountInsert =
  Database["public"]["Tables"]["savings_accounts"]["Insert"];
export type SavingsAccountUpdate =
  Database["public"]["Tables"]["savings_accounts"]["Update"];

export type AccountType = Database["public"]["Tables"]["account_types"]["Row"];
export type AccountTypeInsert =
  Database["public"]["Tables"]["account_types"]["Insert"];

export type AccountTransaction =
  Database["public"]["Tables"]["account_transactions"]["Row"];
export type AccountTransactionInsert =
  Database["public"]["Tables"]["account_transactions"]["Insert"];

export type AccountApplication =
  Database["public"]["Tables"]["account_applications"]["Row"];
export type AccountApplicationInsert =
  Database["public"]["Tables"]["account_applications"]["Insert"];
export type AccountApplicationUpdate =
  Database["public"]["Tables"]["account_applications"]["Update"];

export type AccountNominee =
  Database["public"]["Tables"]["account_nominees"]["Row"];
export type AccountNomineeInsert =
  Database["public"]["Tables"]["account_nominees"]["Insert"];

export type StandingInstruction =
  Database["public"]["Tables"]["standing_instructions"]["Row"];
export type StandingInstructionInsert =
  Database["public"]["Tables"]["standing_instructions"]["Insert"];

// Account Types API
export const getAccountTypes = async (clientId: string) => {
  try {
    const { data, error } = await supabase
      .from("account_types")
      .select("*")
      .eq("client_id", clientId)
      .eq("status", "active")
      .order("name");

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching account types:", error);
    throw error;
  }
};

export const createAccountType = async (accountType: AccountTypeInsert) => {
  try {
    const { data, error } = await supabase
      .from("account_types")
      .insert(accountType)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating account type:", error);
    throw error;
  }
};

// Account Applications API
export const createAccountApplication = async (
  application: AccountApplicationInsert,
) => {
  try {
    const { data, error } = await supabase
      .from("account_applications")
      .insert(application)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating account application:", error);
    throw error;
  }
};

export const getAccountApplications = async (clientId: string) => {
  try {
    const { data, error } = await supabase
      .from("account_applications")
      .select("*, customers(first_name, last_name), account_types(name)")
      .eq("client_id", clientId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching account applications:", error);
    throw error;
  }
};

export const getAccountApplicationById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("account_applications")
      .select("*, customers(first_name, last_name), account_types(name)")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching account application with id ${id}:`, error);
    throw error;
  }
};

export const updateAccountApplication = async (
  id: string,
  updates: AccountApplicationUpdate,
) => {
  try {
    const { data, error } = await supabase
      .from("account_applications")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error updating account application with id ${id}:`, error);
    throw error;
  }
};

export const approveAccountApplication = async (id: string, userId: string) => {
  try {
    // Get the application details
    const { data: application, error: fetchError } = await supabase
      .from("account_applications")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError;
    if (!application) throw new Error("Application not found");

    // Generate account number (simple implementation - should be more sophisticated in production)
    const accountNumber = `SA${Date.now().toString().slice(-10)}`;

    // Create the savings account
    const { data: account, error: accountError } = await supabase
      .from("savings_accounts")
      .insert({
        account_number: accountNumber,
        client_id: application.client_id,
        customer_id: application.customer_id,
        account_type_id: application.account_type_id,
        current_balance: application.initial_deposit,
        available_balance: application.initial_deposit,
        interest_rate: 0, // This should come from the account type
        status: "active",
      })
      .select()
      .single();

    if (accountError) throw accountError;

    // Update the application status
    const { error: updateError } = await supabase
      .from("account_applications")
      .update({
        status: "approved",
        approved_by: userId,
        approved_date: new Date().toISOString(),
        account_id: account.id,
      })
      .eq("id", id);

    if (updateError) throw updateError;

    // If there's an initial deposit, create a transaction
    if (application.initial_deposit > 0) {
      const { error: transactionError } = await supabase
        .from("account_transactions")
        .insert({
          account_id: account.id,
          transaction_type: "deposit",
          amount: application.initial_deposit,
          running_balance: application.initial_deposit,
          description: "Initial deposit",
          transaction_method: "cash",
          performed_by: userId,
        });

      if (transactionError) throw transactionError;
    }

    return account;
  } catch (error) {
    console.error(`Error approving account application with id ${id}:`, error);
    throw error;
  }
};

export const rejectAccountApplication = async (
  id: string,
  rejectionReason: string,
) => {
  try {
    const { data, error } = await supabase
      .from("account_applications")
      .update({
        status: "rejected",
        rejection_reason: rejectionReason,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error rejecting account application with id ${id}:`, error);
    throw error;
  }
};

// Savings Accounts API
export const getSavingsAccounts = async (clientId: string) => {
  try {
    const { data, error } = await supabase
      .from("savings_accounts")
      .select("*, customers(first_name, last_name), account_types(name)")
      .eq("client_id", clientId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching savings accounts:", error);
    throw error;
  }
};

export const getCustomerAccounts = async (customerId: string) => {
  try {
    const { data, error } = await supabase
      .from("savings_accounts")
      .select("*, account_types(name)")
      .eq("customer_id", customerId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching accounts for customer ${customerId}:`, error);
    throw error;
  }
};

export const getSavingsAccountById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("savings_accounts")
      .select("*, customers(first_name, last_name), account_types(name)")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching savings account with id ${id}:`, error);
    throw error;
  }
};

export const getSavingsAccountByNumber = async (accountNumber: string) => {
  try {
    const { data, error } = await supabase
      .from("savings_accounts")
      .select("*, customers(first_name, last_name), account_types(name)")
      .eq("account_number", accountNumber)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(
      `Error fetching savings account with number ${accountNumber}:`,
      error,
    );
    throw error;
  }
};

export const updateSavingsAccount = async (
  id: string,
  updates: SavingsAccountUpdate,
) => {
  try {
    const { data, error } = await supabase
      .from("savings_accounts")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error updating savings account with id ${id}:`, error);
    throw error;
  }
};

export const freezeAccount = async (id: string, reason: string) => {
  try {
    const { data, error } = await supabase
      .from("savings_accounts")
      .update({
        status: "frozen",
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error freezing account with id ${id}:`, error);
    throw error;
  }
};

export const unfreezeAccount = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("savings_accounts")
      .update({
        status: "active",
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error unfreezing account with id ${id}:`, error);
    throw error;
  }
};

export const closeAccount = async (id: string, reason: string) => {
  try {
    const { data, error } = await supabase
      .from("savings_accounts")
      .update({
        status: "closed",
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error closing account with id ${id}:`, error);
    throw error;
  }
};

// Account Transactions API
export const getAccountTransactions = async (accountId: string) => {
  try {
    const { data, error } = await supabase
      .from("account_transactions")
      .select("*")
      .eq("account_id", accountId)
      .order("transaction_date", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(
      `Error fetching transactions for account ${accountId}:`,
      error,
    );
    throw error;
  }
};

export const createDeposit = async (
  accountId: string,
  amount: number,
  method: string,
  description: string,
  userId: string,
) => {
  try {
    // Get current account balance
    const { data: account, error: accountError } = await supabase
      .from("savings_accounts")
      .select("current_balance, available_balance")
      .eq("id", accountId)
      .single();

    if (accountError) throw accountError;
    if (!account) throw new Error("Account not found");

    const newBalance = account.current_balance + amount;
    const newAvailableBalance = account.available_balance + amount;

    // Create transaction
    const { data: transaction, error: transactionError } = await supabase
      .from("account_transactions")
      .insert({
        account_id: accountId,
        transaction_type: "deposit",
        amount,
        running_balance: newBalance,
        description,
        transaction_method: method,
        performed_by: userId,
        receipt_number: `RCP${Date.now().toString().slice(-8)}`,
      })
      .select()
      .single();

    if (transactionError) throw transactionError;

    // Update account balance
    const { error: updateError } = await supabase
      .from("savings_accounts")
      .update({
        current_balance: newBalance,
        available_balance: newAvailableBalance,
        last_transaction_date: new Date().toISOString(),
      })
      .eq("id", accountId);

    if (updateError) throw updateError;

    return transaction;
  } catch (error) {
    console.error(`Error creating deposit for account ${accountId}:`, error);
    throw error;
  }
};

export const createWithdrawal = async (
  accountId: string,
  amount: number,
  method: string,
  description: string,
  userId: string,
) => {
  try {
    // Get current account balance
    const { data: account, error: accountError } = await supabase
      .from("savings_accounts")
      .select("current_balance, available_balance, status")
      .eq("id", accountId)
      .single();

    if (accountError) throw accountError;
    if (!account) throw new Error("Account not found");

    // Check if account is active
    if (account.status !== "active") {
      throw new Error(
        `Cannot withdraw from account with status: ${account.status}`,
      );
    }

    // Check if sufficient balance
    if (account.available_balance < amount) {
      throw new Error("Insufficient available balance");
    }

    const newBalance = account.current_balance - amount;
    const newAvailableBalance = account.available_balance - amount;

    // Create transaction
    const { data: transaction, error: transactionError } = await supabase
      .from("account_transactions")
      .insert({
        account_id: accountId,
        transaction_type: "withdrawal",
        amount,
        running_balance: newBalance,
        description,
        transaction_method: method,
        performed_by: userId,
        receipt_number: `RCP${Date.now().toString().slice(-8)}`,
      })
      .select()
      .single();

    if (transactionError) throw transactionError;

    // Update account balance
    const { error: updateError } = await supabase
      .from("savings_accounts")
      .update({
        current_balance: newBalance,
        available_balance: newAvailableBalance,
        last_transaction_date: new Date().toISOString(),
      })
      .eq("id", accountId);

    if (updateError) throw updateError;

    return transaction;
  } catch (error) {
    console.error(`Error creating withdrawal for account ${accountId}:`, error);
    throw error;
  }
};

export const createTransfer = async (
  fromAccountId: string,
  toAccountId: string,
  amount: number,
  description: string,
  userId: string,
) => {
  try {
    // Get source account balance
    const { data: fromAccount, error: fromAccountError } = await supabase
      .from("savings_accounts")
      .select("current_balance, available_balance, status")
      .eq("id", fromAccountId)
      .single();

    if (fromAccountError) throw fromAccountError;
    if (!fromAccount) throw new Error("Source account not found");

    // Check if source account is active
    if (fromAccount.status !== "active") {
      throw new Error(
        `Cannot transfer from account with status: ${fromAccount.status}`,
      );
    }

    // Check if sufficient balance
    if (fromAccount.available_balance < amount) {
      throw new Error("Insufficient available balance");
    }

    // Get destination account
    const { data: toAccount, error: toAccountError } = await supabase
      .from("savings_accounts")
      .select("current_balance, available_balance, status")
      .eq("id", toAccountId)
      .single();

    if (toAccountError) throw toAccountError;
    if (!toAccount) throw new Error("Destination account not found");

    // Check if destination account is active
    if (toAccount.status !== "active") {
      throw new Error(
        `Cannot transfer to account with status: ${toAccount.status}`,
      );
    }

    // Calculate new balances
    const newFromBalance = fromAccount.current_balance - amount;
    const newFromAvailableBalance = fromAccount.available_balance - amount;
    const newToBalance = toAccount.current_balance + amount;
    const newToAvailableBalance = toAccount.available_balance + amount;

    // Create transfer out transaction
    const { data: outTransaction, error: outTransactionError } = await supabase
      .from("account_transactions")
      .insert({
        account_id: fromAccountId,
        transaction_type: "transfer_out",
        amount,
        running_balance: newFromBalance,
        description: `${description} (To: ${toAccountId})`,
        transaction_method: "transfer",
        performed_by: userId,
        reference_number: `TRF${Date.now().toString().slice(-8)}`,
      })
      .select()
      .single();

    if (outTransactionError) throw outTransactionError;

    // Create transfer in transaction
    const { data: inTransaction, error: inTransactionError } = await supabase
      .from("account_transactions")
      .insert({
        account_id: toAccountId,
        transaction_type: "transfer_in",
        amount,
        running_balance: newToBalance,
        description: `${description} (From: ${fromAccountId})`,
        transaction_method: "transfer",
        performed_by: userId,
        reference_number: outTransaction.reference_number,
      })
      .select()
      .single();

    if (inTransactionError) throw inTransactionError;

    // Update source account balance
    const { error: fromUpdateError } = await supabase
      .from("savings_accounts")
      .update({
        current_balance: newFromBalance,
        available_balance: newFromAvailableBalance,
        last_transaction_date: new Date().toISOString(),
      })
      .eq("id", fromAccountId);

    if (fromUpdateError) throw fromUpdateError;

    // Update destination account balance
    const { error: toUpdateError } = await supabase
      .from("savings_accounts")
      .update({
        current_balance: newToBalance,
        available_balance: newToAvailableBalance,
        last_transaction_date: new Date().toISOString(),
      })
      .eq("id", toAccountId);

    if (toUpdateError) throw toUpdateError;

    return { outTransaction, inTransaction };
  } catch (error) {
    console.error(
      `Error creating transfer from ${fromAccountId} to ${toAccountId}:`,
      error,
    );
    throw error;
  }
};

// Account Nominees API
export const getAccountNominees = async (accountId: string) => {
  try {
    const { data, error } = await supabase
      .from("account_nominees")
      .select("*")
      .eq("account_id", accountId);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching nominees for account ${accountId}:`, error);
    throw error;
  }
};

export const addAccountNominee = async (nominee: AccountNomineeInsert) => {
  try {
    const { data, error } = await supabase
      .from("account_nominees")
      .insert(nominee)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error adding account nominee:", error);
    throw error;
  }
};

// Standing Instructions API
export const getStandingInstructions = async (accountId: string) => {
  try {
    const { data, error } = await supabase
      .from("standing_instructions")
      .select("*")
      .eq("account_id", accountId)
      .order("next_execution_date");

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(
      `Error fetching standing instructions for account ${accountId}:`,
      error,
    );
    throw error;
  }
};

export const createStandingInstruction = async (
  instruction: StandingInstructionInsert,
) => {
  try {
    const { data, error } = await supabase
      .from("standing_instructions")
      .insert(instruction)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating standing instruction:", error);
    throw error;
  }
};

// Account Statements API
export const generateAccountStatement = async (
  accountId: string,
  startDate: string,
  endDate: string,
) => {
  try {
    // Get account details
    const { data: account, error: accountError } = await supabase
      .from("savings_accounts")
      .select("*, customers(first_name, last_name), account_types(name)")
      .eq("id", accountId)
      .single();

    if (accountError) throw accountError;
    if (!account) throw new Error("Account not found");

    // Get transactions for the period
    const { data: transactions, error: transactionsError } = await supabase
      .from("account_transactions")
      .select("*")
      .eq("account_id", accountId)
      .gte("transaction_date", startDate)
      .lte("transaction_date", endDate)
      .order("transaction_date");

    if (transactionsError) throw transactionsError;

    // Calculate statement metrics
    const openingBalance =
      transactions.length > 0
        ? transactions[0].running_balance -
          (transactions[0].transaction_type === "deposit" ||
          transactions[0].transaction_type === "transfer_in"
            ? transactions[0].amount
            : -transactions[0].amount)
        : account.current_balance;

    const closingBalance =
      transactions.length > 0
        ? transactions[transactions.length - 1].running_balance
        : account.current_balance;

    const totalDeposits = transactions
      .filter(
        (t) =>
          t.transaction_type === "deposit" ||
          t.transaction_type === "transfer_in" ||
          t.transaction_type === "interest_credit",
      )
      .reduce((sum, t) => sum + t.amount, 0);

    const totalWithdrawals = transactions
      .filter(
        (t) =>
          t.transaction_type === "withdrawal" ||
          t.transaction_type === "transfer_out" ||
          t.transaction_type === "fee_debit",
      )
      .reduce((sum, t) => sum + t.amount, 0);

    const interestEarned = transactions
      .filter((t) => t.transaction_type === "interest_credit")
      .reduce((sum, t) => sum + t.amount, 0);

    // Create statement record
    const { data: statement, error: statementError } = await supabase
      .from("account_statements")
      .insert({
        account_id: accountId,
        statement_date: new Date().toISOString().split("T")[0],
        start_date: startDate,
        end_date: endDate,
        opening_balance: openingBalance,
        closing_balance: closingBalance,
        total_deposits: totalDeposits,
        total_withdrawals: totalWithdrawals,
        interest_earned: interestEarned,
        delivery_status: "pending",
      })
      .select()
      .single();

    if (statementError) throw statementError;

    return {
      statement,
      account,
      transactions,
      summary: {
        openingBalance,
        closingBalance,
        totalDeposits,
        totalWithdrawals,
        interestEarned,
      },
    };
  } catch (error) {
    console.error(
      `Error generating statement for account ${accountId}:`,
      error,
    );
    throw error;
  }
};

export const getAccountStatements = async (accountId: string) => {
  try {
    const { data, error } = await supabase
      .from("account_statements")
      .select("*")
      .eq("account_id", accountId)
      .order("statement_date", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching statements for account ${accountId}:`, error);
    throw error;
  }
};
