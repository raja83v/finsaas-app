import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  BarChart,
  PieChart,
  LineChart,
  Calendar,
  Clock,
  Download,
  Save,
  Eye,
  Mail,
  Plus,
  Trash2,
  MoveHorizontal,
  ArrowLeft,
} from "lucide-react";

export default function ReportBuilder() {
  const [reportName, setReportName] = useState("New Custom Report");
  const [reportType, setReportType] = useState("loan");
  const [timeframe, setTimeframe] = useState("month");
  const [chartType, setChartType] = useState("bar");

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Report Builder</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button size="sm">
            <Save className="mr-2 h-4 w-4" />
            Save Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Configuration</CardTitle>
              <CardDescription>
                Define the basic parameters for your report
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="report-name">Report Name</Label>
                <Input
                  id="report-name"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                  placeholder="Enter report name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="report-type">Report Type</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger id="report-type">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="loan">Loan Report</SelectItem>
                    <SelectItem value="account">Account Report</SelectItem>
                    <SelectItem value="customer">Customer Report</SelectItem>
                    <SelectItem value="performance">
                      Performance Report
                    </SelectItem>
                    <SelectItem value="financial">Financial Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeframe">Time Period</Label>
                <Select value={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger id="timeframe">
                    <SelectValue placeholder="Select time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {timeframe === "custom" && (
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <div className="flex">
                      <Input id="start-date" type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">End Date</Label>
                    <div className="flex">
                      <Input id="end-date" type="date" />
                    </div>
                  </div>
                </div>
              )}

              <Separator />

              <div className="space-y-2">
                <Label>Visualization Type</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={chartType === "bar" ? "default" : "outline"}
                    className="flex flex-col items-center justify-center h-20 p-2"
                    onClick={() => setChartType("bar")}
                  >
                    <BarChart className="h-8 w-8 mb-1" />
                    <span className="text-xs">Bar Chart</span>
                  </Button>
                  <Button
                    variant={chartType === "line" ? "default" : "outline"}
                    className="flex flex-col items-center justify-center h-20 p-2"
                    onClick={() => setChartType("line")}
                  >
                    <LineChart className="h-8 w-8 mb-1" />
                    <span className="text-xs">Line Chart</span>
                  </Button>
                  <Button
                    variant={chartType === "pie" ? "default" : "outline"}
                    className="flex flex-col items-center justify-center h-20 p-2"
                    onClick={() => setChartType("pie")}
                  >
                    <PieChart className="h-8 w-8 mb-1" />
                    <span className="text-xs">Pie Chart</span>
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Delivery Options</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="schedule" />
                    <Label htmlFor="schedule" className="text-sm">
                      Schedule this report
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="email" />
                    <Label htmlFor="email" className="text-sm">
                      Email report when generated
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Export Format</Label>
                <div className="flex space-x-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="pdf" defaultChecked />
                    <Label htmlFor="pdf" className="text-sm">
                      PDF
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="excel" />
                    <Label htmlFor="excel" className="text-sm">
                      Excel
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="csv" />
                    <Label htmlFor="csv" className="text-sm">
                      CSV
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Fields</CardTitle>
              <CardDescription>
                Select the fields to include in your report
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="columns" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="columns">Columns</TabsTrigger>
                  <TabsTrigger value="filters">Filters</TabsTrigger>
                  <TabsTrigger value="sorting">Sorting</TabsTrigger>
                </TabsList>

                <TabsContent value="columns" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label>Available Fields</Label>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Add All
                      </Button>
                    </div>

                    <div className="border rounded-md p-4 space-y-2">
                      {reportType === "loan" &&
                        [
                          { id: "loan_id", name: "Loan ID", selected: true },
                          {
                            id: "customer_name",
                            name: "Customer Name",
                            selected: true,
                          },
                          {
                            id: "loan_amount",
                            name: "Loan Amount",
                            selected: true,
                          },
                          {
                            id: "interest_rate",
                            name: "Interest Rate",
                            selected: true,
                          },
                          {
                            id: "disbursement_date",
                            name: "Disbursement Date",
                            selected: true,
                          },
                          {
                            id: "loan_term",
                            name: "Loan Term",
                            selected: false,
                          },
                          {
                            id: "gold_weight",
                            name: "Gold Weight",
                            selected: false,
                          },
                          {
                            id: "gold_purity",
                            name: "Gold Purity",
                            selected: false,
                          },
                          {
                            id: "loan_status",
                            name: "Loan Status",
                            selected: true,
                          },
                          {
                            id: "next_payment_date",
                            name: "Next Payment Date",
                            selected: false,
                          },
                          {
                            id: "total_paid",
                            name: "Total Paid",
                            selected: false,
                          },
                          {
                            id: "remaining_balance",
                            name: "Remaining Balance",
                            selected: true,
                          },
                        ].map((field) => (
                          <div
                            key={field.id}
                            className="flex items-center justify-between p-2 hover:bg-muted rounded-md"
                          >
                            <div className="flex items-center">
                              <Checkbox
                                id={field.id}
                                defaultChecked={field.selected}
                              />
                              <Label htmlFor={field.id} className="ml-2">
                                {field.name}
                              </Label>
                            </div>
                            <Button variant="ghost" size="sm">
                              <MoveHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <Label>Selected Fields</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove All
                      </Button>
                    </div>

                    <div className="border rounded-md p-4 space-y-2 min-h-[200px]">
                      {reportType === "loan" &&
                        [
                          { id: "loan_id", name: "Loan ID" },
                          { id: "customer_name", name: "Customer Name" },
                          { id: "loan_amount", name: "Loan Amount" },
                          { id: "interest_rate", name: "Interest Rate" },
                          {
                            id: "disbursement_date",
                            name: "Disbursement Date",
                          },
                          { id: "loan_status", name: "Loan Status" },
                          {
                            id: "remaining_balance",
                            name: "Remaining Balance",
                          },
                        ].map((field, index) => (
                          <div
                            key={field.id}
                            className="flex items-center justify-between p-2 hover:bg-muted rounded-md"
                          >
                            <div className="flex items-center">
                              <span className="text-sm font-medium mr-2">
                                {index + 1}.
                              </span>
                              <span>{field.name}</span>
                            </div>
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm">
                                <MoveHorizontal className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="filters" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Filter
                    </Button>

                    <div className="border rounded-md p-4 space-y-4">
                      <div className="grid grid-cols-12 gap-2 items-center">
                        <div className="col-span-3">
                          <Select defaultValue="loan_status">
                            <SelectTrigger>
                              <SelectValue placeholder="Select field" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="loan_status">
                                Loan Status
                              </SelectItem>
                              <SelectItem value="loan_amount">
                                Loan Amount
                              </SelectItem>
                              <SelectItem value="disbursement_date">
                                Disbursement Date
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-3">
                          <Select defaultValue="equals">
                            <SelectTrigger>
                              <SelectValue placeholder="Select operator" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="equals">Equals</SelectItem>
                              <SelectItem value="not_equals">
                                Not Equals
                              </SelectItem>
                              <SelectItem value="contains">Contains</SelectItem>
                              <SelectItem value="greater_than">
                                Greater Than
                              </SelectItem>
                              <SelectItem value="less_than">
                                Less Than
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-5">
                          <Select defaultValue="active">
                            <SelectTrigger>
                              <SelectValue placeholder="Select value" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="closed">Closed</SelectItem>
                              <SelectItem value="defaulted">
                                Defaulted
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-1 flex justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-12 gap-2 items-center">
                        <div className="col-span-3">
                          <Select defaultValue="loan_amount">
                            <SelectTrigger>
                              <SelectValue placeholder="Select field" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="loan_status">
                                Loan Status
                              </SelectItem>
                              <SelectItem value="loan_amount">
                                Loan Amount
                              </SelectItem>
                              <SelectItem value="disbursement_date">
                                Disbursement Date
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-3">
                          <Select defaultValue="greater_than">
                            <SelectTrigger>
                              <SelectValue placeholder="Select operator" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="equals">Equals</SelectItem>
                              <SelectItem value="not_equals">
                                Not Equals
                              </SelectItem>
                              <SelectItem value="contains">Contains</SelectItem>
                              <SelectItem value="greater_than">
                                Greater Than
                              </SelectItem>
                              <SelectItem value="less_than">
                                Less Than
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-5">
                          <Input defaultValue="50000" />
                        </div>
                        <div className="col-span-1 flex justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="sorting" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Sorting
                    </Button>

                    <div className="border rounded-md p-4 space-y-4">
                      <div className="grid grid-cols-12 gap-2 items-center">
                        <div className="col-span-6">
                          <Select defaultValue="loan_amount">
                            <SelectTrigger>
                              <SelectValue placeholder="Select field" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="loan_id">Loan ID</SelectItem>
                              <SelectItem value="customer_name">
                                Customer Name
                              </SelectItem>
                              <SelectItem value="loan_amount">
                                Loan Amount
                              </SelectItem>
                              <SelectItem value="disbursement_date">
                                Disbursement Date
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-5">
                          <Select defaultValue="desc">
                            <SelectTrigger>
                              <SelectValue placeholder="Select order" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="asc">Ascending</SelectItem>
                              <SelectItem value="desc">Descending</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-1 flex justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-12 gap-2 items-center">
                        <div className="col-span-6">
                          <Select defaultValue="disbursement_date">
                            <SelectTrigger>
                              <SelectValue placeholder="Select field" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="loan_id">Loan ID</SelectItem>
                              <SelectItem value="customer_name">
                                Customer Name
                              </SelectItem>
                              <SelectItem value="loan_amount">
                                Loan Amount
                              </SelectItem>
                              <SelectItem value="disbursement_date">
                                Disbursement Date
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-5">
                          <Select defaultValue="desc">
                            <SelectTrigger>
                              <SelectValue placeholder="Select order" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="asc">Ascending</SelectItem>
                              <SelectItem value="desc">Descending</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-1 flex justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Report Preview</CardTitle>
              <CardDescription>
                This is how your report will look
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md p-4 flex items-center justify-center h-[300px] bg-muted/40">
                {chartType === "bar" && (
                  <BarChart className="h-32 w-32 text-muted-foreground" />
                )}
                {chartType === "line" && (
                  <LineChart className="h-32 w-32 text-muted-foreground" />
                )}
                {chartType === "pie" && (
                  <PieChart className="h-32 w-32 text-muted-foreground" />
                )}
                <span className="ml-4 text-muted-foreground">
                  Report visualization will appear here
                </span>
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button size="sm">
                  <Save className="mr-2 h-4 w-4" />
                  Save Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
