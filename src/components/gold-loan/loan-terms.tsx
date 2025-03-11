import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Info,
  HelpCircle,
  Check,
  Download,
  Calendar,
  Coins,
  Calculator,
  FileText,
  ChevronDown,
  ChevronUp,
  PenLine,
} from "lucide-react";

type LoanTermsProps = {
  initialData: any;
  goldItems: any[];
  onSave: (data: any) => void;
};

export function LoanTerms({ initialData, goldItems, onSave }: LoanTermsProps) {
  const [loanAmount, setLoanAmount] = useState(initialData?.loanAmount || 0);
  const [interestRate, setInterestRate] = useState(
    initialData?.interestRate || 12,
  );
  const [loanTerm, setLoanTerm] = useState(initialData?.loanTerm || 12);
  const [repaymentFrequency, setRepaymentFrequency] = useState(
    initialData?.repaymentFrequency || "monthly",
  );
  const [processingFeePercent, setProcessingFeePercent] = useState(
    initialData?.processingFeePercent || 1,
  );
  const [ltvRatio, setLtvRatio] = useState(initialData?.ltvRatio || 75);
  const [selectedOption, setSelectedOption] = useState(
    initialData?.selectedOption || "option2",
  );
  const [showPaymentSchedule, setShowPaymentSchedule] = useState(false);
  const [signatureData, setSignatureData] = useState(
    initialData?.signatureData || "",
  );
  const [isSaving, setIsSaving] = useState(false);

  const totalGoldValue =
    goldItems?.reduce((total, item) => {
      // Assuming market rate of ₹6000 per gram for 24K gold
      const marketRate = 6000;
      const itemValue = item.weightGrams * (item.purity / 24) * marketRate;
      return total + itemValue;
    }, 0) || 0;

  const maxLoanAmount = (totalGoldValue * ltvRatio) / 100;

  useEffect(() => {
    // Adjust loan amount if it exceeds the maximum allowed based on LTV
    if (loanAmount > maxLoanAmount) {
      setLoanAmount(maxLoanAmount);
    }
  }, [ltvRatio, maxLoanAmount]);

  // Calculate EMI using the formula: P * r * (1+r)^n / ((1+r)^n - 1)
  const calculateEMI = () => {
    const p = loanAmount;
    const r = interestRate / 100 / 12; // Monthly interest rate
    const n = loanTerm; // Number of months

    if (p === 0 || r === 0 || n === 0) return 0;

    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };

  const emiAmount = calculateEMI();
  const totalRepayment = emiAmount * loanTerm;
  const totalInterest = totalRepayment - loanAmount;
  const processingFee = (loanAmount * processingFeePercent) / 100;

  const generatePaymentSchedule = () => {
    let schedule = [];
    let remainingPrincipal = loanAmount;
    let paymentDate = new Date();

    for (let i = 1; i <= loanTerm; i++) {
      paymentDate = new Date(paymentDate.setMonth(paymentDate.getMonth() + 1));
      const interestPayment = remainingPrincipal * (interestRate / 100 / 12);
      const principalPayment = emiAmount - interestPayment;
      remainingPrincipal -= principalPayment;

      schedule.push({
        paymentNumber: i,
        paymentDate: paymentDate.toLocaleDateString(),
        emiAmount: emiAmount,
        principalPayment: principalPayment,
        interestPayment: interestPayment,
        remainingPrincipal: Math.max(0, remainingPrincipal),
      });
    }

    return schedule;
  };

  const paymentSchedule = generatePaymentSchedule();

  const handleSave = () => {
    setIsSaving(true);

    const loanTermsData = {
      loanAmount,
      interestRate,
      loanTerm,
      repaymentFrequency,
      processingFeePercent,
      ltvRatio,
      selectedOption,
      emiAmount,
      totalRepayment,
      totalInterest,
      processingFee,
      signatureData,
      paymentSchedule,
    };

    setTimeout(() => {
      onSave(loanTermsData);
      setIsSaving(false);
    }, 1000);
  };

  const loanOptions = [
    {
      id: "option1",
      title: "Standard Loan",
      interestRate: 12,
      loanTerm: 12,
      ltvRatio: 65,
      processingFee: 1,
      description:
        "Our standard gold loan with balanced interest rate and LTV ratio.",
    },
    {
      id: "option2",
      title: "Premium Loan",
      interestRate: 10.5,
      loanTerm: 24,
      ltvRatio: 75,
      processingFee: 1.5,
      description:
        "Higher LTV ratio with longer repayment period and lower interest rate.",
    },
    {
      id: "option3",
      title: "Quick Loan",
      interestRate: 14,
      loanTerm: 6,
      ltvRatio: 60,
      processingFee: 0.5,
      description:
        "Short-term loan with faster processing and minimal documentation.",
    },
  ];

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    const option = loanOptions.find((opt) => opt.id === optionId);
    if (option) {
      setInterestRate(option.interestRate);
      setLoanTerm(option.loanTerm);
      setLtvRatio(option.ltvRatio);
      setProcessingFeePercent(option.processingFee);
      // Recalculate loan amount based on new LTV
      const newMaxLoanAmount = (totalGoldValue * option.ltvRatio) / 100;
      setLoanAmount(Math.min(loanAmount, newMaxLoanAmount));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">
            Loan Terms Configuration
          </h2>
          <p className="text-muted-foreground">
            Configure your gold loan terms and review repayment schedule
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Terms"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Loan Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup
                value={selectedOption}
                onValueChange={handleOptionSelect}
              >
                {loanOptions.map((option) => (
                  <div key={option.id} className="flex items-start space-x-2">
                    <RadioGroupItem
                      value={option.id}
                      id={option.id}
                      className="mt-1"
                    />
                    <div className="grid gap-1.5">
                      <Label htmlFor={option.id} className="font-medium">
                        {option.title}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {option.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {option.interestRate}% Interest
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {option.loanTerm} Months
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {option.ltvRatio}% LTV
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </RadioGroup>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Gold Value</Label>
                  <span className="font-medium">
                    ₹{totalGoldValue.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <Label>Maximum Loan Amount</Label>
                  <span className="font-medium">
                    ₹{maxLoanAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Loan Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <Label htmlFor="loan-amount">Loan Amount (₹)</Label>
                    <span>{Math.round(loanAmount).toLocaleString()}</span>
                  </div>
                  <Slider
                    id="loan-amount"
                    min={1000}
                    max={maxLoanAmount}
                    step={1000}
                    value={[loanAmount]}
                    onValueChange={(value) => setLoanAmount(value[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>₹1,000</span>
                    <span>₹{maxLoanAmount.toLocaleString()}</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <Label htmlFor="interest-rate">Interest Rate (%)</Label>
                    <span>{interestRate}%</span>
                  </div>
                  <Slider
                    id="interest-rate"
                    min={8}
                    max={16}
                    step={0.5}
                    value={[interestRate]}
                    onValueChange={(value) => setInterestRate(value[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>8%</span>
                    <span>16%</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <Label htmlFor="loan-term">Loan Term (Months)</Label>
                    <span>{loanTerm} months</span>
                  </div>
                  <Slider
                    id="loan-term"
                    min={3}
                    max={36}
                    step={3}
                    value={[loanTerm]}
                    onValueChange={(value) => setLoanTerm(value[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>3 months</span>
                    <span>36 months</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <Label htmlFor="ltv-ratio">LTV Ratio (%)</Label>
                    <span>{ltvRatio}%</span>
                  </div>
                  <Slider
                    id="ltv-ratio"
                    min={50}
                    max={80}
                    step={5}
                    value={[ltvRatio]}
                    onValueChange={(value) => setLtvRatio(value[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>50%</span>
                    <span>80%</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground mr-1" />
                    <span className="text-xs text-muted-foreground">
                      Loan-to-Value ratio determines the maximum loan amount
                      based on gold value
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-sm">
                    Monthly EMI
                  </Label>
                  <p className="text-2xl font-bold">
                    ₹{emiAmount.toLocaleString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-sm">
                    Total Repayment
                  </Label>
                  <p className="text-2xl font-bold">
                    ₹{totalRepayment.toLocaleString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-sm">
                    Total Interest
                  </Label>
                  <p className="text-lg font-medium">
                    ₹{totalInterest.toLocaleString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-sm">
                    Processing Fee
                  </Label>
                  <p className="text-lg font-medium">
                    ₹{processingFee.toLocaleString()} ({processingFeePercent}%)
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={() => setShowPaymentSchedule(!showPaymentSchedule)}
                  className="flex items-center"
                >
                  {showPaymentSchedule ? (
                    <ChevronUp className="h-4 w-4 mr-2" />
                  ) : (
                    <ChevronDown className="h-4 w-4 mr-2" />
                  )}
                  {showPaymentSchedule
                    ? "Hide Payment Schedule"
                    : "View Payment Schedule"}
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Amortization
                </Button>
              </div>

              {showPaymentSchedule && (
                <div className="border rounded-md overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="text-left py-2 px-4 font-medium text-sm">
                            No.
                          </th>
                          <th className="text-left py-2 px-4 font-medium text-sm">
                            Date
                          </th>
                          <th className="text-right py-2 px-4 font-medium text-sm">
                            EMI
                          </th>
                          <th className="text-right py-2 px-4 font-medium text-sm">
                            Principal
                          </th>
                          <th className="text-right py-2 px-4 font-medium text-sm">
                            Interest
                          </th>
                          <th className="text-right py-2 px-4 font-medium text-sm">
                            Balance
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {paymentSchedule.slice(0, 6).map((payment) => (
                          <tr
                            key={payment.paymentNumber}
                            className="border-t hover:bg-muted/50"
                          >
                            <td className="py-2 px-4 text-sm">
                              {payment.paymentNumber}
                            </td>
                            <td className="py-2 px-4 text-sm">
                              {payment.paymentDate}
                            </td>
                            <td className="py-2 px-4 text-sm text-right">
                              ₹{Math.round(payment.emiAmount).toLocaleString()}
                            </td>
                            <td className="py-2 px-4 text-sm text-right">
                              ₹
                              {Math.round(
                                payment.principalPayment,
                              ).toLocaleString()}
                            </td>
                            <td className="py-2 px-4 text-sm text-right">
                              ₹
                              {Math.round(
                                payment.interestPayment,
                              ).toLocaleString()}
                            </td>
                            <td className="py-2 px-4 text-sm text-right">
                              ₹
                              {Math.round(
                                payment.remainingPrincipal,
                              ).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                        {paymentSchedule.length > 6 && (
                          <tr className="border-t">
                            <td
                              colSpan={6}
                              className="py-2 px-4 text-center text-sm text-muted-foreground"
                            >
                              ... {paymentSchedule.length - 6} more payments
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Terms Acceptance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4 bg-muted/30 text-sm">
                  <p>By accepting these terms, I acknowledge that:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>
                      The gold items I have pledged will be held as collateral
                      until the loan is fully repaid.
                    </li>
                    <li>
                      I am responsible for making timely repayments according to
                      the schedule.
                    </li>
                    <li>
                      If I default on the loan, the lender has the right to
                      liquidate the collateral.
                    </li>
                    <li>
                      The loan terms, including interest rate and repayment
                      schedule, have been explained to me.
                    </li>
                  </ul>
                </div>

                <div className="border rounded-md p-4 flex flex-col items-center">
                  <Label className="mb-2">Signature</Label>
                  <div className="border-2 border-dashed rounded-md w-full h-32 flex items-center justify-center bg-muted/20 mb-2">
                    {signatureData ? (
                      <img
                        src={signatureData}
                        alt="Signature"
                        className="max-h-full"
                      />
                    ) : (
                      <div className="text-center text-muted-foreground">
                        <PenLine className="h-8 w-8 mx-auto mb-2" />
                        <p className="text-sm">Click to sign here</p>
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Clear
                    </Button>
                    <Button size="sm">Capture Signature</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
