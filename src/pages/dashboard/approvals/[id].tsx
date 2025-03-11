import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MessageSquare,
  User,
  Calendar,
  Clock,
  FileText,
  ThumbsUp,
  ThumbsDown,
  Send,
  Paperclip,
  Eye,
  Download,
  Loader2,
} from "lucide-react";
import { DocumentViewer } from "@/components/document/document-viewer";
import { CommentThread } from "@/components/approval/comment-thread";
import { LoanApplicationView } from "@/components/approval/loan-application-view";

export default function ApprovalDetailPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("details");
  const [comment, setComment] = useState("");
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  // Mock data for the approval item
  const approvalItem = {
    id: id || "APP-10045678",
    type: "Loan Application",
    customer: {
      name: "Rahul Sharma",
      id: "CUS-10045682",
      phone: "+91 98765 43210",
      email: "rahul.sharma@example.com",
    },
    amount: "₹120,000",
    submittedDate: "June 16, 2023, 10:24 AM",
    status: "pending",
    assignedTo: "Amit Verma",
    priority: "high",
    loanDetails: {
      loanType: "Gold Loan",
      interestRate: "12%",
      tenure: "12 months",
      collateralValue: "₹160,000",
      ltvRatio: "75%",
      emiAmount: "₹10,674",
    },
    documents: [
      {
        name: "Loan Application Form",
        type: "PDF",
        size: "1.2 MB",
        uploadedOn: "June 16, 2023",
        status: "verified",
        url: "#",
      },
      {
        name: "ID Proof (Aadhaar Card)",
        type: "PDF",
        size: "0.8 MB",
        uploadedOn: "June 16, 2023",
        status: "verified",
        url: "#",
      },
      {
        name: "Address Proof",
        type: "PDF",
        size: "1.5 MB",
        uploadedOn: "June 16, 2023",
        status: "verified",
        url: "#",
      },
      {
        name: "Income Proof",
        type: "PDF",
        size: "2.1 MB",
        uploadedOn: "June 16, 2023",
        status: "pending",
        url: "#",
      },
      {
        name: "Gold Valuation Certificate",
        type: "PDF",
        size: "0.9 MB",
        uploadedOn: "June 16, 2023",
        status: "verified",
        url: "#",
      },
    ],
    collateral: [
      {
        type: "Gold Necklace",
        weight: "25g",
        purity: "22K",
        value: "₹100,000",
        itemCode: "GLD-NKL-001",
      },
      {
        type: "Gold Bangle",
        weight: "15g",
        purity: "22K",
        value: "₹60,000",
        itemCode: "GLD-BNG-002",
      },
    ],
    comments: [
      {
        id: 1,
        user: "Amit Verma",
        role: "Loan Officer",
        avatar: "AV",
        text: "Customer's KYC documents have been verified. Gold items have been assessed and valued.",
        timestamp: "June 16, 2023, 11:30 AM",
        attachments: [],
      },
      {
        id: 2,
        user: "Neha Gupta",
        role: "Branch Manager",
        avatar: "NG",
        text: "Please check the income proof document again. The salary slip seems to be from 3 months ago.",
        timestamp: "June 16, 2023, 12:15 PM",
        attachments: [],
      },
      {
        id: 3,
        user: "Amit Verma",
        role: "Loan Officer",
        avatar: "AV",
        text: "You're right. I've requested the customer to provide the latest salary slip. Will update once received.",
        timestamp: "June 16, 2023, 12:45 PM",
        attachments: [],
      },
    ],
    timeline: [
      {
        action: "Application Submitted",
        timestamp: "June 16, 2023, 10:24 AM",
        user: "System",
      },
      {
        action: "Assigned to Amit Verma",
        timestamp: "June 16, 2023, 10:30 AM",
        user: "System",
      },
      {
        action: "KYC Verification Completed",
        timestamp: "June 16, 2023, 11:15 AM",
        user: "Amit Verma",
      },
      {
        action: "Gold Assessment Completed",
        timestamp: "June 16, 2023, 11:45 AM",
        user: "Amit Verma",
      },
      {
        action: "Additional Document Requested",
        timestamp: "June 16, 2023, 12:45 PM",
        user: "Amit Verma",
      },
    ],
  };

  const handleApprove = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowApproveDialog(false);
      // In a real app, you would update the state or redirect
      alert("Application approved successfully!");
    }, 1500);
  };

  const handleReject = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowRejectDialog(false);
      // In a real app, you would update the state or redirect
      alert("Application rejected successfully!");
    }, 1500);
  };

  const handleAddComment = () => {
    if (!comment.trim()) return;
    // In a real app, you would add the comment to the state or send to API
    alert(`Comment added: ${comment}`);
    setComment("");
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
    <div className="flex-1 p-4 md:p-8 pt-6 space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Button variant="outline" size="sm" asChild>
          <a href="/dashboard/approvals">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Approvals
          </a>
        </Button>
      </div>

      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {approvalItem.id}
          </h2>
          <div className="flex items-center space-x-2 mt-1">
            {getStatusBadge(approvalItem.status)}
            <span className="text-muted-foreground">
              Submitted on {approvalItem.submittedDate}
            </span>
            {approvalItem.priority === "high" && (
              <Badge className="bg-red-100 text-red-800">High Priority</Badge>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <ThumbsUp className="h-4 w-4 mr-2" />
                Approve
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Approve Application</DialogTitle>
                <DialogDescription>
                  You are about to approve this application. This action cannot
                  be undone.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="mb-2 font-medium">Application Details:</p>
                <ul className="space-y-1 text-sm">
                  <li>
                    <span className="font-medium">ID:</span> {approvalItem.id}
                  </li>
                  <li>
                    <span className="font-medium">Type:</span>{" "}
                    {approvalItem.type}
                  </li>
                  <li>
                    <span className="font-medium">Customer:</span>{" "}
                    {approvalItem.customer.name}
                  </li>
                  <li>
                    <span className="font-medium">Amount:</span>{" "}
                    {approvalItem.amount}
                  </li>
                </ul>
                <Textarea
                  className="mt-4"
                  placeholder="Add approval notes (optional)"
                />
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowApproveDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={handleApprove}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Confirm Approval
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <ThumbsDown className="h-4 w-4 mr-2" />
                Reject
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reject Application</DialogTitle>
                <DialogDescription>
                  You are about to reject this application. This action cannot
                  be undone.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="mb-2 font-medium">Application Details:</p>
                <ul className="space-y-1 text-sm">
                  <li>
                    <span className="font-medium">ID:</span> {approvalItem.id}
                  </li>
                  <li>
                    <span className="font-medium">Type:</span>{" "}
                    {approvalItem.type}
                  </li>
                  <li>
                    <span className="font-medium">Customer:</span>{" "}
                    {approvalItem.customer.name}
                  </li>
                  <li>
                    <span className="font-medium">Amount:</span>{" "}
                    {approvalItem.amount}
                  </li>
                </ul>
                <div className="mt-4 space-y-2">
                  <label className="font-medium text-sm">
                    Rejection Reason:
                  </label>
                  <Select onValueChange={(value) => setRejectionReason(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="incomplete_documents">
                        Incomplete Documents
                      </SelectItem>
                      <SelectItem value="insufficient_income">
                        Insufficient Income
                      </SelectItem>
                      <SelectItem value="poor_credit_history">
                        Poor Credit History
                      </SelectItem>
                      <SelectItem value="collateral_issues">
                        Collateral Issues
                      </SelectItem>
                      <SelectItem value="policy_violation">
                        Policy Violation
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <Textarea
                    placeholder="Provide detailed rejection reason"
                    className="mt-2"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowRejectDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleReject}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <XCircle className="mr-2 h-4 w-4" />
                      Confirm Rejection
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button variant="outline">
            <MessageSquare className="h-4 w-4 mr-2" />
            Request Info
          </Button>
        </div>
      </div>

      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[600px] rounded-lg border"
      >
        <ResizablePanel defaultSize={40} minSize={30}>
          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="collateral">Collateral</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex-1 overflow-auto p-4">
              <div>
                {activeTab === "details" && (
                  <div className="mt-0 h-full">
                    <LoanApplicationView application={approvalItem} />
                  </div>
                )}

                {activeTab === "documents" && (
                  <div className="mt-0 h-full space-y-4">
                    {approvalItem.documents.map((doc, index) => (
                      <Card key={index}>
                        <CardContent className="p-4 flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="mr-3 rounded-full bg-muted p-1.5">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="font-medium">{doc.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {doc.type} • {doc.size} • Uploaded on{" "}
                                {doc.uploadedOn}
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
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {activeTab === "collateral" && (
                  <div className="mt-0 h-full space-y-4">
                    {approvalItem.collateral.map((item, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
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
                              <p className="text-sm text-muted-foreground">
                                Weight
                              </p>
                              <p className="font-medium">{item.weight}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Value
                              </p>
                              <p className="font-medium">{item.value}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <p className="font-medium">Total Collateral Value</p>
                          <p className="font-medium">
                            {approvalItem.loanDetails.collateralValue}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {activeTab === "timeline" && (
                  <div className="mt-0 h-full">
                    <div className="relative pl-6 border-l-2 border-muted ml-4 space-y-8">
                      {approvalItem.timeline.map((event, index) => (
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
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={60}>
          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
              <h3 className="font-medium">Document Viewer & Discussion</h3>
            </div>

            <div className="flex-1 overflow-auto">
              <Tabs defaultValue="viewer">
                <div className="px-4 pt-4">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="viewer">Document Viewer</TabsTrigger>
                    <TabsTrigger value="discussion">Discussion</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="viewer" className="p-4">
                  <DocumentViewer />
                </TabsContent>

                <TabsContent value="discussion" className="p-0">
                  <div className="flex flex-col h-[calc(100vh-250px)]">
                    <div className="flex-1 overflow-y-auto p-4">
                      <CommentThread comments={approvalItem.comments} />
                    </div>

                    <div className="border-t p-4">
                      <div className="flex space-x-2">
                        <Textarea
                          placeholder="Add a comment..."
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="min-h-[80px]"
                        />
                      </div>
                      <div className="flex justify-between mt-2">
                        <Button variant="outline" size="sm">
                          <Paperclip className="h-4 w-4 mr-2" />
                          Attach
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleAddComment}
                          disabled={!comment.trim()}
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Send
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
