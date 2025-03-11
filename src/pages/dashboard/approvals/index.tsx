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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  SlidersHorizontal,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MoreVertical,
  Bell,
  Eye,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Calendar,
  FileText,
  ChevronRight,
} from "lucide-react";

export default function ApprovalsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  // Keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Alt + A = Approve
    if (e.altKey && e.key === "a") {
      alert("Keyboard shortcut: Approve");
    }
    // Alt + R = Reject
    if (e.altKey && e.key === "r") {
      alert("Keyboard shortcut: Reject");
    }
    // Alt + N = Next item
    if (e.altKey && e.key === "n") {
      alert("Keyboard shortcut: Next item");
    }
    // Alt + P = Previous item
    if (e.altKey && e.key === "p") {
      alert("Keyboard shortcut: Previous item");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" /> Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            <CheckCircle2 className="h-3 w-3 mr-1" /> Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" /> Rejected
          </Badge>
        );
      case "needs_info":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            <AlertCircle className="h-3 w-3 mr-1" /> Needs Info
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            <Clock className="h-3 w-3 mr-1" /> Unknown
          </Badge>
        );
    }
  };

  return (
    <div
      className="flex-1 space-y-4 p-4 md:p-8 pt-6"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Approval Dashboard
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Bell className="mr-2 h-4 w-4" />
            <span className="relative flex h-2 w-2 mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            Notifications
          </Button>
          <Button size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Approvals
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">12 high priority</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Approved Today
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">+4 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Rejected Today
            </CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">-2 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Response Time
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2h</div>
            <p className="text-xs text-muted-foreground">
              -0.5h from last week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by ID, customer name, or type..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="needs_info">Needs Info</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="loan">Loan Applications</SelectItem>
                <SelectItem value="account">Account Opening</SelectItem>
                <SelectItem value="kyc">KYC Verification</SelectItem>
                <SelectItem value="disbursement">Disbursements</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="amount">Amount</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pending">
              Pending{" "}
              <Badge className="ml-2 bg-yellow-100 text-yellow-800">42</Badge>
            </TabsTrigger>
            <TabsTrigger value="approved">
              Approved{" "}
              <Badge className="ml-2 bg-green-100 text-green-800">156</Badge>
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected{" "}
              <Badge className="ml-2 bg-red-100 text-red-800">28</Badge>
            </TabsTrigger>
            <TabsTrigger value="needs_info">
              Needs Info{" "}
              <Badge className="ml-2 bg-blue-100 text-blue-800">15</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            <div className="rounded-md border">
              <div className="p-4 bg-muted/50">
                <div className="grid grid-cols-8 font-medium">
                  <div>ID</div>
                  <div>Type</div>
                  <div>Customer</div>
                  <div>Amount</div>
                  <div>Submitted</div>
                  <div>Status</div>
                  <div>Assigned To</div>
                  <div>Actions</div>
                </div>
              </div>
              <div className="divide-y">
                {[
                  {
                    id: "APP-10045678",
                    type: "Loan Application",
                    customer: "Rahul Sharma",
                    amount: "₹120,000",
                    submitted: "Today, 10:24 AM",
                    status: "pending",
                    assignedTo: "Amit Verma",
                    priority: "high",
                  },
                  {
                    id: "APP-10045679",
                    type: "KYC Verification",
                    customer: "Priya Patel",
                    amount: "-",
                    submitted: "Today, 09:15 AM",
                    status: "pending",
                    assignedTo: "Unassigned",
                    priority: "medium",
                  },
                  {
                    id: "APP-10045680",
                    type: "Disbursement",
                    customer: "Vikram Singh",
                    amount: "₹250,000",
                    submitted: "Yesterday, 4:30 PM",
                    status: "pending",
                    assignedTo: "Neha Gupta",
                    priority: "high",
                  },
                  {
                    id: "APP-10045681",
                    type: "Account Opening",
                    customer: "Ananya Desai",
                    amount: "₹5,000",
                    submitted: "Yesterday, 2:45 PM",
                    status: "pending",
                    assignedTo: "Unassigned",
                    priority: "low",
                  },
                  {
                    id: "APP-10045682",
                    type: "Loan Application",
                    customer: "Rajesh Kumar",
                    amount: "₹180,000",
                    submitted: "Yesterday, 11:20 AM",
                    status: "pending",
                    assignedTo: "Amit Verma",
                    priority: "medium",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-8 p-4 items-center hover:bg-muted/50"
                  >
                    <div className="font-medium">{item.id}</div>
                    <div>{item.type}</div>
                    <div>{item.customer}</div>
                    <div>{item.amount}</div>
                    <div>{item.submitted}</div>
                    <div>
                      {getStatusBadge(item.status)}
                      {item.priority === "high" && (
                        <Badge className="ml-2 bg-red-100 text-red-800">
                          High Priority
                        </Badge>
                      )}
                    </div>
                    <div>{item.assignedTo}</div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" asChild>
                        <a href={`/dashboard/approvals/${item.id}`}>
                          <Eye className="h-4 w-4 mr-1" /> View Details
                        </a>
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
                            <ThumbsUp className="h-4 w-4 mr-2" /> Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ThumbsDown className="h-4 w-4 mr-2" /> Reject
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageSquare className="h-4 w-4 mr-2" /> Request
                            Info
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Calendar className="h-4 w-4 mr-2" /> Schedule
                            Review
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="approved" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recently Approved Items</CardTitle>
                <CardDescription>
                  Items approved in the last 7 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "APP-10045670",
                      type: "Loan Application",
                      customer: "Mohan Lal",
                      amount: "₹150,000",
                      approvedDate: "Today, 11:30 AM",
                      approvedBy: "Neha Gupta",
                    },
                    {
                      id: "APP-10045665",
                      type: "Disbursement",
                      customer: "Sunita Agarwal",
                      amount: "₹200,000",
                      approvedDate: "Today, 09:45 AM",
                      approvedBy: "Amit Verma",
                    },
                    {
                      id: "APP-10045662",
                      type: "KYC Verification",
                      customer: "Kiran Shah",
                      amount: "-",
                      approvedDate: "Yesterday, 3:15 PM",
                      approvedBy: "Neha Gupta",
                    },
                    {
                      id: "APP-10045658",
                      type: "Account Opening",
                      customer: "Deepak Nair",
                      amount: "₹10,000",
                      approvedDate: "Yesterday, 1:20 PM",
                      approvedBy: "Amit Verma",
                    },
                    {
                      id: "APP-10045650",
                      type: "Loan Application",
                      customer: "Meera Joshi",
                      amount: "₹175,000",
                      approvedDate: "Jun 15, 2023, 10:30 AM",
                      approvedBy: "Neha Gupta",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center">
                        <div className="mr-4 rounded-full bg-green-100 p-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {item.type} - {item.customer}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.id} • {item.amount}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">{item.approvedDate}</p>
                        <p className="text-xs text-muted-foreground">
                          by {item.approvedBy}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-1"
                          asChild
                        >
                          <a href={`/dashboard/approvals/${item.id}`}>
                            <Eye className="h-3 w-3 mr-1" /> View
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="bg-muted/30 p-4 rounded-md">
        <h3 className="text-sm font-medium mb-2">Keyboard Shortcuts</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
          <div className="flex items-center">
            <kbd className="px-2 py-1 bg-muted rounded mr-2">Alt + A</kbd>
            <span>Approve</span>
          </div>
          <div className="flex items-center">
            <kbd className="px-2 py-1 bg-muted rounded mr-2">Alt + R</kbd>
            <span>Reject</span>
          </div>
          <div className="flex items-center">
            <kbd className="px-2 py-1 bg-muted rounded mr-2">Alt + N</kbd>
            <span>Next item</span>
          </div>
          <div className="flex items-center">
            <kbd className="px-2 py-1 bg-muted rounded mr-2">Alt + P</kbd>
            <span>Previous item</span>
          </div>
        </div>
      </div>
    </div>
  );
}
