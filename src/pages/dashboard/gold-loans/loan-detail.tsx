import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Calendar,
  Coins,
  Download,
  FileText,
  MessageSquare,
  User,
} from "lucide-react";

export default function LoanDetail() {
  const { id } = useParams();

  // In a real app, this would fetch loan details from an API
  const loanDetails = {
    id: id || "GL-2023-0985",
    customer: {
      name: "Rajesh Kumar",
      id: "CUS-10045682",
      phone: "+91 54321 09876",
      email: "rajesh.kumar@example.com",
    },
    status: "Active",
    principal: 150000,
    interestRate: 12,
    loanTerm: 12,
    disbursementDate: "2023-05-20",
    maturityDate: "2024-05-20",
    nextPaymentDate: "2023-06-20",
    nextPaymentAmount: 14250,
    totalPaid: 14250,
    remainingBalance: 135750,
    goldItems: [
      {
        type: "Necklace",
        description: "22K gold necklace with ruby pendant",
        weightGrams: 25,
        purity: 22,
        value: 125000,
      },
      {
        type: "Bangle",
        description: "22K gold bangle with intricate design",
        weightGrams: 15,
        purity: 22,
        value: 75000,
      },
    ],
    transactions: [
      {
        date: "2023-05-20",
        type: "Disbursement",
        amount: 150000,
        description: "Loan amount disbursed",
      },
      {
        date: "2023-06-05",
        type: "Repayment",
        amount: 14250,
        description: "EMI payment",
      },
    ],
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center space-x-2 mb-4">
        <Button variant="outline" size="sm" asChild>
          <a href="/dashboard/loans">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Loans
          </a>
        </Button>
      </div>

      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {loanDetails.id}
          </h2>
          <div className="flex items-center space-x-2 mt-1">
            <Badge
              className={`${loanDetails.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
            >
              {loanDetails.status}
            </Badge>
            <span className="text-muted-foreground">
              Disbursed on {loanDetails.disbursementDate}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Documents
          </Button>
          <Button>
            <Coins className="h-4 w-4 mr-2" />
            Collect Payment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center text-lg font-bold text-muted-foreground">
                  {loanDetails.customer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="font-medium">{loanDetails.customer.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {loanDetails.customer.id}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{loanDetails.customer.phone}</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{loanDetails.customer.email}</span>
                </div>
              </div>

              <Button variant="outline" className="w-full" asChild>
                <a href={`/dashboard/customers/${loanDetails.customer.id}`}>
                  View Customer Profile
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Loan Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-muted-foreground">Principal</p>
                  <p className="font-medium">
                    ₹{loanDetails.principal.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Interest Rate</p>
                  <p className="font-medium">{loanDetails.interestRate}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Term</p>
                  <p className="font-medium">{loanDetails.loanTerm} months</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Maturity Date</p>
                  <p className="font-medium">{loanDetails.maturityDate}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-sm text-muted-foreground">Next Payment</p>
                  <p className="font-medium">
                    ₹{loanDetails.nextPaymentAmount.toLocaleString()}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-muted-foreground">Due Date</p>
                  <p className="font-medium">{loanDetails.nextPaymentDate}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-muted-foreground">Total Paid</p>
                  <p className="font-medium">
                    ₹{loanDetails.totalPaid.toLocaleString()}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-muted-foreground">
                    Remaining Balance
                  </p>
                  <p className="font-medium">
                    ₹{loanDetails.remainingBalance.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" className="w-full" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Payment Schedule
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Statement
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="collateral">
            <TabsList className="w-full">
              <TabsTrigger value="collateral">Collateral</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="collateral" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Gold Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {loanDetails.goldItems.map((item, index) => (
                      <div key={index} className="border rounded-md p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{item.type}</h3>
                            <p className="text-sm text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                          <Badge variant="outline">{item.purity}K</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Weight
                            </p>
                            <p className="font-medium">{item.weightGrams}g</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Value
                            </p>
                            <p className="font-medium">
                              ₹{item.value.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="flex justify-between border-t pt-4">
                      <p className="font-medium">Total Collateral Value</p>
                      <p className="font-medium">
                        ₹
                        {loanDetails.goldItems
                          .reduce((total, item) => total + item.value, 0)
                          .toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transactions" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {loanDetails.transactions.map((transaction, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div>
                          <p className="font-medium">{transaction.type}</p>
                          <p className="text-sm text-muted-foreground">
                            {transaction.description}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {transaction.date}
                          </p>
                        </div>
                        <p
                          className={`font-medium ${transaction.type === "Disbursement" ? "text-green-600" : ""}`}
                        >
                          {transaction.type === "Disbursement" ? "+" : "-"}₹
                          {transaction.amount.toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Loan Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Loan Agreement",
                        type: "PDF",
                        date: "2023-05-20",
                        size: "1.2 MB",
                      },
                      {
                        name: "Gold Valuation Certificate",
                        type: "PDF",
                        date: "2023-05-18",
                        size: "0.8 MB",
                      },
                      {
                        name: "KYC Documents",
                        type: "ZIP",
                        date: "2023-05-15",
                        size: "3.5 MB",
                      },
                      {
                        name: "Disbursement Receipt",
                        type: "PDF",
                        date: "2023-05-20",
                        size: "0.5 MB",
                      },
                    ].map((doc, index) => (
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
                              {doc.type} • {doc.date} • {doc.size}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
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
