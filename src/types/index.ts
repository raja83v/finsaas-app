export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "manager" | "staff";
  institutionId: string;
}

export interface Institution {
  id: string;
  name: string;
  address: string;
  contactEmail: string;
  contactPhone: string;
  subscriptionTier: "basic" | "premium" | "enterprise";
  createdAt: string;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  idType: string;
  idNumber: string;
  createdAt: string;
  institutionId: string;
}

export interface GoldLoan {
  id: string;
  customerId: string;
  amount: number;
  interestRate: number;
  durationMonths: number;
  goldWeightGrams: number;
  goldPurity: number;
  status:
    | "application"
    | "assessment"
    | "approved"
    | "disbursed"
    | "repaying"
    | "closed"
    | "defaulted";
  applicationDate: string;
  approvalDate?: string;
  disbursementDate?: string;
  closureDate?: string;
  institutionId: string;
}

export interface SavingsAccount {
  id: string;
  customerId: string;
  accountNumber: string;
  balance: number;
  interestRate: number;
  accountType: "regular" | "fixed" | "recurring";
  status: "active" | "dormant" | "closed";
  openDate: string;
  closeDate?: string;
  institutionId: string;
}

export interface Transaction {
  id: string;
  accountId: string;
  amount: number;
  type:
    | "deposit"
    | "withdrawal"
    | "interest"
    | "fee"
    | "loan_disbursement"
    | "loan_repayment";
  description: string;
  date: string;
  performedBy: string;
  institutionId: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  isRead: boolean;
  createdAt: string;
  institutionId: string;
}

export interface Report {
  id: string;
  name: string;
  type: "loan" | "account" | "transaction" | "customer" | "performance";
  parameters: Record<string, any>;
  createdBy: string;
  createdAt: string;
  institutionId: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  relatedTo: "customer" | "loan" | "account";
  relatedId: string;
  fileUrl: string;
  uploadedBy: string;
  uploadedAt: string;
  institutionId: string;
}
