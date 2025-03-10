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
  BarChart3,
  Search,
  Filter,
  Download,
  Calendar,
  Clock,
  FileText,
  BarChart,
  PieChart,
  LineChart,
  Plus,
  Mail,
} from "lucide-react";

export default function Reports() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReportType, setSelectedReportType] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("month");

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Reports & Analytics
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Available Reports
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              Across all categories
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Scheduled Reports
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Auto-generated & delivered
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Recent Exports
            </CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">In the last 30 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex w-full items-center space-x-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search reports..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          value={selectedReportType}
          onValueChange={setSelectedReportType}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Report Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="loan">Loan Reports</SelectItem>
            <SelectItem value="account">Account Reports</SelectItem>
            <SelectItem value="customer">Customer Reports</SelectItem>
            <SelectItem value="performance">Performance Reports</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Daily</SelectItem>
            <SelectItem value="week">Weekly</SelectItem>
            <SelectItem value="month">Monthly</SelectItem>
            <SelectItem value="quarter">Quarterly</SelectItem>
            <SelectItem value="year">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">Report Templates</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="recent">Recent Exports</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Loan Portfolio Summary",
                description:
                  "Overview of all active loans, amounts, and statuses",
                type: "Loan Report",
                icon: <BarChart className="h-10 w-10 text-primary/20" />,
              },
              {
                title: "Account Balance Distribution",
                description:
                  "Distribution of savings accounts by balance ranges",
                type: "Account Report",
                icon: <PieChart className="h-10 w-10 text-primary/20" />,
              },
              {
                title: "Customer Acquisition Trend",
                description:
                  "New customer sign-ups over time with source analysis",
                type: "Customer Report",
                icon: <LineChart className="h-10 w-10 text-primary/20" />,
              },
              {
                title: "Loan Repayment Performance",
                description: "Analysis of on-time vs. delayed loan repayments",
                type: "Performance Report",
                icon: <BarChart3 className="h-10 w-10 text-primary/20" />,
              },
              {
                title: "Interest Income Report",
                description:
                  "Breakdown of interest earned from different loan products",
                type: "Financial Report",
                icon: <LineChart className="h-10 w-10 text-primary/20" />,
              },
              {
                title: "Customer Segment Analysis",
                description:
                  "Distribution of customers across different segments",
                type: "Customer Report",
                icon: <PieChart className="h-10 w-10 text-primary/20" />,
              },
            ].map((report, i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{report.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {report.description}
                      </CardDescription>
                    </div>
                    <div className="mt-1">{report.icon}</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-xs text-muted-foreground mb-4">
                    <span className="inline-flex items-center rounded-full bg-muted px-2 py-1 font-medium mr-2">
                      {report.type}
                    </span>
                    <span>Last updated: Today</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">
                      Generate
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-1" /> Export
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>
                Reports that are automatically generated and delivered
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Weekly Loan Disbursement Summary",
                    schedule: "Every Monday at 9:00 AM",
                    recipients: "finance@example.com, ceo@example.com",
                    format: "PDF, Excel",
                    lastRun: "Jun 12, 2023",
                  },
                  {
                    title: "Monthly Performance Dashboard",
                    schedule: "1st of every month at 8:00 AM",
                    recipients: "management@example.com",
                    format: "PDF, Excel, CSV",
                    lastRun: "Jun 01, 2023",
                  },
                  {
                    title: "Daily New Accounts Report",
                    schedule: "Every day at 5:00 PM",
                    recipients: "accounts@example.com",
                    format: "Excel",
                    lastRun: "Today",
                  },
                  {
                    title: "Overdue Loans Alert",
                    schedule: "Every day at 10:00 AM",
                    recipients: "collections@example.com",
                    format: "PDF, Excel",
                    lastRun: "Today",
                  },
                ].map((report, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{report.title}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{report.schedule}</span>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Mail className="h-3 w-3 mr-1" />
                        <span>{report.recipients}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{report.format}</p>
                      <p className="text-xs text-muted-foreground">
                        Last run: {report.lastRun}
                      </p>
                      <div className="flex justify-end mt-2 space-x-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          Run Now
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Exports</CardTitle>
              <CardDescription>
                Reports generated in the last 30 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Loan Portfolio Summary",
                    generatedBy: "John Doe",
                    date: "Today, 10:24 AM",
                    format: "PDF",
                    size: "1.2 MB",
                  },
                  {
                    title: "Customer Acquisition Report",
                    generatedBy: "Jane Smith",
                    date: "Yesterday, 3:45 PM",
                    format: "Excel",
                    size: "3.5 MB",
                  },
                  {
                    title: "Monthly Performance Dashboard",
                    generatedBy: "System",
                    date: "Jun 01, 2023, 8:00 AM",
                    format: "PDF",
                    size: "2.8 MB",
                  },
                  {
                    title: "Account Balance Distribution",
                    generatedBy: "John Doe",
                    date: "May 28, 2023, 11:30 AM",
                    format: "Excel",
                    size: "1.7 MB",
                  },
                  {
                    title: "Overdue Loans Report",
                    generatedBy: "System",
                    date: "May 25, 2023, 10:00 AM",
                    format: "PDF",
                    size: "0.9 MB",
                  },
                ].map((report, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-primary/10 p-2">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{report.title}</p>
                        <p className="text-xs text-muted-foreground">
                          Generated by: {report.generatedBy} • {report.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="text-right mr-4">
                        <p className="text-sm font-medium">{report.format}</p>
                        <p className="text-xs text-muted-foreground">
                          {report.size}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
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
  );
}
