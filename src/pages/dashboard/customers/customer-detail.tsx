import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Coins,
  PiggyBank,
  FileText,
  MessageSquare,
  Star,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Edit,
  Download,
  Upload,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  ArrowRight,
  CheckSquare,
  Square,
  Send,
  Paperclip,
  User,
  UserPlus,
  ShieldCheck,
  FileCheck,
  CreditCard,
  Banknote,
} from "lucide-react";

export default function CustomerDetail() {
  // This would normally come from a route parameter
  const customerId = "CUS-10045682";
  const [activeKycStep, setActiveKycStep] = useState(4); // Completed all steps
  const [newInteraction, setNewInteraction] = useState("");

  const kycSteps = [
    { id: 1, name: "Basic Information", status: "complete" },
    { id: 2, name: "Identity Verification", status: "complete" },
    { id: 3, name: "Address Verification", status: "complete" },
    { id: 4, name: "Risk Assessment", status: "complete" },
  ];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Rajesh Kumar</h2>
          <p className="text-muted-foreground">{customerId}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
          <Button size="sm">
            <MessageSquare className="mr-2 h-4 w-4" />
            Contact
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center text-2xl font-bold text-muted-foreground">
                    RK
                  </div>
                  <div className="absolute -bottom-1 -right-1 rounded-full bg-primary p-1 text-primary-foreground">
                    <Star className="h-4 w-4" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>+91 54321 09876</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>rajesh.kumar@example.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>123 Main Street, Mumbai, Maharashtra</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Customer since: Jan 15, 2020</span>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-semibold mb-2">Customer Segment</h4>
                <div className="flex items-center">
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 text-purple-800 hover:bg-purple-100 hover:text-purple-800"
                  >
                    VIP
                  </Badge>
                  <span className="text-xs text-muted-foreground ml-2">
                    High-value customer
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2">KYC Status</h4>
                <div className="flex items-center">
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800"
                  >
                    Verified
                  </Badge>
                  <span className="text-xs text-muted-foreground ml-2">
                    Last verified: Mar 10, 2023
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2">
                  Relationship Manager
                </h4>
                <div className="flex items-center">
                  <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground mr-2">
                    AV
                  </div>
                  <span>Amit Verma</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="interactions">Interactions</TabsTrigger>
              <TabsTrigger value="kyc">KYC</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">
                        Total Relationship Value
                      </h4>
                      <p className="text-2xl font-bold">₹350,000</p>
                      <p className="text-xs text-muted-foreground">
                        Across all products
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">Active Products</h4>
                      <div className="flex space-x-2">
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1 bg-amber-50 text-amber-800 border-amber-200"
                        >
                          <Coins className="h-3 w-3" />
                          Gold Loan
                        </Badge>
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1 bg-blue-50 text-blue-800 border-blue-200"
                        >
                          <PiggyBank className="h-3 w-3" />
                          Fixed Deposit
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-semibold">Gold Loan</h4>
                        <p className="text-xs text-muted-foreground">
                          GL-2023-0985 • Disbursed on May 20, 2023
                        </p>
                      </div>
                      <p className="font-medium">₹150,000</p>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-semibold">Fixed Deposit</h4>
                        <p className="text-xs text-muted-foreground">
                          FD-2022-1245 • Matures on Dec 15, 2023
                        </p>
                      </div>
                      <p className="font-medium">₹200,000</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        type: "Loan Repayment",
                        details: "Monthly EMI for Gold Loan",
                        amount: "₹4,250",
                        date: "Jun 05, 2023",
                      },
                      {
                        type: "Interest Credit",
                        details: "Monthly interest on Fixed Deposit",
                        amount: "₹1,125",
                        date: "Jun 01, 2023",
                      },
                      {
                        type: "Document Update",
                        details: "Address proof updated",
                        date: "May 28, 2023",
                      },
                      {
                        type: "Loan Repayment",
                        details: "Monthly EMI for Gold Loan",
                        amount: "₹4,250",
                        date: "May 05, 2023",
                      },
                    ].map((activity, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0"
                      >
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{activity.type}</p>
                          <p className="text-xs text-muted-foreground">
                            {activity.details}
                          </p>
                        </div>
                        <div className="text-right">
                          {activity.amount && (
                            <p className="text-sm font-medium">
                              {activity.amount}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground">
                            {activity.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products" className="space-y-4 mt-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Active Products</h3>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Product
                </Button>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-amber-100 p-2">
                        <Coins className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <CardTitle>Gold Loan</CardTitle>
                        <CardDescription>GL-2023-0985</CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800">
                      Active
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Principal</p>
                      <p className="text-base font-medium">₹150,000</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Interest Rate
                      </p>
                      <p className="text-base font-medium">12%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="text-base font-medium">12 months</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Disbursement Date
                      </p>
                      <p className="text-base font-medium">May 20, 2023</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Repayment Progress</span>
                      <span>1/12 EMIs paid</span>
                    </div>
                    <Progress value={8} className="h-2" />
                  </div>

                  <div className="flex justify-end mt-4 space-x-2">
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button size="sm">
                      <Banknote className="h-4 w-4 mr-1" />
                      Collect Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-blue-100 p-2">
                        <PiggyBank className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle>Fixed Deposit</CardTitle>
                        <CardDescription>FD-2022-1245</CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800">
                      Active
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Principal</p>
                      <p className="text-base font-medium">₹200,000</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Interest Rate
                      </p>
                      <p className="text-base font-medium">6.75%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Term</p>
                      <p className="text-base font-medium">12 months</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Maturity Date
                      </p>
                      <p className="text-base font-medium">Dec 15, 2023</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Term Progress</span>
                      <span>6/12 months completed</span>
                    </div>
                    <Progress value={50} className="h-2" />
                  </div>

                  <div className="flex justify-end mt-4 space-x-2">
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button size="sm">
                      <CreditCard className="h-4 w-4 mr-1" />
                      Manage Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Customer Documents</CardTitle>
                    <Button size="sm">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload New
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        name: "ID Proof - Aadhaar Card",
                        type: "KYC Document",
                        uploadedOn: "Jan 15, 2020",
                        status: "Verified",
                        icon: <FileCheck className="h-5 w-5 text-green-600" />,
                      },
                      {
                        name: "Address Proof - Utility Bill",
                        type: "KYC Document",
                        uploadedOn: "May 28, 2023",
                        status: "Verified",
                        icon: <FileCheck className="h-5 w-5 text-green-600" />,
                      },
                      {
                        name: "PAN Card",
                        type: "KYC Document",
                        uploadedOn: "Jan 15, 2020",
                        status: "Verified",
                        icon: <FileCheck className="h-5 w-5 text-green-600" />,
                      },
                      {
                        name: "Passport Size Photo",
                        type: "KYC Document",
                        uploadedOn: "Jan 15, 2020",
                        status: "Verified",
                        icon: <User className="h-5 w-5 text-green-600" />,
                      },
                      {
                        name: "Gold Loan Agreement",
                        type: "Loan Document",
                        uploadedOn: "May 20, 2023",
                        status: "Active",
                        icon: <FileText className="h-5 w-5 text-blue-600" />,
                      },
                      {
                        name: "Fixed Deposit Certificate",
                        type: "Account Document",
                        uploadedOn: "Dec 15, 2022",
                        status: "Active",
                        icon: <FileText className="h-5 w-5 text-blue-600" />,
                      },
                    ].map((document, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center">
                          <div className="mr-3 rounded-full bg-muted p-1">
                            {document.icon}
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {document.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {document.type} • Uploaded: {document.uploadedOn}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant="outline"
                            className={`
                            ${
                              document.status === "Verified"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : document.status === "Active"
                                  ? "bg-blue-50 text-blue-700 border-blue-200"
                                  : "bg-yellow-50 text-yellow-700 border-yellow-200"
                            }
                          `}
                          >
                            {document.status}
                          </Badge>
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

            <TabsContent value="interactions" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Communication History</CardTitle>
                    <Button size="sm">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      New Interaction
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-6">
                    {[
                      {
                        type: "Phone Call",
                        staff: "Amit Verma",
                        notes:
                          "Discussed upcoming fixed deposit maturity and renewal options",
                        date: "Jun 10, 2023",
                        icon: <Phone className="h-4 w-4 text-blue-600" />,
                      },
                      {
                        type: "Email",
                        staff: "System",
                        notes: "Monthly statement sent",
                        date: "Jun 01, 2023",
                        icon: <Mail className="h-4 w-4 text-purple-600" />,
                      },
                      {
                        type: "In-Person",
                        staff: "Amit Verma",
                        notes:
                          "Customer visited branch to update address proof",
                        date: "May 28, 2023",
                        icon: <User className="h-4 w-4 text-green-600" />,
                      },
                      {
                        type: "SMS",
                        staff: "System",
                        notes: "Payment reminder for upcoming loan EMI",
                        date: "May 03, 2023",
                        icon: (
                          <MessageSquare className="h-4 w-4 text-gray-600" />
                        ),
                      },
                    ].map((interaction, i) => (
                      <div
                        key={i}
                        className="flex items-start border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div className="mr-3 mt-0.5 rounded-full bg-muted p-1.5">
                          {interaction.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Badge
                                variant="outline"
                                className={`mr-2 ${
                                  interaction.type === "Phone Call"
                                    ? "bg-blue-50 text-blue-700 border-blue-200"
                                    : interaction.type === "Email"
                                      ? "bg-purple-50 text-purple-700 border-purple-200"
                                      : interaction.type === "In-Person"
                                        ? "bg-green-50 text-green-700 border-green-200"
                                        : "bg-gray-50 text-gray-700 border-gray-200"
                                }
                              `}
                              >
                                {interaction.type}
                              </Badge>
                              <p className="text-sm font-medium">
                                {interaction.staff}
                              </p>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {interaction.date}
                            </p>
                          </div>
                          <p className="text-sm mt-1">{interaction.notes}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border rounded-md p-3">
                    <h4 className="text-sm font-medium mb-2">
                      Add New Interaction
                    </h4>
                    <div className="flex space-x-2 mb-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                      >
                        <Phone className="h-3.5 w-3.5 mr-1" />
                        Call
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                      >
                        <Mail className="h-3.5 w-3.5 mr-1" />
                        Email
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                      >
                        <MessageSquare className="h-3.5 w-3.5 mr-1" />
                        SMS
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                      >
                        <User className="h-3.5 w-3.5 mr-1" />
                        In-Person
                      </Button>
                    </div>
                    <div className="flex">
                      <textarea
                        className="flex-1 min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                        placeholder="Enter interaction details..."
                        value={newInteraction}
                        onChange={(e) => setNewInteraction(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-between mt-2">
                      <Button variant="ghost" size="sm">
                        <Paperclip className="h-4 w-4 mr-1" />
                        Attach
                      </Button>
                      <Button size="sm">
                        <Send className="h-4 w-4 mr-1" />
                        Save Interaction
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="kyc" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>KYC Verification Status</CardTitle>
                      <CardDescription>
                        Customer verification process
                      </CardDescription>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800">
                      Fully Verified
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Verification Progress</span>
                        <span>4/4 Steps Completed</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>

                    <div className="space-y-4">
                      {kycSteps.map((step) => (
                        <div key={step.id} className="flex items-start">
                          <div
                            className={`mr-3 rounded-full p-1.5 ${
                              step.status === "complete"
                                ? "bg-green-100"
                                : step.status === "current"
                                  ? "bg-blue-100"
                                  : "bg-gray-100"
                            }`}
                          >
                            {step.status === "complete" ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : step.status === "current" ? (
                              <Clock className="h-5 w-5 text-blue-600" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">{step.name}</p>
                              <Badge
                                variant="outline"
                                className={`${
                                  step.status === "complete"
                                    ? "bg-green-50 text-green-700 border-green-200"
                                    : step.status === "current"
                                      ? "bg-blue-50 text-blue-700 border-blue-200"
                                      : "bg-gray-50 text-gray-700 border-gray-200"
                                }`}
                              >
                                {step.status === "complete"
                                  ? "Completed"
                                  : step.status === "current"
                                    ? "In Progress"
                                    : "Pending"}
                              </Badge>
                            </div>

                            {step.id === 1 && (
                              <div className="mt-2 text-sm space-y-1">
                                <div className="flex items-center">
                                  <CheckSquare className="h-4 w-4 text-green-600 mr-2" />
                                  <span>Personal information collected</span>
                                </div>
                                <div className="flex items-center">
                                  <CheckSquare className="h-4 w-4 text-green-600 mr-2" />
                                  <span>Contact details verified</span>
                                </div>
                              </div>
                            )}

                            {step.id === 2 && (
                              <div className="mt-2 text-sm space-y-1">
                                <div className="flex items-center">
                                  <CheckSquare className="h-4 w-4 text-green-600 mr-2" />
                                  <span>Aadhaar card verified</span>
                                </div>
                                <div className="flex items-center">
                                  <CheckSquare className="h-4 w-4 text-green-600 mr-2" />
                                  <span>PAN card verified</span>
                                </div>
                              </div>
                            )}

                            {step.id === 3 && (
                              <div className="mt-2 text-sm space-y-1">
                                <div className="flex items-center">
                                  <CheckSquare className="h-4 w-4 text-green-600 mr-2" />
                                  <span>Utility bill verified</span>
                                </div>
                                <div className="flex items-center">
                                  <CheckSquare className="h-4 w-4 text-green-600 mr-2" />
                                  <span>
                                    Physical address verification completed
                                  </span>
                                </div>
                              </div>
                            )}

                            {step.id === 4 && (
                              <div className="mt-2 text-sm space-y-1">
                                <div className="flex items-center">
                                  <CheckSquare className="h-4 w-4 text-green-600 mr-2" />
                                  <span>Risk assessment completed</span>
                                </div>
                                <div className="flex items-center">
                                  <CheckSquare className="h-4 w-4 text-green-600 mr-2" />
                                  <span>Customer categorized as low risk</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <div className="flex items-center">
                        <ShieldCheck className="h-5 w-5 text-green-600 mr-2" />
                        <span className="text-sm font-medium">
                          Last verified on Mar 10, 2023 by Amit Verma
                        </span>
                      </div>
                      <Button size="sm">
                        <ArrowRight className="h-4 w-4 mr-1" />
                        Re-verify KYC
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Customer Onboarding</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <UserPlus className="h-5 w-5 text-green-600 mr-2" />
                        <span className="text-sm font-medium">
                          Onboarding Date: Jan 15, 2020
                        </span>
                      </div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800">
                        Completed
                      </Badge>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Onboarding Steps</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center">
                          <CheckSquare className="h-4 w-4 text-green-600 mr-2" />
                          <span>Initial contact and introduction</span>
                        </div>
                        <div className="flex items-center">
                          <CheckSquare className="h-4 w-4 text-green-600 mr-2" />
                          <span>KYC documentation collection</span>
                        </div>
                        <div className="flex items-center">
                          <CheckSquare className="h-4 w-4 text-green-600 mr-2" />
                          <span>Account setup and product enrollment</span>
                        </div>
                        <div className="flex items-center">
                          <CheckSquare className="h-4 w-4 text-green-600 mr-2" />
                          <span>Welcome kit provided</span>
                        </div>
                        <div className="flex items-center">
                          <CheckSquare className="h-4 w-4 text-green-600 mr-2" />
                          <span>Relationship manager assigned</span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-md bg-muted p-3">
                      <h4 className="text-sm font-medium mb-1">
                        Onboarding Notes
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Customer was referred by an existing client. Showed
                        interest in gold loans and fixed deposits. Assigned to
                        premium segment due to high initial deposit amount.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
