import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Plus,
  Trash2,
  Camera,
  Upload,
  HelpCircle,
  Info,
  ChevronUp,
  ChevronDown,
  Coins,
} from "lucide-react";

type GoldAssessmentProps = {
  initialData: any[];
  onSave: (data: any[]) => void;
};

const goldItemSchema = z.object({
  id: z.string(),
  type: z.string(),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters." }),
  weightGrams: z
    .number()
    .min(0.1, { message: "Weight must be at least 0.1 grams." }),
  purity: z
    .number()
    .min(1, { message: "Purity must be at least 1 karat." })
    .max(24, { message: "Purity cannot exceed 24 karats." }),
  images: z.array(z.string()).optional(),
});

type GoldItem = z.infer<typeof goldItemSchema>;

const goldItemTypes = [
  { value: "ring", label: "Ring" },
  { value: "necklace", label: "Necklace" },
  { value: "chain", label: "Chain" },
  { value: "bracelet", label: "Bracelet" },
  { value: "earrings", label: "Earrings" },
  { value: "bangle", label: "Bangle" },
  { value: "coin", label: "Coin" },
  { value: "bar", label: "Gold Bar" },
  { value: "other", label: "Other" },
];

export function GoldAssessment({ initialData, onSave }: GoldAssessmentProps) {
  const [goldItems, setGoldItems] = useState<GoldItem[]>(
    initialData?.length > 0 ? initialData : [],
  );
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [marketRate, setMarketRate] = useState(6000); // ₹6000 per gram for 24K gold
  const [showItemForm, setShowItemForm] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {},
  );

  const form = useForm<GoldItem>({
    resolver: zodResolver(goldItemSchema),
    defaultValues: {
      id: `item-${Date.now()}`,
      type: "ring",
      description: "",
      weightGrams: 0,
      purity: 22,
      images: [],
    },
  });

  const addNewItem = () => {
    form.reset({
      id: `item-${Date.now()}`,
      type: "ring",
      description: "",
      weightGrams: 0,
      purity: 22,
      images: [],
    });
    setShowItemForm(true);
    setSelectedItemId(null);
  };

  const editItem = (itemId: string) => {
    const item = goldItems.find((item) => item.id === itemId);
    if (item) {
      form.reset(item);
      setShowItemForm(true);
      setSelectedItemId(itemId);
    }
  };

  const deleteItem = (itemId: string) => {
    const updatedItems = goldItems.filter((item) => item.id !== itemId);
    setGoldItems(updatedItems);
    onSave(updatedItems);
    if (selectedItemId === itemId) {
      setSelectedItemId(null);
      setShowItemForm(false);
    }
  };

  const toggleItemExpand = (itemId: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const onSubmit = (values: GoldItem) => {
    if (selectedItemId) {
      // Edit existing item
      const updatedItems = goldItems.map((item) =>
        item.id === selectedItemId ? values : item,
      );
      setGoldItems(updatedItems);
      onSave(updatedItems);
    } else {
      // Add new item
      const updatedItems = [...goldItems, values];
      setGoldItems(updatedItems);
      onSave(updatedItems);
    }
    setShowItemForm(false);
    setSelectedItemId(null);
  };

  const calculateItemValue = (weight: number, purity: number) => {
    // Calculate value based on weight, purity and market rate
    return (weight * (purity / 24) * marketRate).toFixed(2);
  };

  const calculateTotalValue = () => {
    return goldItems
      .reduce((total, item) => {
        return (
          total + parseFloat(calculateItemValue(item.weightGrams, item.purity))
        );
      }, 0)
      .toFixed(2);
  };

  const getItemTypeLabel = (typeValue: string) => {
    return (
      goldItemTypes.find((type) => type.value === typeValue)?.label || typeValue
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">
            Gold Assessment
          </h2>
          <p className="text-muted-foreground">
            Add details of your gold items for valuation
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">
              Current Gold Rate (24K)
            </p>
            <p className="font-medium">
              ₹{marketRate.toLocaleString()} per gram
            </p>
          </div>
          <Button onClick={addNewItem}>
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Gold Items</CardTitle>
            </CardHeader>
            <CardContent>
              {goldItems.length === 0 ? (
                <div className="text-center py-6">
                  <div className="rounded-full bg-muted w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <Coins className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">
                    No gold items added yet
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={addNewItem}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Item
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {goldItems.map((item) => (
                    <div
                      key={item.id}
                      className={`border rounded-md overflow-hidden ${selectedItemId === item.id ? "ring-2 ring-primary" : ""}`}
                    >
                      <div
                        className="p-3 flex justify-between items-center cursor-pointer hover:bg-muted/50"
                        onClick={() => toggleItemExpand(item.id)}
                      >
                        <div className="flex items-center">
                          <div className="mr-3 rounded-full bg-primary/10 p-1.5">
                            <Coins className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {getItemTypeLabel(item.type)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {item.weightGrams}g • {item.purity}K
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <p className="text-sm font-medium mr-2">
                            ₹{calculateItemValue(item.weightGrams, item.purity)}
                          </p>
                          {expandedItems[item.id] ? (
                            <ChevronUp className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                      </div>

                      {expandedItems[item.id] && (
                        <div className="p-3 pt-0 border-t">
                          <p className="text-sm mb-2">{item.description}</p>
                          {item.images && item.images.length > 0 && (
                            <div className="flex space-x-2 mb-3 overflow-x-auto py-1">
                              {item.images.map((img, index) => (
                                <img
                                  key={index}
                                  src={img}
                                  alt={`${item.type} ${index + 1}`}
                                  className="h-16 w-16 object-cover rounded-md"
                                />
                              ))}
                            </div>
                          )}
                          <div className="flex space-x-2 mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                editItem(item.id);
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full text-destructive hover:text-destructive"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteItem(item.id);
                              }}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Items</p>
                <p className="font-medium">{goldItems.length}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="font-medium">₹{calculateTotalValue()}</p>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="md:col-span-2">
          {showItemForm ? (
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedItemId ? "Edit Gold Item" : "Add New Gold Item"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Item Type</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select item type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {goldItemTypes.map((type) => (
                                  <SelectItem
                                    key={type.value}
                                    value={type.value}
                                  >
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="22K gold ring with ruby stone"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="weightGrams"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Weight (grams)</FormLabel>
                            <div className="flex items-center space-x-4">
                              <FormControl>
                                <div className="flex-1">
                                  <div className="flex items-center">
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      className="rounded-r-none"
                                      onClick={() =>
                                        field.onChange(
                                          Math.max(0, field.value - 0.1),
                                        )
                                      }
                                    >
                                      -
                                    </Button>
                                    <Input
                                      type="number"
                                      step="0.1"
                                      min="0"
                                      className="rounded-none text-center"
                                      {...field}
                                      onChange={(e) =>
                                        field.onChange(
                                          parseFloat(e.target.value) || 0,
                                        )
                                      }
                                    />
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      className="rounded-l-none"
                                      onClick={() =>
                                        field.onChange(field.value + 0.1)
                                      }
                                    >
                                      +
                                    </Button>
                                  </div>
                                </div>
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="purity"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex justify-between items-center">
                              <FormLabel>Purity (Karat)</FormLabel>
                              <Badge variant="outline">{field.value}K</Badge>
                            </div>
                            <FormControl>
                              <div className="pt-2">
                                <Slider
                                  min={1}
                                  max={24}
                                  step={1}
                                  defaultValue={[field.value]}
                                  onValueChange={(values) =>
                                    field.onChange(values[0])
                                  }
                                />
                                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                  <span>1K</span>
                                  <span>24K</span>
                                </div>
                              </div>
                            </FormControl>
                            <FormDescription>
                              Common purities: 18K (75%), 22K (91.7%), 24K
                              (99.9%)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <FormLabel>Item Images</FormLabel>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <HelpCircle className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                Add clear photos of your gold item from multiple
                                angles. This helps in accurate assessment.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {form.watch("images")?.map((img, index) => (
                          <div
                            key={index}
                            className="relative aspect-square rounded-md overflow-hidden border bg-muted"
                          >
                            <img
                              src={img}
                              alt={`Item ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-1 right-1 h-6 w-6 p-0"
                              onClick={() => {
                                const currentImages =
                                  form.getValues("images") || [];
                                form.setValue(
                                  "images",
                                  currentImages.filter((_, i) => i !== index),
                                );
                              }}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                        <div className="aspect-square rounded-md border border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                          <Upload className="h-6 w-6 text-muted-foreground mb-1" />
                          <p className="text-xs text-muted-foreground">
                            Upload
                          </p>
                        </div>
                        <div className="aspect-square rounded-md border border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                          <Camera className="h-6 w-6 text-muted-foreground mb-1" />
                          <p className="text-xs text-muted-foreground">
                            Camera
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-md p-4 bg-muted/30">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium flex items-center">
                          <Info className="h-4 w-4 mr-2 text-muted-foreground" />
                          Estimated Value
                        </h4>
                        <Badge variant="outline" className="text-primary">
                          ₹
                          {calculateItemValue(
                            form.watch("weightGrams") || 0,
                            form.watch("purity") || 0,
                          )}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Based on current market rate of ₹
                        {marketRate.toLocaleString()} per gram for 24K gold
                      </p>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setShowItemForm(false);
                          setSelectedItemId(null);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">
                        {selectedItemId ? "Update Item" : "Add Item"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="calculator">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="calculator">
                      Gold Value Calculator
                    </TabsTrigger>
                    <TabsTrigger value="purity">Purity Guide</TabsTrigger>
                    <TabsTrigger value="gallery">Item Gallery</TabsTrigger>
                  </TabsList>
                  <TabsContent value="calculator" className="pt-6">
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-medium mb-4">
                            Gold Value Estimator
                          </h3>
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium">
                                Weight (grams)
                              </label>
                              <div className="flex items-center mt-1">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  className="rounded-r-none"
                                  onClick={() => {
                                    const currentWeight =
                                      form.getValues("weightGrams") || 0;
                                    form.setValue(
                                      "weightGrams",
                                      Math.max(0, currentWeight - 0.1),
                                    );
                                  }}
                                >
                                  -
                                </Button>
                                <Input
                                  type="number"
                                  step="0.1"
                                  min="0"
                                  className="rounded-none text-center"
                                  value={form.watch("weightGrams") || 0}
                                  onChange={(e) =>
                                    form.setValue(
                                      "weightGrams",
                                      parseFloat(e.target.value) || 0,
                                    )
                                  }
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  className="rounded-l-none"
                                  onClick={() => {
                                    const currentWeight =
                                      form.getValues("weightGrams") || 0;
                                    form.setValue(
                                      "weightGrams",
                                      currentWeight + 0.1,
                                    );
                                  }}
                                >
                                  +
                                </Button>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between items-center">
                                <label className="text-sm font-medium">
                                  Purity (Karat)
                                </label>
                                <Badge variant="outline">
                                  {form.watch("purity") || 22}K
                                </Badge>
                              </div>
                              <div className="mt-2">
                                <Slider
                                  min={1}
                                  max={24}
                                  step={1}
                                  defaultValue={[form.watch("purity") || 22]}
                                  onValueChange={(values) =>
                                    form.setValue("purity", values[0])
                                  }
                                />
                                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                  <span>1K</span>
                                  <span>24K</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium">
                                Market Rate (₹ per gram for 24K)
                              </label>
                              <div className="flex items-center mt-1">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  className="rounded-r-none"
                                  onClick={() =>
                                    setMarketRate(
                                      Math.max(1000, marketRate - 100),
                                    )
                                  }
                                >
                                  -
                                </Button>
                                <Input
                                  type="number"
                                  step="100"
                                  min="1000"
                                  className="rounded-none text-center"
                                  value={marketRate}
                                  onChange={(e) =>
                                    setMarketRate(
                                      parseInt(e.target.value) || 6000,
                                    )
                                  }
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  className="rounded-l-none"
                                  onClick={() =>
                                    setMarketRate(marketRate + 100)
                                  }
                                >
                                  +
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="border rounded-md p-6 flex flex-col items-center justify-center bg-muted/30">
                          <h3 className="text-lg font-medium mb-2">
                            Estimated Value
                          </h3>
                          <div className="text-4xl font-bold mb-4">
                            ₹
                            {calculateItemValue(
                              form.watch("weightGrams") || 0,
                              form.watch("purity") || 22,
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground text-center">
                            <p>
                              Based on {form.watch("weightGrams") || 0}g of{" "}
                              {form.watch("purity") || 22}K gold
                            </p>
                            <p>
                              at ₹{marketRate.toLocaleString()} per gram for 24K
                              gold
                            </p>
                          </div>
                          <Button className="mt-6" onClick={addNewItem}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add This Item
                          </Button>
                        </div>
                      </div>

                      <div className="border-t pt-6 mt-6">
                        <h3 className="text-lg font-medium mb-4">
                          Gold Purity Conversion Chart
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2 px-4 font-medium">
                                  Karat
                                </th>
                                <th className="text-left py-2 px-4 font-medium">
                                  Purity (%)
                                </th>
                                <th className="text-left py-2 px-4 font-medium">
                                  Millesimal Fineness
                                </th>
                                <th className="text-left py-2 px-4 font-medium">
                                  Value Multiplier
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                {
                                  karat: 24,
                                  purity: 99.9,
                                  fineness: 999,
                                  multiplier: 1.0,
                                },
                                {
                                  karat: 22,
                                  purity: 91.7,
                                  fineness: 917,
                                  multiplier: 0.917,
                                },
                                {
                                  karat: 18,
                                  purity: 75.0,
                                  fineness: 750,
                                  multiplier: 0.75,
                                },
                                {
                                  karat: 14,
                                  purity: 58.3,
                                  fineness: 583,
                                  multiplier: 0.583,
                                },
                                {
                                  karat: 10,
                                  purity: 41.7,
                                  fineness: 417,
                                  multiplier: 0.417,
                                },
                              ].map((row) => (
                                <tr
                                  key={row.karat}
                                  className="border-b hover:bg-muted/50"
                                >
                                  <td className="py-2 px-4">{row.karat}K</td>
                                  <td className="py-2 px-4">{row.purity}%</td>
                                  <td className="py-2 px-4">{row.fineness}</td>
                                  <td className="py-2 px-4">
                                    {row.multiplier.toFixed(3)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="purity" className="pt-6">
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium">Gold Purity Guide</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <div className="aspect-video bg-yellow-100 rounded-md mb-3 flex items-center justify-center">
                              <div className="h-16 w-16 rounded-full bg-yellow-400 flex items-center justify-center text-yellow-800 font-bold text-xl">
                                24K
                              </div>
                            </div>
                            <h4 className="font-medium mb-1">
                              24 Karat Gold (99.9% Pure)
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              The purest form of gold, too soft for jewelry but
                              used for investment.
                            </p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <div className="aspect-video bg-yellow-100 rounded-md mb-3 flex items-center justify-center">
                              <div className="h-16 w-16 rounded-full bg-yellow-500 flex items-center justify-center text-yellow-800 font-bold text-xl">
                                22K
                              </div>
                            </div>
                            <h4 className="font-medium mb-1">
                              22 Karat Gold (91.7% Pure)
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Common for Indian jewelry, good balance of purity
                              and durability.
                            </p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <div className="aspect-video bg-yellow-100 rounded-md mb-3 flex items-center justify-center">
                              <div className="h-16 w-16 rounded-full bg-yellow-600 flex items-center justify-center text-yellow-100 font-bold text-xl">
                                18K
                              </div>
                            </div>
                            <h4 className="font-medium mb-1">
                              18 Karat Gold (75% Pure)
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Popular worldwide for jewelry, good balance of
                              color and strength.
                            </p>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="border rounded-md p-4 bg-muted/30">
                        <h4 className="font-medium mb-2">
                          How Gold Purity is Measured
                        </h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Gold purity is measured in karats, with 24 karat being
                          pure gold. Each karat represents 1/24th of the whole,
                          so 18K gold contains 18 parts gold and 6 parts other
                          metals.
                        </p>
                        <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
                          <div className="flex h-full">
                            <div
                              className="bg-yellow-400 h-full"
                              style={{ width: "100%" }}
                            >
                              <div className="relative h-full">
                                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs">
                                  24K
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="w-full bg-muted rounded-full h-4 overflow-hidden mt-6">
                          <div className="flex h-full">
                            <div
                              className="bg-yellow-500 h-full"
                              style={{ width: "91.7%" }}
                            ></div>
                            <div
                              className="bg-gray-400 h-full"
                              style={{ width: "8.3%" }}
                            ></div>
                          </div>
                          <div className="relative">
                            <span className="absolute -top-6 left-[45.85%] -translate-x-1/2 text-xs">
                              22K
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-muted rounded-full h-4 overflow-hidden mt-6">
                          <div className="flex h-full">
                            <div
                              className="bg-yellow-600 h-full"
                              style={{ width: "75%" }}
                            ></div>
                            <div
                              className="bg-gray-400 h-full"
                              style={{ width: "25%" }}
                            ></div>
                          </div>
                          <div className="relative">
                            <span className="absolute -top-6 left-[37.5%] -translate-x-1/2 text-xs">
                              18K
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-muted rounded-full h-4 overflow-hidden mt-6">
                          <div className="flex h-full">
                            <div
                              className="bg-yellow-700 h-full"
                              style={{ width: "58.3%" }}
                            ></div>
                            <div
                              className="bg-gray-400 h-full"
                              style={{ width: "41.7%" }}
                            ></div>
                          </div>
                          <div className="relative">
                            <span className="absolute -top-6 left-[29.15%] -translate-x-1/2 text-xs">
                              14K
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="gallery" className="pt-6">
                    {goldItems.length === 0 ? (
                      <div className="text-center py-12 border rounded-md">
                        <div className="rounded-full bg-muted w-16 h-16 flex items-center justify-center mx-auto mb-4">
                          <Coins className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">
                          No Gold Items Added
                        </h3>
                        <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                          Add gold items to see them displayed in the gallery
                          view
                        </p>
                        <Button onClick={addNewItem}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add First Item
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {goldItems.map((item) => (
                            <Card key={item.id} className="overflow-hidden">
                              <div className="aspect-video bg-muted flex items-center justify-center">
                                {item.images && item.images.length > 0 ? (
                                  <img
                                    src={item.images[0]}
                                    alt={item.description}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="rounded-full bg-primary/10 p-4">
                                    <Coins className="h-8 w-8 text-primary" />
                                  </div>
                                )}
                              </div>
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <h4 className="font-medium">
                                      {getItemTypeLabel(item.type)}
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                      {item.description}
                                    </p>
                                  </div>
                                  <Badge variant="outline">
                                    {item.purity}K
                                  </Badge>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                  <div>
                                    <p className="text-sm text-muted-foreground">
                                      Weight
                                    </p>
                                    <p className="font-medium">
                                      {item.weightGrams}g
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm text-muted-foreground">
                                      Value
                                    </p>
                                    <p className="font-medium">
                                      ₹
                                      {calculateItemValue(
                                        item.weightGrams,
                                        item.purity,
                                      )}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex space-x-2 mt-4">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                    onClick={() => editItem(item.id)}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full text-destructive hover:text-destructive"
                                    onClick={() => deleteItem(item.id)}
                                  >
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Remove
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                          <Card className="border-dashed overflow-hidden">
                            <div
                              className="aspect-video flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
                              onClick={addNewItem}
                            >
                              <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                              <p className="font-medium">Add New Item</p>
                            </div>
                          </Card>
                        </div>

                        <div className="border-t pt-6 flex justify-between items-center">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Total Items
                            </p>
                            <p className="font-medium">{goldItems.length}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">
                              Total Weight
                            </p>
                            <p className="font-medium">
                              {goldItems
                                .reduce(
                                  (total, item) => total + item.weightGrams,
                                  0,
                                )
                                .toFixed(2)}
                              g
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">
                              Total Value
                            </p>
                            <p className="font-medium">
                              ₹{calculateTotalValue()}
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <Button variant="outline" className="mr-2">
                            <Upload className="h-4 w-4 mr-2" />
                            Export Assessment
                          </Button>
                          <Button>
                            <Coins className="h-4 w-4 mr-2" />
                            Proceed to Loan Terms
                          </Button>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
