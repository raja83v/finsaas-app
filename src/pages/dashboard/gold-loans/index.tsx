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
  Coins,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  AlertTriangle,
} from "lucide-react";

export default function GoldLoans() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Gold Loan Management
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm" asChild>
            <a href="/dashboard/loans/apply">
              <Coins className="mr-2 h-4 w-4" />
              New Loan
            </a>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              New Applications
            </CardTitle>
            <div className="h-4 w-4 rounded-full bg-blue-500 text-blue-500"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" /> +8
              </span>{" "}
              from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Under Assessment
            </CardTitle>
            <div className="h-4 w-4 rounded-full bg-yellow-500 text-yellow-500"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 inline-flex items-center">
                <Clock className="h-3 w-3 mr-1" /> 3 overdue
              </span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Ready for Disbursement
            </CardTitle>
            <div className="h-4 w-4 rounded-full bg-green-500 text-green-500"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" /> +5
              </span>{" "}
              from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Overdue Payments
            </CardTitle>
            <div className="h-4 w-4 rounded-full bg-red-500 text-red-500"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 inline-flex items-center">
                <AlertTriangle className="h-3 w-3 mr-1" /> ₹245,000 at risk
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex w-full items-center space-x-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by customer name, loan ID, or phone number..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="pipeline" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pipeline">Loan Pipeline</TabsTrigger>
          <TabsTrigger value="active">Active Loans</TabsTrigger>
          <TabsTrigger value="repayments">Upcoming Repayments</TabsTrigger>
          <TabsTrigger value="closed">Closed Loans</TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline" className="space-y-4">
          <div className="rounded-md border">
            <div className="p-4">
              <div className="grid grid-cols-7 font-medium">
                <div>Loan ID</div>
                <div>Customer</div>
                <div>Amount</div>
                <div>Gold Weight</div>
                <div>Application Date</div>
                <div>Status</div>
                <div>Actions</div>
              </div>
            </div>
            <div className="divide-y">
              {[
                {
                  id: "GL-2023-1001",
                  customer: "Rahul Sharma",
                  amount: "₹120,000",
                  goldWeight: "25g",
                  date: "2023-06-15",
                  status: "Assessment",
                },
                {
                  id: "GL-2023-1002",
                  customer: "Priya Patel",
                  amount: "₹85,000",
                  goldWeight: "18g",
                  date: "2023-06-14",
                  status: "New Application",
                },
                {
                  id: "GL-2023-1003",
                  customer: "Vikram Singh",
                  amount: "₹250,000",
                  goldWeight: "52g",
                  date: "2023-06-13",
                  status: "Ready for Disbursement",
                },
                {
                  id: "GL-2023-1004",
                  customer: "Ananya Desai",
                  amount: "₹175,000",
                  goldWeight: "36g",
                  date: "2023-06-12",
                  status: "Assessment",
                },
                {
                  id: "GL-2023-1005",
                  customer: "Rajesh Kumar",
                  amount: "₹95,000",
                  goldWeight: "20g",
                  date: "2023-06-11",
                  status: "New Application",
                },
              ].map((loan, i) => (
                <div key={i} className="grid grid-cols-7 p-4 items-center">
                  <div className="font-medium">{loan.id}</div>
                  <div>{loan.customer}</div>
                  <div>{loan.amount}</div>
                  <div>{loan.goldWeight}</div>
                  <div>{loan.date}</div>
                  <div>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        loan.status === "New Application"
                          ? "bg-blue-100 text-blue-800"
                          : loan.status === "Assessment"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {loan.status}
                    </span>
                  </div>
                  <div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                    <Button variant="ghost" size="sm">
                      Process
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="rounded-md border">
            <div className="p-4">
              <div className="grid grid-cols-7 font-medium">
                <div>Loan ID</div>
                <div>Customer</div>
                <div>Principal</div>
                <div>Interest Rate</div>
                <div>Disbursement Date</div>
                <div>Next Payment</div>
                <div>Actions</div>
              </div>
            </div>
            <div className="divide-y">
              {[
                {
                  id: "GL-2023-0985",
                  customer: "Meera Joshi",
                  amount: "₹150,000",
                  rate: "12%",
                  date: "2023-05-20",
                  nextPayment: "2023-06-20",
                },
                {
                  id: "GL-2023-0972",
                  customer: "Arjun Reddy",
                  amount: "₹200,000",
                  rate: "11.5%",
                  date: "2023-05-15",
                  nextPayment: "2023-06-15",
                },
                {
                  id: "GL-2023-0968",
                  customer: "Sunita Verma",
                  amount: "₹75,000",
                  rate: "12.5%",
                  date: "2023-05-10",
                  nextPayment: "2023-06-10",
                },
                {
                  id: "GL-2023-0954",
                  customer: "Kiran Shah",
                  amount: "₹180,000",
                  rate: "11.75%",
                  date: "2023-05-05",
                  nextPayment: "2023-06-05",
                },
                {
                  id: "GL-2023-0942",
                  customer: "Deepak Nair",
                  amount: "₹125,000",
                  rate: "12%",
                  date: "2023-05-01",
                  nextPayment: "2023-06-01",
                },
              ].map((loan, i) => (
                <div key={i} className="grid grid-cols-7 p-4 items-center">
                  <div className="font-medium">{loan.id}</div>
                  <div>{loan.customer}</div>
                  <div>{loan.amount}</div>
                  <div>{loan.rate}</div>
                  <div>{loan.date}</div>
                  <div>{loan.nextPayment}</div>
                  <div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                    <Button variant="ghost" size="sm">
                      Collect
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="repayments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Repayments</CardTitle>
              <CardDescription>
                Scheduled repayments for the next 7 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "GL-2023-0942",
                    customer: "Deepak Nair",
                    amount: "₹4,250",
                    date: "Today",
                    status: "Due",
                  },
                  {
                    id: "GL-2023-0954",
                    customer: "Kiran Shah",
                    amount: "₹5,850",
                    date: "Tomorrow",
                    status: "Due",
                  },
                  {
                    id: "GL-2023-0968",
                    customer: "Sunita Verma",
                    amount: "₹2,600",
                    date: "Jun 10, 2023",
                    status: "Due",
                  },
                  {
                    id: "GL-2023-0972",
                    customer: "Arjun Reddy",
                    amount: "₹6,400",
                    date: "Jun 15, 2023",
                    status: "Due",
                  },
                  {
                    id: "GL-2023-0985",
                    customer: "Meera Joshi",
                    amount: "₹5,000",
                    date: "Jun 20, 2023",
                    status: "Due",
                  },
                ].map((payment, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {payment.customer}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {payment.id}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{payment.amount}</p>
                      <p className="text-xs text-muted-foreground">
                        {payment.date}
                      </p>
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
