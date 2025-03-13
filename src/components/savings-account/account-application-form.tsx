import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/hooks/useAuth";
import { useClient } from "@/hooks/useClient";
import { createAccountApplication, getAccountTypes } from "@/api/accounts";
import { getCustomers } from "@/api/customers";
import { AccountType, Customer } from "@/api";
import { ArrowLeft, ArrowRight, Check, Save, Upload } from "lucide-react";

const nomineeSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  relationship: z
    .string()
    .min(2, { message: "Relationship must be at least 2 characters." }),
  dateOfBirth: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  idType: z.string().optional(),
  idNumber: z.string().optional(),
  percentage: z.number().min(1).max(100).default(100),
});

const formSchema = z.object({
  customerId: z.string().min(1, { message: "Customer is required" }),
  accountTypeId: z.string().min(1, { message: "Account type is required" }),
  initialDeposit: z
    .number()
    .min(0, { message: "Initial deposit must be a positive number" }),
  operatingInstructions: z
    .enum(["single", "either_or", "jointly"])
    .default("single"),
  statementFrequency: z
    .enum(["monthly", "quarterly", "annually"])
    .default("monthly"),
  statementDelivery: z.enum(["email", "physical", "both"]).default("email"),
  termsAccepted: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  nominees: z.array(nomineeSchema).optional(),
});

