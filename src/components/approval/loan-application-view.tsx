import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Calendar,
  Clock,
  FileText,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Coins,
  Download,
  Printer,
  Eye,
} from "lucide-react";

type LoanApplicationViewProps = {
  application: any;
};

export function LoanApplicationView({ application }: LoanApplicationViewProps) {
  const [activeTab, setActiveTab] = useState("overview");

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
      case "verified":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            <CheckCircle2 className="h-3 w-3 mr-1" /> Verified
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
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Loan Application {application.id}
          </h2>
          <div className="flex items-center space-x-2 mt-1">
            {getStatusBadge(application.status)}
            <span className="text-muted-foreground">
              Submitted on {application.submittedDate}
            </span>
            {application.priority === "high" && (
              <Badge className="bg-red-100 text-red-800">High Priority</Badge>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="customer">Customer</TabsTrigger>
          <TabsTrigger value="collateral">Collateral</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Application ID
                    </p>
                    <p className="font-medium">{application.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <div>{getStatusBadge(application.status)}</div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Submitted Date
                    </p>
                    <p className="font-medium">{application.submittedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Assigned To</p>
                    <p className="font-medium">{application.assignedTo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Loan Amount</p>
                    <p className="font-medium">{application.amount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Loan Type</p>
                    <p className="font-medium">{application.type}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Loan Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Interest Rate
                    </p>
                    <p className="font-medium">
                      {application.loanDetails?.interestRate || "12%"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tenure</p>
                    <p className="font-medium">
                      {application.loanDetails?.tenure || "12 months"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">EMI Amount</p>
                    <p className="font-medium">
                      {application.loanDetails?.emiAmount || "₹10,674"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">LTV Ratio</p>
                    <p className="font-medium">
                      {application.loanDetails?.ltvRatio || "75%"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Collateral Value
                    </p>
                    <p className="font-medium">
                      {application.loanDetails?.collateralValue || "₹160,000"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Processing Fee
                    </p>
                    <p className="font-medium">
                      {application.loanDetails?.processingFee || "₹1,200"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Application Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative pl-6 border-l-2 border-muted ml-4 space-y-8">
                {application.timeline?.map((event: any, index: number) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-[29px] p-1 rounded-full bg-primary">
                      <div className="h-4 w-4 rounded-full bg-background"></div>
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">{event.action}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{event.timestamp}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <User className="h-3 w-3 mr-1" />
                        <span>{event.user}</span>
                      </div>
                    </div>
                  </div>
                )) || (
                  <div className="text-center py-4 text-muted-foreground">
                    No timeline events available
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customer" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Personal Details
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Name:</span>
                        <span>
                          {application.customer?.name || "Not provided"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">
                          Customer ID:
                        </span>
                        <span>
                          {application.customer?.id || "Not provided"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">ID Type:</span>
                        <span>{application.customer?.idType || "Aadhaar"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">ID Number:</span>
                        <span>
                          {application.customer?.idNumber || "XXXX-XXXX-XXXX"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Employment Details
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Occupation:</span>
                        <span>
                          {application.customer?.occupation || "Not provided"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">
                          Monthly Income:
                        </span>
                        <span>
                          {application.customer?.monthlyIncome ||
                            "Not provided"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Employer:</span>
                        <span>
                          {application.customer?.employer || "Not provided"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Contact Information
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Phone:</span>
                        <span>
                          {application.customer?.phone || "Not provided"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Email:</span>
                        <span>
                          {application.customer?.email || "Not provided"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Address:</span>
                        <span>
                          {application.customer?.address || "Not provided"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Banking Details
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Bank Name:</span>
                        <span>
                          {application.customer?.bankName || "Not provided"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">
                          Account Number:
                        </span>
                        <span>
                          {application.customer?.accountNumber ||
                            "XXXX-XXXX-XXXX"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">IFSC Code:</span>
                        <span>
                          {application.customer?.ifscCode || "Not provided"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <a href={`/dashboard/customers/${application.customer?.id}`}>
                  <User className="h-4 w-4 mr-2" />
                  View Full Customer Profile
                </a>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="collateral" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Gold Items</CardTitle>
              <CardDescription>
                Collateral items pledged for this loan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {application.collateral?.map((item: any, index: number) => (
                  <div key={index} className="border rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{item.type}</h3>
                        <p className="text-sm text-muted-foreground">
                          Item Code: {item.itemCode}
                        </p>
                      </div>
                      <Badge variant="outline">{item.purity}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Weight</p>
                        <p className="font-medium">{item.weight}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Value</p>
                        <p className="font-medium">{item.value}</p>
                      </div>
                    </div>
                  </div>
                )) || (
                  <div className="text-center py-4 text-muted-foreground">
                    No collateral items available
                  </div>
                )}

                {application.collateral &&
                  application.collateral.length > 0 && (
                    <div className="flex justify-between border-t pt-4">
                      <p className="font-medium">Total Collateral Value</p>
                      <p className="font-medium">
                        {application.loanDetails?.collateralValue ||
                          "₹" +
                            application.collateral
                              .reduce((total: number, item: any) => {
                                const value = parseInt(
                                  item.value.replace(/[^0-9]/g, ""),
                                );
                                return total + value;
                              }, 0)
                              .toLocaleString()}
                      </p>
                    </div>
                  )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Application Documents</CardTitle>
              <CardDescription>
                Documents submitted with this application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {application.documents?.map((doc: any, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center">
                      <div className="mr-3 rounded-full bg-muted p-1.5">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {doc.type} • {doc.size} • Uploaded on {doc.uploadedOn}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(doc.status)}
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-1" /> View
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )) || (
                  <div className="text-center py-4 text-muted-foreground">
                    No documents available
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" asChild>
          <a href="/dashboard/approvals">Back to Approvals</a>
        </Button>
        <Button variant="outline" asChild>
          <a href={`/dashboard/approvals/${application.id}`}>
            <Eye className="h-4 w-4 mr-2" />
            View Full Details
          </a>
        </Button>
      </div>
    </div>
  );
}
