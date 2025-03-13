import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Download,
  FileText,
  Lock,
  Printer,
  RefreshCw,
  Unlock,
  User,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  PlusCircle,
  MinusCircle,
  ArrowLeftRight,
  BarChart,
  UserPlus,
  Settings,
} from "lucide-react";
import {
  getSavingsAccountById,
  getAccountTransactions,
  getAccountNominees,
  getStandingInstructions,
  getAccountStatements,
  createDeposit,
  createWithdrawal,
  freezeAccount,
  unfreezeAccount,
  closeAccount,
  generateAccountStatement,
} from "@/api/accounts";
import { useAuth } from "@/hooks/useAuth";

export function AccountDetailView() {
  const { id } = useParams<{ id: string }>();
  const [account, setAccount] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [nominees, setNominees] = useState<any[]>([]);
  const [standingInstructions, setStandingInstructions] = useState<any[]>([]);
  const [statements, setStatements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // Transaction dialogs
  const [depositDialogOpen, setDepositDialogOpen] = useState(false);
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const [transferDialogOpen, setTransferDialogOpen] = useState(false);
  const [statementDialogOpen, setStatementDialogOpen] = useState(false);
  const [freezeDialogOpen, setFreezeDialogOpen] = useState(false);

  // Transaction form states
  const [depositAmount, setDepositAmount] = useState("");
  const [depositMethod, setDepositMethod] = useState("cash");
  const [depositDescription, setDepositDescription] = useState("");

  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [withdrawalMethod, setWithdrawalMethod] = useState("cash");
  const [withdrawalDescription, setWithdrawalDescription] = useState("");

  const [transferAmount, setTransferAmount] = useState("");
  const [transferToAccount, setTransferToAccount] = useState("");
  const [transferDescription, setTransferDescription] = useState("");

  const [statementStartDate, setStatementStartDate] = useState("");
  const [statementEndDate, setStatementEndDate] = useState("");

  const [freezeReason, setFreezeReason] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      loadAccountData();
    }
  }, [id]);

  const loadAccountData = async () => {
    setLoading(true);
    try {
      const accountData = await getSavingsAccountById(id!);
      setAccount(accountData);

      const transactionsData = await getAccountTransactions(id!);
      setTransactions(transactionsData);

      const nomineesData = await getAccountNominees(id!);
      setNominees(nomineesData);

      const standingInstructionsData = await getStandingInstructions(id!);
      setStandingInstructions(standingInstructionsData);

      const statementsData = await getAccountStatements(id!);
      setStatements(statementsData);
    } catch (error) {
      console.error("Error loading account data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeposit = async () => {
    if (!id || !user) return;

    setIsSubmitting(true);
    try {
      await createDeposit(
        id,
        parseFloat(depositAmount),
        depositMethod,
        depositDescription,
        user.id,
      );

      setDepositDialogOpen(false);
      loadAccountData(); // Refresh data

      // Reset form
      setDepositAmount("");
      setDepositMethod("cash");
      setDepositDescription("");

      alert("Deposit successful!");
    } catch (error) {
      console.error("Error making deposit:", error);
      alert(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWithdrawal = async () => {
    if (!id || !user) return;

    setIsSubmitting(true);
    try {
      await createWithdrawal(
        id,
        parseFloat(withdrawalAmount),
        withdrawalMethod,
        withdrawalDescription,
        user.id,
      );

      setWithdrawDialogOpen(false);
      loadAccountData(); // Refresh data

      // Reset form
      setWithdrawalAmount("");
      setWithdrawalMethod("cash");
      setWithdrawalDescription("");

      alert("Withdrawal successful!");
    } catch (error) {
      console.error("Error making withdrawal:", error);
      alert(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFreezeAccount = async () => {
    if (!id) return;

    setIsSubmitting(true);
    try {
      await freezeAccount(id, freezeReason);

      setFreezeDialogOpen(false);
      loadAccountData(); // Refresh data

      // Reset form
      setFreezeReason("");

      alert("Account frozen successfully!");
    } catch (error) {
      console.error("Error freezing account:", error);
      alert(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUnfreezeAccount = async () => {
    if (!id) return;

    setIsSubmitting(true);
    try {
      await unfreezeAccount(id);
      loadAccountData(); // Refresh data
      alert("Account unfrozen successfully!");
    } catch (error) {
      console.error("Error unfreezing account:", error);
      alert(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGenerateStatement = async () => {
    if (!id) return;

    setIsSubmitting(true);
    try {
      await generateAccountStatement(id, statementStartDate, statementEndDate);

      setStatementDialogOpen(false);
      loadAccountData(); // Refresh data

      // Reset form
      setStatementStartDate("");
      setStatementEndDate("");

      alert("Statement generated successfully!");
    } catch (error) {
      console.error("Error generating statement:", error);
      alert(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            <CheckCircle2 className="h-3 w-3 mr-1" /> Active
          </Badge>
        );
      case "frozen":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            <Lock className="h-3 w-3 mr-1" /> Frozen
          </Badge>
        );
      case "dormant":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" /> Dormant
          </Badge>
        );
      case "closed":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" /> Closed
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            <AlertTriangle className="h-3 w-3 mr-1" /> {status}
          </Badge>
        );
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-bold">Account not found</h2>
          <p className="text-muted-foreground">
            The requested account could not be found.
          </p>
          <Button className="mt-4" asChild>
            <a href="/dashboard/accounts">Back to Accounts</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center space-x-2 mb-4">
        <Button variant="outline" size="sm" asChild>
          <a href="/dashboard/accounts">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Accounts
          </a>
        </Button>
      </div>

      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Account {account.account_number}
          </h2>
          <div className="flex items-center space-x-2 mt-1">
            {getStatusBadge(account.status)}
            <span className="text-muted-foreground">
              Opened on {formatDate(account.opening_date)}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => loadAccountData()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center text-lg font-bold text-muted-foreground">
                  {account.customers?.first_name?.[0]}
                  {account.customers?.last_name?.[0]}
                </div>
                <div>
                  <h3 className="font-medium">
                    {account.customers?.first_name}{" "}
                    {account.customers?.last_name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Primary Account Holder
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Account Type
                  </span>
                  <span>{account.account_types?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Account Number
                  </span>
                  <span>{account.account_number}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span>{getStatusBadge(account.status)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Interest Rate
                  </span>
                  <span>{account.interest_rate}% p.a.</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Current Balance
                  </span>
                  <span className="font-bold">
                    {formatCurrency(account.current_balance)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Available Balance
                  </span>
                  <span>{formatCurrency(account.available_balance)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Last Transaction
                  </span>
                  <span>
                    {account.last_transaction_date
                      ? formatDate(account.last_transaction_date)
                      : "N/A"}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button variant="outline" className="w-full" asChild>
                <a href={`/dashboard/customers/${account.customer_id}`}>
                  <User className="h-4 w-4 mr-2" />
                  View Customer Profile
                </a>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Dialog
                open={depositDialogOpen}
                onOpenChange={setDepositDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Deposit Funds
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Deposit Funds</DialogTitle>
                    <DialogDescription>
                      Enter the details to make a deposit to this account.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="deposit-amount">Amount</Label>
                      <Input
                        id="deposit-amount"
                        type="number"
                        placeholder="0.00"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deposit-method">Method</Label>
                      <Select
                        value={depositMethod}
                        onValueChange={setDepositMethod}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="cheque">Cheque</SelectItem>
                          <SelectItem value="transfer">
                            Electronic Transfer
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deposit-description">
                        Description (Optional)
                      </Label>
                      <Textarea
                        id="deposit-description"
                        placeholder="Enter description"
                        value={depositDescription}
                        onChange={(e) => setDepositDescription(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setDepositDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleDeposit}
                      disabled={!depositAmount || isSubmitting}
                    >
                      {isSubmitting ? "Processing..." : "Deposit"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog
                open={withdrawDialogOpen}
                onOpenChange={setWithdrawDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <MinusCircle className="h-4 w-4 mr-2" />
                    Withdraw Funds
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Withdraw Funds</DialogTitle>
                    <DialogDescription>
                      Enter the details to withdraw funds from this account.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="withdrawal-amount">Amount</Label>
                      <Input
                        id="withdrawal-amount"
                        type="number"
                        placeholder="0.00"
                        value={withdrawalAmount}
                        onChange={(e) => setWithdrawalAmount(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="withdrawal-method">Method</Label>
                      <Select
                        value={withdrawalMethod}
                        onValueChange={setWithdrawalMethod}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="cheque">Cheque</SelectItem>
                          <SelectItem value="transfer">
                            Electronic Transfer
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="withdrawal-description">
                        Description (Optional)
                      </Label>
                      <Textarea
                        id="withdrawal-description"
                        placeholder="Enter description"
                        value={withdrawalDescription}
                        onChange={(e) =>
                          setWithdrawalDescription(e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setWithdrawDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleWithdrawal}
                      disabled={!withdrawalAmount || isSubmitting}
                    >
                      {isSubmitting ? "Processing..." : "Withdraw"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog
                open={transferDialogOpen}
                onOpenChange={setTransferDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <ArrowLeftRight className="h-4 w-4 mr-2" />
                    Transfer Funds
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Transfer Funds</DialogTitle>
                    <DialogDescription>
                      Transfer funds to another account.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="transfer-amount">Amount</Label>
                      <Input
                        id="transfer-amount"
                        type="number"
                        placeholder="0.00"
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="transfer-to-account">To Account</Label>
                      <Input
                        id="transfer-to-account"
                        placeholder="Enter account number"
                        value={transferToAccount}
                        onChange={(e) => setTransferToAccount(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="transfer-description">
                        Description (Optional)
                      </Label>
                      <Textarea
                        id="transfer-description"
                        placeholder="Enter description"
                        value={transferDescription}
                        onChange={(e) => setTransferDescription(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setTransferDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      disabled={
                        !transferAmount || !transferToAccount || isSubmitting
                      }
                    >
                      {isSubmitting ? "Processing..." : "Transfer"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog
                open={statementDialogOpen}
                onOpenChange={setStatementDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Statement
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Generate Account Statement</DialogTitle>
                    <DialogDescription>
                      Select a date range for the statement.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="statement-start-date">Start Date</Label>
                      <Input
                        id="statement-start-date"
                        type="date"
                        value={statementStartDate}
                        onChange={(e) => setStatementStartDate(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="statement-end-date">End Date</Label>
                      <Input
                        id="statement-end-date"
                        type="date"
                        value={statementEndDate}
                        onChange={(e) => setStatementEndDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setStatementDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleGenerateStatement}
                      disabled={
                        !statementStartDate || !statementEndDate || isSubmitting
                      }
                    >
                      {isSubmitting ? "Processing..." : "Generate"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button variant="outline" className="w-full justify-start">
                <BarChart className="h-4 w-4 mr-2" />
                View Analytics
              </Button>

              {account.status === "active" ? (
                <Dialog
                  open={freezeDialogOpen}
                  onOpenChange={setFreezeDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <Lock className="h-4 w-4 mr-2" />
                      Freeze Account
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Freeze Account</DialogTitle>
                      <DialogDescription>
                        This will temporarily freeze all transactions on this
                        account.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="freeze-reason">
                          Reason for Freezing
                        </Label>
                        <Textarea
                          id="freeze-reason"
                          placeholder="Enter reason"
                          value={freezeReason}
                          onChange={(e) => setFreezeReason(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setFreezeDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={handleFreezeAccount}
                        disabled={!freezeReason || isSubmitting}
                      >
                        {isSubmitting ? "Processing..." : "Freeze Account"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ) : account.status === "frozen" ? (
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={handleUnfreezeAccount}
                  disabled={isSubmitting}
                >
                  <Unlock className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Processing..." : "Unfreeze Account"}
                </Button>
              ) : null}

              <Button variant="outline" className="w-full justify-start">
                <Settings className="h-4 w-4 mr-2" />
                Account Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="nominees">Nominees</TabsTrigger>
              <TabsTrigger value="statements">Statements</TabsTrigger>
              <TabsTrigger value="standing-instructions">
                Standing Instructions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Account Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">
                          Balance Information
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">
                              Current Balance:
                            </span>
                            <span className="font-bold">
                              {formatCurrency(account.current_balance)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">
                              Available Balance:
                            </span>
                            <span>
                              {formatCurrency(account.available_balance)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">
                              Hold Amount:
                            </span>
                            <span>
                              {formatCurrency(
                                account.current_balance -
                                  account.available_balance,
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">
                          Interest Information
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">
                              Interest Rate:
                            </span>
                            <span>{account.interest_rate}% p.a.</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">
                              Interest Calculation:
                            </span>
                            <span>
                              {account.interest_calculation_method || "Daily"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">
                              Interest Posting:
                            </span>
                            <span>
                              {account.interest_posting_frequency || "Monthly"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">
                          Account Details
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">
                              Account Number:
                            </span>
                            <span>{account.account_number}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">
                              Account Type:
                            </span>
                            <span>{account.account_types?.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">
                              Opening Date:
                            </span>
                            <span>{formatDate(account.opening_date)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Status:</span>
                            <span>{getStatusBadge(account.status)}</span>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">
                          Statement Preferences
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">
                              Frequency:
                            </span>
                            <span>{account.statement_frequency}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">
                              Delivery Method:
                            </span>
                            <span>{account.statement_delivery_method}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  {transactions.length > 0 ? (
                    <div className="space-y-4">
                      {transactions.slice(0, 5).map((transaction, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center border-b pb-4 last:border-0 last:pb-0"
                        >
                          <div>
                            <p className="font-medium">
                              {transaction.transaction_type.replace("_", " ")}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {transaction.description}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(transaction.transaction_date)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p
                              className={`font-medium ${transaction.transaction_type === "withdrawal" || transaction.transaction_type === "transfer_out" ? "text-red-600" : "text-green-600"}`}
                            >
                              {transaction.transaction_type === "withdrawal" ||
                              transaction.transaction_type === "transfer_out"
                                ? "-"
                                : "+"}
                              {formatCurrency(transaction.amount)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Balance:{" "}
                              {formatCurrency(transaction.running_balance)}
                            </p>
                          </div>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setActiveTab("transactions")}
                      >
                        View All Transactions
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      No transactions found for this account.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transactions" className="space-y-4 mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle>Transaction History</CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {transactions.length > 0 ? (
                    <div className="rounded-md border">
                      <div className="p-4 bg-muted/50">
                        <div className="grid grid-cols-6 font-medium">
                          <div>Date</div>
                          <div>Type</div>
                          <div>Description</div>
                          <div>Reference</div>
                          <div className="text-right">Amount</div>
                          <div className="text-right">Balance</div>
                        </div>
                      </div>
                      <div className="divide-y">
                        {transactions.map((transaction, index) => (
                          <div
                            key={index}
                            className="grid grid-cols-6 p-4 items-center hover:bg-muted/50"
                          >
                            <div>
                              {formatDate(transaction.transaction_date)}
                            </div>
                            <div className="capitalize">
                              {transaction.transaction_type.replace("_", " ")}
                            </div>
                            <div
                              className="truncate max-w-[200px]"
                              title={transaction.description}
                            >
                              {transaction.description}
                            </div>
                            <div>{transaction.reference_number || "-"}</div>
                            <div
                              className={`text-right ${transaction.transaction_type === "withdrawal" || transaction.transaction_type === "transfer_out" ? "text-red-600" : "text-green-600"}`}
                            >
                              {transaction.transaction_type === "withdrawal" ||
                              transaction.transaction_type === "transfer_out"
                                ? "-"
                                : "+"}
                              {formatCurrency(transaction.amount)}
                            </div>
                            <div className="text-right">
                              {formatCurrency(transaction.running_balance)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      No transactions found for this account.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="nominees" className="space-y-4 mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle>Nominee Information</CardTitle>
                  <Button variant="outline" size="sm">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Nominee
                  </Button>
                </CardHeader>
                <CardContent>
                  {nominees.length > 0 ? (
                    <div className="space-y-4">
                      {nominees.map((nominee, index) => (
                        <div key={index} className="border rounded-md p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">
                                {nominee.first_name} {nominee.last_name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                Relationship: {nominee.relationship}
                              </p>
                            </div>
                            <Badge variant="outline">
                              {nominee.percentage}%
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Date of Birth
                              </p>
                              <p className="font-medium">
                                {nominee.date_of_birth
                                  ? formatDate(nominee.date_of_birth)
                                  : "N/A"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Contact
                              </p>
                              <p className="font-medium">
                                {nominee.phone || nominee.email || "N/A"}
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-end space-x-2 mt-4">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-1" /> Edit
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      No nominees found for this account.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="statements" className="space-y-4 mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle>Account Statements</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setStatementDialogOpen(true)}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Statement
                  </Button>
                </CardHeader>
                <CardContent>
                  {statements.length > 0 ? (
                    <div className="rounded-md border">
                      <div className="p-4 bg-muted/50">
                        <div className="grid grid-cols-6 font-medium">
                          <div>Statement Date</div>
                          <div>Period</div>
                          <div>Opening Balance</div>
                          <div>Closing Balance</div>
                          <div>Status</div>
                          <div>Actions</div>
                        </div>
                      </div>
                      <div className="divide-y">
                        {statements.map((statement, index) => (
                          <div
                            key={index}
                            className="grid grid-cols-6 p-4 items-center hover:bg-muted/50"
                          >
                            <div>{formatDate(statement.statement_date)}</div>
                            <div>
                              {formatDate(statement.start_date)} -{" "}
                              {formatDate(statement.end_date)}
                            </div>
                            <div>
                              {formatCurrency(statement.opening_balance)}
                            </div>
                            <div>
                              {formatCurrency(statement.closing_balance)}
                            </div>
                            <div>
                              <Badge
                                variant="outline"
                                className={
                                  statement.delivery_status === "delivered"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }
                              >
                                {statement.delivery_status}
                              </Badge>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Printer className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      No statements found for this account.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent
              value="standing-instructions"
              className="space-y-4 mt-4"
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle>Standing Instructions</CardTitle>
                  <Button variant="outline" size="sm">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    New Instruction
                  </Button>
                </CardHeader>
                <CardContent>
                  {standingInstructions.length > 0 ? (
                    <div className="rounded-md border">
                      <div className="p-4 bg-muted/50">
                        <div className="grid grid-cols-6 font-medium">
                          <div>Type</div>
                          <div>Amount</div>
                          <div>Frequency</div>
                          <div>Next Execution</div>
                          <div>Status</div>
                          <div>Actions</div>
                        </div>
                      </div>
                      <div className="divide-y">
                        {standingInstructions.map((instruction, index) => (
                          <div
                            key={index}
                            className="grid grid-cols-6 p-4 items-center hover:bg-muted/50"
                          >
                            <div className="capitalize">
                              {instruction.si_type.replace("_", " ")}
                            </div>
                            <div>{formatCurrency(instruction.amount)}</div>
                            <div className="capitalize">
                              {instruction.frequency}
                            </div>
                            <div>
                              {formatDate(instruction.next_execution_date)}
                            </div>
                            <div>
                              <Badge
                                variant="outline"
                                className={
                                  instruction.status === "active"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }
                              >
                                {instruction.status}
                              </Badge>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                {instruction.status === "active" ? (
                                  <Lock className="h-4 w-4" />
                                ) : (
                                  <Unlock className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      No standing instructions found for this account.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