export function AccountApplicationForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [accountTypes, setAccountTypes] = useState<AccountType[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const { user } = useAuth();
  const { client } = useClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerId: "",
      accountTypeId: "",
      initialDeposit: 0,
      operatingInstructions: "single",
      statementFrequency: "monthly",
      statementDelivery: "email",
      termsAccepted: false,
      nominees: [],
    },
  });

  // Load customers and account types
  useState(() => {
    const loadData = async () => {
      if (client?.id) {
        try {
          const customersData = await getCustomers(client.id);
          setCustomers(customersData);

          const accountTypesData = await getAccountTypes(client.id);
          setAccountTypes(accountTypesData);
        } catch (error) {
          console.error("Error loading data:", error);
        }
      }
    };

    loadData();
  });

  // Update selected customer when customerId changes
  const customerId = form.watch("customerId");
  useState(() => {
    if (customerId) {
      const customer = customers.find((c) => c.id === customerId);
      setSelectedCustomer(customer || null);
    } else {
      setSelectedCustomer(null);
    }
  }, [customerId, customers]);

  const nextStep = () => {
    if (step === 1) {
      const isValid = form.trigger([
        "customerId",
        "accountTypeId",
        "initialDeposit",
      ]);
      if (isValid) {
        setStep(2);
      }
    } else if (step === 2) {
      const isValid = form.trigger([
        "operatingInstructions",
        "statementFrequency",
        "statementDelivery",
      ]);
      if (isValid) {
        setStep(3);
      }
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!client?.id || !user) return;

    setIsSubmitting(true);
    try {
      const applicationData = {
        client_id: client.id,
        customer_id: values.customerId,
        account_type_id: values.accountTypeId,
        initial_deposit: values.initialDeposit,
        status: "pending",
        application_data: {
          operating_instructions: values.operatingInstructions,
          statement_frequency: values.statementFrequency,
          statement_delivery: values.statementDelivery,
          nominees: values.nominees,
        },
      };

      await createAccountApplication(applicationData);
      alert("Account application submitted successfully!");
      // Redirect to accounts list or show success message
      window.location.href = "/dashboard/accounts";
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Error submitting application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          New Savings Account Application
        </h1>
        <p className="text-muted-foreground">
          Complete the following steps to open a new savings account
        </p>
      </div>

      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Application Progress</span>
          <span className="text-sm font-medium">Step {step} of 3</span>
        </div>
        <Progress value={(step / 3) * 100} className="h-2" />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              {step === 1 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Account Details</h2>
                    <Separator />

                    <FormField
                      control={form.control}
                      name="customerId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Customer</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select customer" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {customers.map((customer) => (
                                <SelectItem
                                  key={customer.id}
                                  value={customer.id}
                                >
                                  {customer.first_name} {customer.last_name} (
                                  {customer.phone})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Select the customer for whom this account will be
                            opened
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {selectedCustomer && (
                      <div className="bg-muted/50 p-4 rounded-md">
                        <h3 className="font-medium mb-2">
                          Customer Information
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Name:</span>{" "}
                            {selectedCustomer.first_name}{" "}
                            {selectedCustomer.last_name}
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Phone:
                            </span>{" "}
                            {selectedCustomer.phone}
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Email:
                            </span>{" "}
                            {selectedCustomer.email}
                          </div>
                          <div>
                            <span className="text-muted-foreground">ID:</span>{" "}
                            {selectedCustomer.id_type}:{" "}
                            {selectedCustomer.id_number}
                          </div>
                        </div>
                      </div>
                    )}

                    <FormField
                      control={form.control}
                      name="accountTypeId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select account type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {accountTypes.map((type) => (
                                <SelectItem key={type.id} value={type.id}>
                                  {type.name} - {type.interest_rate}% p.a.
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Choose the type of savings account
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="initialDeposit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Initial Deposit Amount</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0.00"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value) || 0)
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            Enter the initial deposit amount for this account
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">
                      Account Preferences
                    </h2>
                    <Separator />

                    <FormField
                      control={form.control}
                      name="operatingInstructions"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Operating Instructions</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="single" id="single" />
                                <Label htmlFor="single">
                                  Single (Primary account holder only)
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="either_or"
                                  id="either_or"
                                />
                                <Label htmlFor="either_or">
                                  Either or Survivor (Any account holder can
                                  operate)
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="jointly" id="jointly" />
                                <Label htmlFor="jointly">
                                  Jointly (All account holders must authorize)
                                </Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormDescription>
                            Specify how the account will be operated
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="statementFrequency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Statement Frequency</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select frequency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="quarterly">
                                Quarterly
                              </SelectItem>
                              <SelectItem value="annually">Annually</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            How often would you like to receive account
                            statements?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="statementDelivery"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Statement Delivery Method</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select delivery method" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="physical">
                                Physical (Mail)
                              </SelectItem>
                              <SelectItem value="both">
                                Both Email and Physical
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            How would you like to receive your statements?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Nominee Details</h2>
                    <Separator />

                    <div className="bg-muted/50 p-4 rounded-md">
                      <h3 className="font-medium mb-2">
                        Add Nominee (Optional)
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        A nominee is the person who will receive the account
                        balance in case of the account holder's demise.
                      </p>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nominee-first-name">First Name</Label>
                          <Input
                            id="nominee-first-name"
                            placeholder="First name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="nominee-last-name">Last Name</Label>
                          <Input
                            id="nominee-last-name"
                            placeholder="Last name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="nominee-relationship">
                            Relationship
                          </Label>
                          <Input
                            id="nominee-relationship"
                            placeholder="e.g. Spouse, Child, Parent"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="nominee-dob">Date of Birth</Label>
                          <Input id="nominee-dob" type="date" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="nominee-phone">Phone Number</Label>
                          <Input
                            id="nominee-phone"
                            placeholder="Phone number"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="nominee-email">Email</Label>
                          <Input
                            id="nominee-email"
                            type="email"
                            placeholder="Email address"
                          />
                        </div>
                      </div>

                      <Button type="button" variant="outline" className="mt-4">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload ID Proof
                      </Button>
                    </div>

                    <div className="space-y-4 mt-6">
                      <h2 className="text-xl font-semibold">
                        Terms & Conditions
                      </h2>
                      <Separator />

                      <div className="border rounded-md p-4 max-h-60 overflow-y-auto text-sm">
                        <h4 className="font-medium mb-2">
                          Savings Account Agreement
                        </h4>
                        <p className="mb-2">
                          This Savings Account Agreement ("Agreement") is
                          entered into between GoldFin ("Bank") and the
                          applicant ("Account Holder") as identified in this
                          application.
                        </p>

                        <h5 className="font-medium mt-4 mb-1">
                          1. Account Opening
                        </h5>
                        <p>
                          The Bank agrees to open a savings account for the
                          Account Holder subject to the terms and conditions
                          specified in this Agreement and in accordance with
                          applicable banking regulations.
                        </p>

                        <h5 className="font-medium mt-4 mb-1">
                          2. Interest and Fees
                        </h5>
                        <p>
                          The Account Holder will earn interest on the balance
                          maintained in the account as per the prevailing
                          interest rates. The Bank reserves the right to modify
                          the interest rates from time to time.
                        </p>

                        <h5 className="font-medium mt-4 mb-1">
                          3. Deposits and Withdrawals
                        </h5>
                        <p>
                          The Account Holder may make deposits and withdrawals
                          subject to the Bank's policies and procedures. The
                          Bank may impose limits on transactions and may require
                          notice for large withdrawals.
                        </p>

                        <h5 className="font-medium mt-4 mb-1">
                          4. Account Statements
                        </h5>
                        <p>
                          The Bank will provide periodic statements as per the
                          frequency chosen by the Account Holder. The Account
                          Holder is responsible for reviewing the statements and
                          reporting any discrepancies within 30 days.
                        </p>

                        <h5 className="font-medium mt-4 mb-1">
                          5. Dormant Accounts
                        </h5>
                        <p>
                          Accounts with no customer-initiated transactions for
                          24 consecutive months will be classified as dormant.
                          Dormant accounts may be subject to different
                          procedures and fees.
                        </p>

                        <h5 className="font-medium mt-4 mb-1">
                          6. Governing Law
                        </h5>
                        <p>
                          This Agreement shall be governed by the applicable
                          banking laws and regulations.
                        </p>
                      </div>

                      <FormField
                        control={form.control}
                        name="termsAccepted"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                I have read and agree to the terms and
                                conditions
                              </FormLabel>
                              <FormDescription>
                                By checking this box, you confirm that you have
                                read and agree to our terms of service and
                                privacy policy.
                              </FormDescription>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={step === 1}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {step < 3 ? (
                <Button type="button" onClick={nextStep}>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Submit Application
                    </>
                  )}
                </Button>
              )}
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
