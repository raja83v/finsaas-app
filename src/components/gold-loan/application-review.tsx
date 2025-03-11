import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Download,
  Edit,
  FileText,
  HelpCircle,
  Loader2,
  Printer,
  ThumbsUp,
} from "lucide-react";

type ApplicationReviewProps = {
  formData: {
    customerInfo: any;
    kycDocuments: any[];
    goldItems: any[];
    loanTerms: any;
  };
};

export function ApplicationReview({ formData }: ApplicationReviewProps) {
  const [isCustomerInfoOpen, setIsCustomerInfoOpen] = useState(true);
  const [isKycOpen, setIsKycOpen] = useState(true);
  const [isGoldItemsOpen, setIsGoldItemsOpen] = useState(true);
  const [isLoanTermsOpen, setIsLoanTermsOpen] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const calculateTotalGoldValue = () => {
    if (!formData.goldItems || formData.goldItems.length === 0) return "0";

    return formData.goldItems
      .reduce((total, item) => {
        const value = parseFloat(
          calculateItemValue(item.weightGrams, item.purity),
        );
        return total + value;
      }, 0)
      .toFixed(2);
  };

  const calculateItemValue = (weight: number, purity: number) => {
    // Assuming market rate of ₹6000 per gram for 24K gold
    const marketRate = 6000;
    return (weight * (purity / 24) * marketRate).toFixed(2);
  };

  const handleSubmit = () => {
    if (!termsAccepted || !privacyAccepted) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowConfirmation(true);
    }, 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real app, this would generate a PDF
    alert("Downloading application summary as PDF...");
  };

  const isFormComplete = () => {
    const hasCustomerInfo =
      formData.customerInfo && Object.keys(formData.customerInfo).length > 0;
    const hasVerifiedKyc =
      formData.kycDocuments &&
      formData.kycDocuments.some((doc) => doc.status === "verified");
    const hasGoldItems = formData.goldItems && formData.goldItems.length > 0;
    const hasLoanTerms =
      formData.loanTerms && Object.keys(formData.loanTerms).length > 0;

    return hasCustomerInfo && hasVerifiedKyc && hasGoldItems && hasLoanTerms;
  };

  const getSectionStatus = (section: string) => {
    switch (section) {
      case "customerInfo":
        return formData.customerInfo &&
          Object.keys(formData.customerInfo).length > 0
          ? "complete"
          : "incomplete";
      case "kyc":
        return formData.kycDocuments &&
          formData.kycDocuments.some((doc) => doc.status === "verified")
          ? "complete"
          : "incomplete";
      case "goldItems":
        return formData.goldItems && formData.goldItems.length > 0
          ? "complete"
          : "incomplete";
      case "loanTerms":
        return formData.loanTerms && Object.keys(formData.loanTerms).length > 0
          ? "complete"
          : "incomplete";
      default:
        return "incomplete";
    }
  };

  return (
    <div className="space-y-6">
      {/* Sticky Navigation */}
      <div className="sticky top-0 z-10 bg-background pt-4 pb-2 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight">
            Application Review
          </h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-2">
          <span>Application</span>
          <span>/</span>
          <span>Customer Information</span>
          <span>/</span>
          <span>KYC Verification</span>
          <span>/</span>
          <span>Gold Assessment</span>
          <span>/</span>
          <span>Loan Terms</span>
          <span>/</span>
          <span className="font-medium text-foreground">Review & Submit</span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Customer Information Section */}
        <Collapsible
          open={isCustomerInfoOpen}
          onOpenChange={setIsCustomerInfoOpen}
          className="border rounded-md overflow-hidden"
        >
          <div className="bg-muted/50 p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 hover:bg-transparent"
                  >
                    {isCustomerInfoOpen ? (
                      <ChevronUp className="h-4 w-4 mr-2" />
                    ) : (
                      <ChevronDown className="h-4 w-4 mr-2" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <h3 className="text-lg font-medium">Customer Information</h3>
                <Badge
                  variant={
                    getSectionStatus("customerInfo") === "complete"
                      ? "default"
                      : "outline"
                  }
                  className="ml-2"
                >
                  {getSectionStatus("customerInfo") === "complete"
                    ? "Complete"
                    : "Incomplete"}
                </Badge>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <a href="#customer-info">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </a>
              </Button>
            </div>
          </div>
          <CollapsibleContent>
            <CardContent className="p-4 space-y-4">
              {formData.customerInfo ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">
                      Personal Details
                    </h4>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium">Name: </span>
                        <span>
                          {formData.customerInfo.firstName}{" "}
                          {formData.customerInfo.lastName}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-medium">ID Type: </span>
                        <span>{formData.customerInfo.idType}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium">ID Number: </span>
                        <span>{formData.customerInfo.idNumber}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">
                      Contact Information
                    </h4>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium">Email: </span>
                        <span>{formData.customerInfo.email}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Phone: </span>
                        <span>{formData.customerInfo.phone}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Address: </span>
                        <span>
                          {formData.customerInfo.address},{" "}
                          {formData.customerInfo.city},{" "}
                          {formData.customerInfo.state},{" "}
                          {formData.customerInfo.pincode}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  No customer information provided. Please complete this
                  section.
                </div>
              )}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>

        {/* KYC Verification Section */}
        <Collapsible
          open={isKycOpen}
          onOpenChange={setIsKycOpen}
          className="border rounded-md overflow-hidden"
        >
          <div className="bg-muted/50 p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 hover:bg-transparent"
                  >
                    {isKycOpen ? (
                      <ChevronUp className="h-4 w-4 mr-2" />
                    ) : (
                      <ChevronDown className="h-4 w-4 mr-2" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <h3 className="text-lg font-medium">KYC Verification</h3>
                <Badge
                  variant={
                    getSectionStatus("kyc") === "complete"
                      ? "default"
                      : "outline"
                  }
                  className="ml-2"
                >
                  {getSectionStatus("kyc") === "complete"
                    ? "Complete"
                    : "Incomplete"}
                </Badge>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <a href="#kyc">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </a>
              </Button>
            </div>
          </div>
          <CollapsibleContent>
            <CardContent className="p-4">
              {formData.kycDocuments && formData.kycDocuments.length > 0 ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formData.kycDocuments.map((doc, index) => (
                      <div
                        key={index}
                        className="border rounded-md p-3 flex items-start space-x-3"
                      >
                        <div className="rounded-full bg-muted p-1.5">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h4 className="text-sm font-medium">{doc.name}</h4>
                            <Badge
                              variant={
                                doc.status === "verified"
                                  ? "default"
                                  : "outline"
                              }
                              className={
                                doc.status === "verified"
                                  ? "bg-green-100 text-green-800"
                                  : ""
                              }
                            >
                              {doc.status === "verified"
                                ? "Verified"
                                : doc.status === "uploaded"
                                  ? "Uploaded"
                                  : "Pending"}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {doc.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  No KYC documents uploaded. Please complete this section.
                </div>
              )}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>

        {/* Gold Items Section */}
        <Collapsible
          open={isGoldItemsOpen}
          onOpenChange={setIsGoldItemsOpen}
          className="border rounded-md overflow-hidden"
        >
          <div className="bg-muted/50 p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 hover:bg-transparent"
                  >
                    {isGoldItemsOpen ? (
                      <ChevronUp className="h-4 w-4 mr-2" />
                    ) : (
                      <ChevronDown className="h-4 w-4 mr-2" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <h3 className="text-lg font-medium">Gold Assessment</h3>
                <Badge
                  variant={
                    getSectionStatus("goldItems") === "complete"
                      ? "default"
                      : "outline"
                  }
                  className="ml-2"
                >
                  {getSectionStatus("goldItems") === "complete"
                    ? "Complete"
                    : "Incomplete"}
                </Badge>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <a href="#gold-assessment">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </a>
              </Button>
            </div>
          </div>
          <CollapsibleContent>
            <CardContent className="p-4">
              {formData.goldItems && formData.goldItems.length > 0 ? (
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-4 font-medium">
                            Item Type
                          </th>
                          <th className="text-left py-2 px-4 font-medium">
                            Description
                          </th>
                          <th className="text-left py-2 px-4 font-medium">
                            Weight (g)
                          </th>
                          <th className="text-left py-2 px-4 font-medium">
                            Purity (K)
                          </th>
                          <th className="text-right py-2 px-4 font-medium">
                            Value (₹)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.goldItems.map((item, index) => (
                          <tr
                            key={index}
                            className="border-b hover:bg-muted/50"
                          >
                            <td className="py-2 px-4">{item.type}</td>
                            <td className="py-2 px-4">{item.description}</td>
                            <td className="py-2 px-4">{item.weightGrams}</td>
                            <td className="py-2 px-4">{item.purity}</td>
                            <td className="py-2 px-4 text-right">
                              ₹
                              {calculateItemValue(
                                item.weightGrams,
                                item.purity,
                              )}
                            </td>
                          </tr>
                        ))}
                        <tr className="font-medium">
                          <td colSpan={4} className="py-2 px-4 text-right">
                            Total Value:
                          </td>
                          <td className="py-2 px-4 text-right">
                            ₹{calculateTotalGoldValue()}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  No gold items added. Please complete this section.
                </div>
              )}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>

        {/* Loan Terms Section */}
        <Collapsible
          open={isLoanTermsOpen}
          onOpenChange={setIsLoanTermsOpen}
          className="border rounded-md overflow-hidden"
        >
          <div className="bg-muted/50 p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 hover:bg-transparent"
                  >
                    {isLoanTermsOpen ? (
                      <ChevronUp className="h-4 w-4 mr-2" />
                    ) : (
                      <ChevronDown className="h-4 w-4 mr-2" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <h3 className="text-lg font-medium">Loan Terms</h3>
                <Badge
                  variant={
                    getSectionStatus("loanTerms") === "complete"
                      ? "default"
                      : "outline"
                  }
                  className="ml-2"
                >
                  {getSectionStatus("loanTerms") === "complete"
                    ? "Complete"
                    : "Incomplete"}
                </Badge>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <a href="#loan-terms">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </a>
              </Button>
            </div>
          </div>
          <CollapsibleContent>
            <CardContent className="p-4">
              {formData.loanTerms &&
              Object.keys(formData.loanTerms).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">
                      Loan Details
                    </h4>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium">
                          Loan Amount:{" "}
                        </span>
                        <span>₹{formData.loanTerms.loanAmount}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium">
                          Interest Rate:{" "}
                        </span>
                        <span>{formData.loanTerms.interestRate}%</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Loan Term: </span>
                        <span>{formData.loanTerms.loanTerm} months</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium">
                          EMI Amount:{" "}
                        </span>
                        <span>₹{formData.loanTerms.emiAmount}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">
                      Loan Summary
                    </h4>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium">
                          Total Interest:{" "}
                        </span>
                        <span>₹{formData.loanTerms.totalInterest}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium">
                          Total Repayment:{" "}
                        </span>
                        <span>₹{formData.loanTerms.totalRepayment}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium">LTV Ratio: </span>
                        <span>{formData.loanTerms.ltvRatio}%</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium">
                          Processing Fee:{" "}
                        </span>
                        <span>₹{formData.loanTerms.processingFee}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  No loan terms configured. Please complete this section.
                </div>
              )}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>

        {/* Terms and Conditions */}
        <Card>
          <CardHeader>
            <CardTitle>Terms and Conditions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border rounded-md p-4 max-h-60 overflow-y-auto text-sm">
              <h4 className="font-medium mb-2">Gold Loan Agreement</h4>
              <p className="mb-2">
                This Gold Loan Agreement ("Agreement") is entered into between
                Golden Trust Finance ("Lender") and the applicant ("Borrower")
                as identified in this application.
              </p>

              <h5 className="font-medium mt-4 mb-1">1. Loan Details</h5>
              <p>
                The Lender agrees to provide a loan to the Borrower based on the
                value of the gold items pledged as collateral, subject to the
                terms and conditions specified in this Agreement.
              </p>

              <h5 className="font-medium mt-4 mb-1">
                2. Interest and Repayment
              </h5>
              <p>
                The Borrower agrees to repay the loan amount along with the
                applicable interest as per the repayment schedule. The interest
                will be calculated on a reducing balance basis.
              </p>

              <h5 className="font-medium mt-4 mb-1">3. Collateral</h5>
              <p>
                The Borrower pledges the gold items described in this
                application as collateral for the loan. The Lender will hold the
                collateral until the loan is fully repaid.
              </p>

              <h5 className="font-medium mt-4 mb-1">4. Default</h5>
              <p>
                If the Borrower fails to make repayments as per the schedule,
                the Lender reserves the right to take possession of the
                collateral and liquidate it to recover the outstanding amount.
              </p>

              <h5 className="font-medium mt-4 mb-1">5. Prepayment</h5>
              <p>
                The Borrower may prepay the loan in part or in full before the
                end of the loan term, subject to applicable prepayment charges.
              </p>

              <h5 className="font-medium mt-4 mb-1">6. Governing Law</h5>
              <p>This Agreement shall be governed by the laws of India.</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) =>
                    setTermsAccepted(checked as boolean)
                  }
                />
                <Label htmlFor="terms" className="text-sm">
                  I have read and agree to the terms and conditions of the Gold
                  Loan Agreement
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="privacy"
                  checked={privacyAccepted}
                  onCheckedChange={(checked) =>
                    setPrivacyAccepted(checked as boolean)
                  }
                />
                <Label htmlFor="privacy" className="text-sm">
                  I consent to the collection and processing of my personal
                  information as described in the Privacy Policy
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Your personal information will be used to process your
                        loan application and for regulatory compliance purposes.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Validation Alert */}
        {!isFormComplete() && (
          <Alert variant="destructive">
            <AlertTitle>Incomplete Application</AlertTitle>
            <AlertDescription>
              Please complete all required sections before submitting your
              application.
            </AlertDescription>
          </Alert>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={
              !isFormComplete() ||
              !termsAccepted ||
              !privacyAccepted ||
              isSubmitting
            }
            className="w-full md:w-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Application Submitted Successfully!</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-4">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-center mb-4">
              Your gold loan application has been submitted successfully. Your
              application number is{" "}
              <strong>GL-APP-{Math.floor(Math.random() * 1000000)}</strong>.
            </p>
            <p className="text-sm text-muted-foreground text-center">
              Our team will review your application and contact you within 24
              hours with the next steps.
            </p>
          </div>
          <DialogFooter>
            <Button
              onClick={() => (window.location.href = "/dashboard")}
              className="w-full"
            >
              <ThumbsUp className="mr-2 h-4 w-4" />
              Return to Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
