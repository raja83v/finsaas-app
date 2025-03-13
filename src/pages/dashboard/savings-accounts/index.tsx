import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Lock,
  Unlock,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  PiggyBank,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import { useClient } from "@/hooks/useClient";
import { getSavingsAccounts } from "@/api/accounts";

export default function SavingsAccounts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { client } = useClient();

  useEffect(() => {
    const loadAccounts = async () => {
      if (client?.id) {
        try {
          setLoading(true);
          const accountsData = await getSavingsAccounts(client.id);
          setAccounts(accountsData);
        } catch (error) {
          console.error("Error loading accounts:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadAccounts();
  }, [client]);

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
        return <Badge variant="outline">{status}</Badge>;
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

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Savings Accounts</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm" asChild>
            <Link to="/dashboard/accounts/new">
              <Plus className="mr-2 h-4 w-4" />
              New Account
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Accounts
            </CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{accounts.length}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" /> +5
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Accounts
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {accounts.filter((a) => a.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" /> +3
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(
                accounts.reduce(
                  (sum, account) => sum + (account.current_balance || 0),
                  0,
                ),
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" /> +8.2%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Dormant Accounts
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {accounts.filter((a) => a.status === "dormant").length}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 inline-flex items-center">
                <ArrowDownRight className="h-3 w-3 mr-1" /> -2
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex w-full items-center space-x-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by account number, customer name..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Accounts</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="dormant">Dormant</TabsTrigger>
          <TabsTrigger value="frozen">Frozen</TabsTrigger>
          <TabsTrigger value="closed">Closed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="rounded-md border">
            <div className="p-4 bg-muted/50">
              <div className="grid grid-cols-7 font-medium">
                <div>Account Number</div>
                <div>Customer</div>
                <div>Account Type</div>
                <div>Balance</div>
                <div>Opening Date</div>
                <div>Status</div>
                <div>Actions</div>
              </div>
            </div>
            <div className="divide-y">
              {loading ? (
                <div className="p-4 text-center">Loading accounts...</div>
              ) : accounts.length > 0 ? (
                accounts.map((account, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-7 p-4 items-center hover:bg-muted/50"
                  >
                    <div className="font-medium">{account.account_number}</div>
                    <div>
                      {account.customers?.first_name}{" "}
                      {account.customers?.last_name}
                    </div>
                    <div>
                      {account.account_types?.name || account.account_type}
                    </div>
                    <div>{formatCurrency(account.current_balance || 0)}</div>
                    <div>{formatDate(account.opening_date)}</div>
                    <div>{getStatusBadge(account.status)}</div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/dashboard/accounts/${account.id}`}>
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Link>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" /> Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" /> Generate
                            Statement
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {account.status === "active" ? (
                            <DropdownMenuItem>
                              <Lock className="h-4 w-4 mr-2" /> Freeze Account
                            </DropdownMenuItem>
                          ) : account.status === "frozen" ? (
                            <DropdownMenuItem>
                              <Unlock className="h-4 w-4 mr-2" /> Unfreeze
                              Account
                            </DropdownMenuItem>
                          ) : null}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  No accounts found. Create a new account to get started.
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Other tab contents would be similar but with filtered data */}
        <TabsContent value="active" className="space-y-4">
          {/* Similar content but filtered for active accounts */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
