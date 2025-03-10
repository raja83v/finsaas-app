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
  Users,
  Search,
  Filter,
  Plus,
  ArrowUpRight,
  UserPlus,
  FileText,
  MessageSquare,
  Star,
  StarOff,
} from "lucide-react";

export default function Customers() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Customer Management
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm">
            <UserPlus className="mr-2 h-4 w-4" />
            New Customer
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Customers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" /> +42
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Borrowers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
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
              Account Holders
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" /> +24
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              New Customers (MTD)
            </CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" /> +8.3%
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
            placeholder="Search by name, ID, phone, or email..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Customers</TabsTrigger>
          <TabsTrigger value="borrowers">Borrowers</TabsTrigger>
          <TabsTrigger value="account-holders">Account Holders</TabsTrigger>
          <TabsTrigger value="vip">VIP Customers</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="rounded-md border">
            <div className="p-4">
              <div className="grid grid-cols-7 font-medium">
                <div>Customer ID</div>
                <div>Name</div>
                <div>Contact</div>
                <div>Products</div>
                <div>KYC Status</div>
                <div>Segment</div>
                <div>Actions</div>
              </div>
            </div>
            <div className="divide-y">
              {[
                {
                  id: "CUS-10045678",
                  name: "Rahul Sharma",
                  contact: "+91 98765 43210",
                  products: "Gold Loan, Savings",
                  kycStatus: "Verified",
                  segment: "Premium",
                },
                {
                  id: "CUS-10045679",
                  name: "Priya Patel",
                  contact: "+91 87654 32109",
                  products: "Fixed Deposit",
                  kycStatus: "Verified",
                  segment: "Standard",
                },
                {
                  id: "CUS-10045680",
                  name: "Vikram Singh",
                  contact: "+91 76543 21098",
                  products: "Gold Loan, Recurring Deposit",
                  kycStatus: "Verified",
                  segment: "Premium",
                },
                {
                  id: "CUS-10045681",
                  name: "Ananya Desai",
                  contact: "+91 65432 10987",
                  products: "Savings",
                  kycStatus: "Pending",
                  segment: "Standard",
                },
                {
                  id: "CUS-10045682",
                  name: "Rajesh Kumar",
                  contact: "+91 54321 09876",
                  products: "Gold Loan, Fixed Deposit",
                  kycStatus: "Verified",
                  segment: "VIP",
                },
              ].map((customer, i) => (
                <div key={i} className="grid grid-cols-7 p-4 items-center">
                  <div className="font-medium">{customer.id}</div>
                  <div>{customer.name}</div>
                  <div>{customer.contact}</div>
                  <div>{customer.products}</div>
                  <div>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        customer.kycStatus === "Verified"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {customer.kycStatus}
                    </span>
                  </div>
                  <div>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        customer.segment === "VIP"
                          ? "bg-purple-100 text-purple-800"
                          : customer.segment === "Premium"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {customer.segment}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                    {customer.segment === "VIP" ? (
                      <Button variant="ghost" size="sm">
                        <StarOff className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button variant="ghost" size="sm">
                        <Star className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="vip" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>VIP Customers</CardTitle>
              <CardDescription>
                High-value customers requiring special attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "CUS-10045682",
                    name: "Rajesh Kumar",
                    products: "Gold Loan, Fixed Deposit",
                    totalValue: "₹350,000",
                    relationshipManager: "Amit Verma",
                  },
                  {
                    id: "CUS-10045690",
                    name: "Sunita Agarwal",
                    products: "Gold Loan, Recurring Deposit, Savings",
                    totalValue: "₹425,000",
                    relationshipManager: "Priya Singh",
                  },
                  {
                    id: "CUS-10045695",
                    name: "Mohan Lal",
                    products: "Gold Loan, Fixed Deposit",
                    totalValue: "₹380,000",
                    relationshipManager: "Amit Verma",
                  },
                ].map((customer, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {customer.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {customer.id} - {customer.products}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {customer.totalValue}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        RM: {customer.relationshipManager}
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
