import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  CreditCard,
  DollarSign,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Coins,
  PiggyBank,
  Clock,
  AlertTriangle,
  FileText,
  BarChart,
  LineChart,
  Calendar,
  CheckCircle2,
  XCircle,
  ChevronRight,
} from "lucide-react";

export default function DashboardOverview() {
  const [timeRange, setTimeRange] = useState("monthly");

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Dashboard Overview
        </h2>
        <div className="flex items-center space-x-2">
          <Tabs
            value={timeRange}
            onValueChange={setTimeRange}
            className="w-[400px]"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Loans</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" /> +12.5%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Loan Amount
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹12,458,750</div>
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
              Active Accounts
            </CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" /> +4.3%
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
            <DollarSign className="h-4 w-4 text-muted-foreground" />
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
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Financial Performance</CardTitle>
              <CardDescription>
                Loan disbursements and collections over time
              </CardDescription>
            </div>
            <div>
              <Button variant="outline" size="sm" className="mr-2">
                <LineChart className="h-4 w-4 mr-2" />
                Line
              </Button>
              <Button variant="outline" size="sm">
                <BarChart className="h-4 w-4 mr-2" />
                Bar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              <BarChart3 className="h-16 w-16" />
              <span className="ml-2">Chart visualization will appear here</span>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Pending Actions</CardTitle>
            <CardDescription>
              Tasks requiring immediate attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-yellow-500/20 p-2">
                  <Clock className="h-4 w-4 text-yellow-500" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Loan Applications Pending Review
                  </p>
                  <p className="text-xs text-muted-foreground">
                    18 applications awaiting assessment
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-red-500/20 p-2">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Overdue Loan Payments
                  </p>
                  <p className="text-xs text-muted-foreground">
                    7 loans with overdue payments
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-green-500/20 p-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Ready for Disbursement
                  </p>
                  <p className="text-xs text-muted-foreground">
                    12 loans approved and ready for disbursement
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-blue-500/20 p-2">
                  <FileText className="h-4 w-4 text-blue-500" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Documents Pending Verification
                  </p>
                  <p className="text-xs text-muted-foreground">
                    15 customer documents need verification
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest transactions and activities across the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  type: "Loan Disbursement",
                  details: "To Rahul Sharma",
                  amount: "₹120,000",
                  time: "Today, 2:34 PM",
                  icon: <Coins className="h-4 w-4 text-primary" />,
                },
                {
                  type: "Loan Repayment",
                  details: "From Priya Patel",
                  amount: "₹15,750",
                  time: "Today, 11:20 AM",
                  icon: <Coins className="h-4 w-4 text-primary" />,
                },
                {
                  type: "Account Deposit",
                  details: "From Vikram Singh",
                  amount: "₹50,000",
                  time: "Today, 10:15 AM",
                  icon: <PiggyBank className="h-4 w-4 text-primary" />,
                },
                {
                  type: "New Loan Application",
                  details: "From Ananya Desai",
                  amount: "₹175,000",
                  time: "Yesterday, 4:30 PM",
                  icon: <FileText className="h-4 w-4 text-primary" />,
                },
                {
                  type: "Account Withdrawal",
                  details: "By Rajesh Kumar",
                  amount: "₹25,000",
                  time: "Yesterday, 2:15 PM",
                  icon: <PiggyBank className="h-4 w-4 text-primary" />,
                },
              ].map((activity, i) => (
                <div key={i} className="flex items-center">
                  <div className="mr-4 rounded-full bg-primary/10 p-2">
                    {activity.icon}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.type}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.details}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{activity.amount}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>
              Comparing current vs previous period
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  metric: "New Loan Applications",
                  current: "42",
                  previous: "38",
                  change: "+10.5%",
                  trend: "up",
                },
                {
                  metric: "Loan Approval Rate",
                  current: "85%",
                  previous: "82%",
                  change: "+3.7%",
                  trend: "up",
                },
                {
                  metric: "Average Loan Amount",
                  current: "₹145,250",
                  previous: "₹138,500",
                  change: "+4.9%",
                  trend: "up",
                },
                {
                  metric: "Repayment Rate",
                  current: "94.2%",
                  previous: "95.1%",
                  change: "-0.9%",
                  trend: "down",
                },
                {
                  metric: "New Account Openings",
                  current: "24",
                  previous: "26",
                  change: "-7.7%",
                  trend: "down",
                },
              ].map((metric, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="text-sm font-medium">{metric.metric}</p>
                    <p className="text-xs text-muted-foreground">
                      Current: {metric.current} | Previous: {metric.previous}
                    </p>
                  </div>
                  <div
                    className={`flex items-center ${metric.trend === "up" ? "text-green-500" : "text-red-500"}`}
                  >
                    {metric.trend === "up" ? (
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 mr-1" />
                    )}
                    <span>{metric.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-4">
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Quick Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center"
                size="sm"
              >
                <Coins className="h-8 w-8 mb-1" />
                <span className="text-xs">New Loan</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center"
                size="sm"
              >
                <PiggyBank className="h-8 w-8 mb-1" />
                <span className="text-xs">New Account</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center"
                size="sm"
              >
                <Users className="h-8 w-8 mb-1" />
                <span className="text-xs">Customers</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center"
                size="sm"
              >
                <FileText className="h-8 w-8 mb-1" />
                <span className="text-xs">Reports</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center"
                size="sm"
              >
                <Calendar className="h-8 w-8 mb-1" />
                <span className="text-xs">Calendar</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center"
                size="sm"
              >
                <BarChart className="h-8 w-8 mb-1" />
                <span className="text-xs">Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Calendar</CardTitle>
            <CardDescription>
              Scheduled events and deadlines for the next 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Loan Committee Meeting",
                  date: "Today, 4:00 PM",
                  type: "Meeting",
                },
                {
                  title: "Monthly Interest Payments",
                  date: "Tomorrow, All Day",
                  type: "Finance",
                },
                {
                  title: "Staff Training - New Gold Valuation System",
                  date: "Jun 18, 2023, 10:00 AM",
                  type: "Training",
                },
                {
                  title: "Quarterly Compliance Review",
                  date: "Jun 20, 2023, 2:00 PM",
                  type: "Compliance",
                },
                {
                  title: "System Maintenance Window",
                  date: "Jun 21, 2023, 11:00 PM",
                  type: "IT",
                },
              ].map((event, i) => (
                <div key={i} className="flex items-center">
                  <div className="mr-4 rounded-full bg-primary/10 p-2">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {event.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {event.type}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {event.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
