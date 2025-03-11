import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomerInfoForm } from "./customer-info-form";
import { KycVerification } from "./kyc-verification";
import { GoldAssessment } from "./gold-assessment";
import { LoanTerms } from "./loan-terms";
import { ApplicationReview } from "./application-review";
import { CheckCircle, Circle } from "lucide-react";

const steps = [
  { id: "customer-info", title: "Customer Information" },
  { id: "kyc", title: "KYC Verification" },
  { id: "gold-assessment", title: "Gold Assessment" },
  { id: "loan-terms", title: "Loan Terms" },
  { id: "review", title: "Review & Submit" },
];

export function ApplicationWizard() {
  const [currentStep, setCurrentStep] = useState("customer-info");
  const [formData, setFormData] = useState({
    customerInfo: {},
    kycDocuments: [],
    goldItems: [],
    loanTerms: {},
  });
  const [formProgress, setFormProgress] = useState({
    "customer-info": false,
    kyc: false,
    "gold-assessment": false,
    "loan-terms": false,
    review: false,
  });

  const updateFormData = (step: string, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [step]: data,
    }));
    setFormProgress((prev) => ({
      ...prev,
      [step]: true,
    }));
  };

  const handleNext = () => {
    const currentIndex = steps.findIndex((step) => step.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    const currentIndex = steps.findIndex((step) => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  return (
    <div className="container mx-auto py-6 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Gold Loan Application
        </h1>
        <p className="text-muted-foreground">
          Complete the following steps to apply for a gold loan
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              <div className="flex items-center">
                {index > 0 && (
                  <div
                    className={`h-1 w-16 ${formProgress[steps[index - 1].id as keyof typeof formProgress] ? "bg-primary" : "bg-muted"}`}
                  />
                )}
                <div
                  className={`rounded-full p-2 ${currentStep === step.id ? "bg-primary text-primary-foreground" : formProgress[step.id as keyof typeof formProgress] ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  {formProgress[step.id as keyof typeof formProgress] ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 w-16 ${formProgress[step.id as keyof typeof formProgress] ? "bg-primary" : "bg-muted"}`}
                  />
                )}
              </div>
              <span
                className={`text-sm mt-2 ${currentStep === step.id ? "font-medium" : "text-muted-foreground"}`}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <Tabs value={currentStep} onValueChange={setCurrentStep}>
            <TabsContent value="customer-info">
              <CustomerInfoForm
                initialData={formData.customerInfo}
                onSave={(data) => updateFormData("customerInfo", data)}
              />
            </TabsContent>
            <TabsContent value="kyc">
              <KycVerification
                initialData={formData.kycDocuments}
                onSave={(data) => updateFormData("kycDocuments", data)}
              />
            </TabsContent>
            <TabsContent value="gold-assessment">
              <GoldAssessment
                initialData={formData.goldItems}
                onSave={(data) => updateFormData("goldItems", data)}
              />
            </TabsContent>
            <TabsContent value="loan-terms">
              <LoanTerms
                initialData={formData.loanTerms}
                goldItems={formData.goldItems}
                onSave={(data) => updateFormData("loanTerms", data)}
              />
            </TabsContent>
            <TabsContent value="review">
              <ApplicationReview formData={formData} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === "customer-info"}
        >
          Previous
        </Button>
        {currentStep !== "review" ? (
          <Button onClick={handleNext}>Next</Button>
        ) : (
          <Button>Submit Application</Button>
        )}
      </div>
    </div>
  );
}
