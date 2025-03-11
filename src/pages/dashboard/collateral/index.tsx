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
import { Badge } from "@/components/ui/badge";
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
import {
  Search,
  Filter,
  Plus,
  Coins,
  MoreVertical,
  QrCode,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Edit,
  Trash2,
  Download,
  BarChart4,
  Warehouse,
  Lock,
  Unlock,
} from "lucide-react";

export default function CollateralManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Collateral Management
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Register New Item
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
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
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <BarChart4 className="h-4 w-4 text-muted-foreground" />
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
            <CardTitle className="text-sm font-medium">In Custody</CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">215</div>
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
            <CardTitle className="text-sm font-medium">Released</CardTitle>
            <Unlock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">33</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 inline-flex items-center">
                <ArrowDownRight className="h-3 w-3 mr-1" /> -2
              </span>{" "}
              from last month
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
              placeholder="Search by ID, description, or type..."
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
                <SelectItem value="in_custody">In Custody</SelectItem>
                <SelectItem value="released">Released</SelectItem>
                <SelectItem value="in_transit">In Transit</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="necklace">Necklace</SelectItem>
                <SelectItem value="ring">Ring</SelectItem>
                <SelectItem value="bangle">Bangle</SelectItem>
                <SelectItem value="coin">Coin</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="value_high">Value (High to Low)</SelectItem>
                <SelectItem value="value_low">Value (Low to High)</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="inventory" className="space-y-4">
          <TabsList>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="custody_log">Custody Log</TabsTrigger>
            <TabsTrigger value="vault">Vault Management</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="space-y-4">
            <div className="rounded-md border">
              <div className="p-4 bg-muted/50">
                <div className="grid grid-cols-7 font-medium">
                  <div>Item Code</div>
                  <div>Type</div>
                  <div>Description</div>
                  <div>Weight</div>
                  <div>Value</div>
                  <div>Status</div>
                  <div>Actions</div>
                </div>
              </div>
              <div className="divide-y">
                {[
                  {
                    code: "GLD-NKL-001",
                    type: "Necklace",
                    description: "22K gold necklace with ruby pendant",
                    weight: "25g",
                    purity: "22K",
                    value: "₹100,000",
                    status: "in_custody",
                    location: "Vault A, Box 12",
                  },
                  {
                    code: "GLD-BNG-002",
                    type: "Bangle",
                    description: "22K gold bangle with intricate design",
                    weight: "15g",
                    purity: "22K",
                    value: "₹60,000",
                    status: "in_custody",
                    location: "Vault A, Box 12",
                  },
                  {
                    code: "GLD-RNG-003",
                    type: "Ring",
                    description: "18K gold ring with diamond",
                    weight: "5g",
                    purity: "18K",
                    value: "₹25,000",
                    status: "in_custody",
                    location: "Vault B, Box 5",
                  },
                  {
                    code: "GLD-CHN-004",
                    type: "Chain",
                    description: "24K gold chain",
                    weight: "10g",
                    purity: "24K",
                    value: "₹55,000",
                    status: "released",
                    location: "-",
                  },
                  {
                    code: "GLD-CON-005",
                    type: "Coin",
                    description: "24K gold coin with goddess Lakshmi",
                    weight: "8g",
                    purity: "24K",
                    value: "₹44,000",
                    status: "in_custody",
                    location: "Vault C, Box 3",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-7 p-4 items-center hover:bg-muted/50"
                  >
                    <div className="font-medium">{item.code}</div>
                    <div>{item.type}</div>
                    <div
                      className="truncate max-w-[200px]"
                      title={item.description}
                    >
                      {item.description}
                    </div>
                    <div>
                      {item.weight} ({item.purity})
                    </div>
                    <div>{item.value}</div>
                    <div>
                      {item.status === "in_custody" ? (
                        <Badge className="bg-green-100 text-green-800">
                          <Lock className="h-3 w-3 mr-1" /> In Custody
                        </Badge>
                      ) : item.status === "released" ? (
                        <Badge variant="outline">
                          <Unlock className="h-3 w-3 mr-1" /> Released
                        </Badge>
                      ) : (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          <Clock className="h-3 w-3 mr-1" /> In Transit
                        </Badge>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-1" /> View
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
                            <QrCode className="h-4 w-4 mr-2" /> Generate QR Code
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" /> Download
                            Certificate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {item.status === "in_custody" ? (
                            <DropdownMenuItem>
                              <Unlock className="h-4 w-4 mr-2" /> Release Item
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem>
                              <Lock className="h-4 w-4 mr-2" /> Take Custody
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="custody_log" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Custody Transfer Log</CardTitle>
                <CardDescription>
                  Recent custody transfers and status changes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      itemCode: "GLD-CHN-004",
                      action: "Released",
                      from: "Vault B, Box 5",
                      to: "Customer: Rahul Sharma",
                      date: "Today, 11:30 AM",
                      by: "Amit Verma",
                    },
                    {
                      itemCode: "GLD-RNG-003",
                      action: "Transferred",
                      from: "Vault A, Box 12",
                      to: "Vault B, Box 5",
                      date: "Today, 10:15 AM",
                      by: "Neha Gupta",
                    },
                    {
                      itemCode: "GLD-CON-005",
                      action: "Received",
                      from: "Customer: Vikram Singh",
                      to: "Vault C, Box 3",
                      date: "Yesterday, 3:45 PM",
                      by: "Amit Verma",
                    },
                    {
                      itemCode: "GLD-BNG-002",
                      action: "Inspected",
                      from: "Vault A, Box 12",
                      to: "Vault A, Box 12",
                      date: "Yesterday, 2:30 PM",
                      by: "Neha Gupta",
                    },
                    {
                      itemCode: "GLD-NKL-001",
                      action: "Received",
                      from: "Customer: Ananya Desai",
                      to: "Vault A, Box 12",
                      date: "Jun 15, 2023, 11:20 AM",
                      by: "Amit Verma",
                    },
                  ].map((log, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center">
                        <div className="mr-4 rounded-full bg-muted p-2">
                          {log.action === "Released" ? (
                            <Unlock className="h-4 w-4 text-muted-foreground" />
                          ) : log.action === "Received" ? (
                            <Lock className="h-4 w-4 text-muted-foreground" />
                          ) : log.action === "Transferred" ? (
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {log.itemCode} - {log.action}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            From: {log.from} • To: {log.to}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">{log.date}</p>
                        <p className="text-xs text-muted-foreground">
                          by {log.by}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vault" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Vault A</CardTitle>
                  <CardDescription>Main Storage Vault</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Total Items:</span>
                      <span className="font-medium">125</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Total Value:</span>
                      <span className="font-medium">₹6,250,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Capacity:</span>
                      <span className="font-medium">75%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Last Accessed:</span>
                      <span className="font-medium">Today, 10:15 AM</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" size="sm" className="w-full">
                      <Warehouse className="h-4 w-4 mr-2" /> View Vault Details
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Vault B</CardTitle>
                  <CardDescription>Secondary Storage Vault</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Total Items:</span>
                      <span className="font-medium">85</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Total Value:</span>
                      <span className="font-medium">₹4,125,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Capacity:</span>
                      <span className="font-medium">60%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Last Accessed:</span>
                      <span className="font-medium">Today, 11:30 AM</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" size="sm" className="w-full">
                      <Warehouse className="h-4 w-4 mr-2" /> View Vault Details
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Vault C</CardTitle>
                  <CardDescription>High-Security Vault</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Total Items:</span>
                      <span className="font-medium">38</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Total Value:</span>
                      <span className="font-medium">₹2,083,750</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Capacity:</span>
                      <span className="font-medium">25%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Last Accessed:</span>
                      <span className="font-medium">Yesterday, 3:45 PM</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" size="sm" className="w-full">
                      <Warehouse className="h-4 w-4 mr-2" /> View Vault Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
