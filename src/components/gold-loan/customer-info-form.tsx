import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { HelpCircle, Save, ChevronDown, ChevronUp } from "lucide-react";

const phoneRegex = /^\+?[1-9]\d{9,14}$/;

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z
    .string()
    .regex(phoneRegex, { message: "Please enter a valid phone number." }),
  idType: z.enum(["aadhaar", "pan", "passport", "voter", "driving"]),
  idNumber: z
    .string()
    .min(5, { message: "ID number must be at least 5 characters." }),
  address: z
    .string()
    .min(10, { message: "Address must be at least 10 characters." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  state: z.string().min(2, { message: "State must be at least 2 characters." }),
  pincode: z
    .string()
    .min(6, { message: "Pincode must be at least 6 characters." }),
});

type CustomerInfoFormProps = {
  initialData: any;
  onSave: (data: any) => void;
};

export function CustomerInfoForm({
  initialData,
  onSave,
}: CustomerInfoFormProps) {
  const [isPersonalInfoOpen, setIsPersonalInfoOpen] = useState(true);
  const [isContactInfoOpen, setIsContactInfoOpen] = useState(true);
  const [isAddressInfoOpen, setIsAddressInfoOpen] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<
    null | "saving" | "saved"
  >(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      idType: "aadhaar",
      idNumber: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    },
  });

  // Auto-save functionality
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (Object.keys(form.formState.dirtyFields).length > 0) {
        setAutoSaveStatus("saving");
        const timer = setTimeout(() => {
          onSave(value);
          setAutoSaveStatus("saved");
          setTimeout(() => setAutoSaveStatus(null), 2000);
        }, 1000);
        return () => clearTimeout(timer);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onSave]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSaving(true);
    setTimeout(() => {
      onSave(values);
      setIsSaving(false);
    }, 1000);
  }

  // Format phone number as user types
  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");

    // Format with proper spacing/grouping
    if (digits.length <= 5) {
      return digits;
    } else if (digits.length <= 8) {
      return `${digits.slice(0, 5)}-${digits.slice(5)}`;
    } else {
      return `${digits.slice(0, 5)}-${digits.slice(5, 8)}-${digits.slice(8, 12)}`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">
          Customer Information
        </h2>
        <div className="flex items-center space-x-2">
          {autoSaveStatus && (
            <span className="text-sm text-muted-foreground">
              {autoSaveStatus === "saving" ? "Saving..." : "Saved"}
            </span>
          )}
          <Button
            type="button"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
            <Save className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information Section */}
          <Collapsible
            open={isPersonalInfoOpen}
            onOpenChange={setIsPersonalInfoOpen}
            className="border rounded-md p-4"
          >
            <div className="flex justify-between items-center">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="p-0 hover:bg-transparent">
                  <h3 className="text-lg font-medium">Personal Information</h3>
                  {isPersonalInfoOpen ? (
                    <ChevronUp className="ml-2 h-4 w-4" />
                  ) : (
                    <ChevronDown className="ml-2 h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="pt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="idType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select ID type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="aadhaar">Aadhaar Card</SelectItem>
                          <SelectItem value="pan">PAN Card</SelectItem>
                          <SelectItem value="passport">Passport</SelectItem>
                          <SelectItem value="voter">Voter ID</SelectItem>
                          <SelectItem value="driving">
                            Driving License
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="idNumber"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center space-x-2">
                        <FormLabel>ID Number</FormLabel>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                Enter the number exactly as it appears on your
                                ID document
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <FormControl>
                        <Input placeholder="ABCDE1234F" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Contact Information Section */}
          <Collapsible
            open={isContactInfoOpen}
            onOpenChange={setIsContactInfoOpen}
            className="border rounded-md p-4"
          >
            <div className="flex justify-between items-center">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="p-0 hover:bg-transparent">
                  <h3 className="text-lg font-medium">Contact Information</h3>
                  {isContactInfoOpen ? (
                    <ChevronUp className="ml-2 h-4 w-4" />
                  ) : (
                    <ChevronDown className="ml-2 h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="pt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john.doe@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+91 98765-43210"
                          {...field}
                          onChange={(e) => {
                            const formatted = formatPhoneNumber(e.target.value);
                            field.onChange(formatted);
                          }}
                        />
                      </FormControl>
                      <FormDescription>Format: +91 98765-43210</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Address Information Section */}
          <Collapsible
            open={isAddressInfoOpen}
            onOpenChange={setIsAddressInfoOpen}
            className="border rounded-md p-4"
          >
            <div className="flex justify-between items-center">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="p-0 hover:bg-transparent">
                  <h3 className="text-lg font-medium">Address Information</h3>
                  {isAddressInfoOpen ? (
                    <ChevronUp className="ml-2 h-4 w-4" />
                  ) : (
                    <ChevronDown className="ml-2 h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="pt-4 space-y-4">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="123 Main Street, Apartment 4B"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Mumbai" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="Maharashtra" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pincode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pincode</FormLabel>
                      <FormControl>
                        <Input placeholder="400001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </form>
      </Form>
    </div>
  );
}
