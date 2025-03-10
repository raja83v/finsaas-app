import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  PiggyBank,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Plus,
  Download,
} from "lucide-react";

export default function SavingsAccounts() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Savings Account Management
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Account
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
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" /> +12
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Deposits
            </CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹8,542,650</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" /> +5.2%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              New Accounts (MTD)
            </CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 inline-flex items-center">
                <ArrowDownRight className="h-3 w-3 mr-1" /> -8%
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
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center">
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
            placeholder="Search by account number, customer name, or phone..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Accounts</TabsTrigger>
          <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
          <TabsTrigger value="dormant">Dormant Accounts</TabsTrigger>
          <TabsTrigger value="interest">Interest Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="rounded-md border">
            <div className="p-4">
              <div className="grid grid-cols-7 font-medium">
                <div>Account Number</div>
                <div>Customer</div>
                <div>Account Type</div>
                <div>Balance</div>
                <div>Interest Rate</div>
                <div>Open Date</div>
                <div>Actions</div>
              </div>
            </div>
            <div className="divide-y">
              {[
                {
                  number: "SA-10045678",
                  customer: "Rahul Sharma",
                  type: "Regular Savings",
                  balance: "₹45,250",
                  rate: "4.5%",
                  date: "2022-01-15",
                },
                {
                  number: "SA-10045679",
                  customer: "Priya Patel",
                  type: "Fixed Deposit",
                  balance: "₹125,000",
                  rate: "6.5%",
                  date: "2022-02-20",
                },
                {
                  number: "SA-10045680",
                  customer: "Vikram Singh",
                  type: "Recurring Deposit",
                  balance: "₹78,500",
                  rate: "5.75%",
                  date: "2022-03-10",
                },
                {
                  number: "SA-10045681",
                  customer: "Ananya Desai",
                  type: "Regular Savings",
                  balance: "₹32,750",
                  rate: "4.5%",
                  date: "2022-04-05",
                },
                {
                  number: "SA-10045682",
                  customer: "Rajesh Kumar",
                  type: "Fixed Deposit",
                  balance: "₹200,000",
                  rate: "6.75%",
                  date: "2022-05-12",
                },
              ].map((account, i) => (
                <div key={i} className="grid grid-cols-7 p-4 items-center">
                  <div className="font-medium">{account.number}</div>
                  <div>{account.customer}</div>
                  <div>{account.type}</div>
                  <div>{account.balance}</div>
                  <div>{account.rate}</div>
                  <div>{account.date}</div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                    <Button variant="ghost" size="sm">
                      Transact
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>
                Latest account activity across all accounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    account: "SA-10045678",
                    customer: "Rahul Sharma",
                    type: "Deposit",
                    amount: "₹15,000",
                    date: "Today, 10:24 AM",
                  },
                  {
                    account: "SA-10045679",
                    customer: "Priya Patel",
                    type: "Withdrawal",
                    amount: "₹5,000",
                    date: "Today, 09:15 AM",
                  },
                  {
                    account: "SA-10045680",
                    customer: "Vikram Singh",
                    type: "Interest Credit",
                    amount: "₹375",
                    date: "Yesterday, 11:30 PM",
                  },
                  {
                    account: "SA-10045681",
                    customer: "Ananya Desai",
                    type: "Deposit",
                    amount: "₹8,500",
                    date: "Yesterday, 03:45 PM",
                  },
                  {
                    account: "SA-10045682",
                    customer: "Rajesh Kumar",
                    type: "Transfer Out",
                    amount: "₹12,000",
                    date: "Jun 14, 2023, 02:20 PM",
                  },
                ].map((transaction, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {transaction.customer}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.account} - {transaction.type}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-sm font-medium ${transaction.type === "Withdrawal" || transaction.type === "Transfer Out" ? "text-red-500" : "text-green-500"}`}
                      >
                        {transaction.type === "Withdrawal" ||
                        transaction.type === "Transfer Out"
                          ? "-"
                          : "+"}
                        {transaction.amount}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {transaction.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dormant" className="space-y-4">
          <div className="rounded-md border">
            <div className="p-4">
              <div className="grid grid-cols-7 font-medium">
                <div>Account Number</div>
                <div>Customer</div>
                <div>Account Type</div>
                <div>Balance</div>
                <div>Last Activity</div>
                <div>Dormant Since</div>
                <div>Actions</div>
              </div>
            </div>
            <div className="divide-y">
              {[
                {
                  number: "SA-10042578",
                  customer: "Mohan Lal",
                  type: "Regular Savings",
                  balance: "₹2,250",
                  lastActivity: "2022-01-15",
                  dormantSince: "2022-07-15",
                },
                {
                  number: "SA-10042985",
                  customer: "Sita Devi",
                  type: "Regular Savings",
                  balance: "₹1,540",
                  lastActivity: "2022-02-20",
                  dormantSince: "2022-08-20",
                },
                {
                  number: "SA-10043102",
                  customer: "Ramesh Joshi",
                  type: "Regular Savings",
                  balance: "₹850",
                  lastActivity: "2022-03-10",
                  dormantSince: "2022-09-10",
                },
              ].map((account, i) => (
                <div key={i} className="grid grid-cols-7 p-4 items-center">
                  <div className="font-medium">{account.number}</div>
                  <div>{account.customer}</div>
                  <div>{account.type}</div>
                  <div>{account.balance}</div>
                  <div>{account.lastActivity}</div>
                  <div>{account.dormantSince}</div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                    <Button variant="ghost" size="sm">
                      Reactivate
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="interest" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Interest Payments</CardTitle>
              <CardDescription>
                Upcoming and recent interest payments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    account: "SA-10045679",
                    customer: "Priya Patel",
                    type: "Fixed Deposit",
                    amount: "₹2,031",
                    date: "Jun 20, 2023",
                    status: "Upcoming",
                  },
                  {
                    account: "SA-10045682",
                    customer: "Rajesh Kumar",
                    type: "Fixed Deposit",
                    amount: "₹3,375",
                    date: "Jun 25, 2023",
                    status: "Upcoming",
                  },
                  {
                    account: "SA-10045680",
                    customer: "Vikram Singh",
                    type: "Recurring Deposit",
                    amount: "₹375",
                    date: "Jun 14, 2023",
                    status: "Paid",
                  },
                  {
                    account: "SA-10045678",
                    customer: "Rahul Sharma",
                    type: "Regular Savings",
                    amount: "₹508",
                    date: "Jun 10, 2023",
                    status: "Paid",
                  },
                  {
                    account: "SA-10045681",
                    customer: "Ananya Desai",
                    type: "Regular Savings",
                    amount: "₹368",
                    date: "Jun 05, 2023",
                    status: "Paid",
                  },
                ].map((interest, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {interest.customer}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {interest.account} - {interest.type}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{interest.amount}</p>
                      <div className="flex items-center justify-end space-x-1">
                        <p className="text-xs text-muted-foreground">
                          {interest.date}
                        </p>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                            interest.status === "Upcoming"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {interest.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
