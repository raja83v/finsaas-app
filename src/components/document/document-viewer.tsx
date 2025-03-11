import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  Printer,
  Check,
  X,
  PenLine,
  Hand,
  Move,
  ScanLine,
  FileText,
  CheckSquare,
  ArrowLeft,
  ArrowRight,
  Maximize,
  Minimize,
} from "lucide-react";

export function DocumentViewer() {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5); // Mock total pages
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState("document");
  const [verificationItems, setVerificationItems] = useState([
    { id: "id_valid", label: "ID is valid and not expired", checked: false },
    { id: "photo_match", label: "Photo matches the applicant", checked: false },
    {
      id: "address_match",
      label: "Address matches application",
      checked: false,
    },
    { id: "signature_match", label: "Signature is consistent", checked: false },
    {
      id: "no_tampering",
      label: "No signs of tampering or alteration",
      checked: false,
    },
  ]);

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 10, 200));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 10, 50));
  };

  const handleRotate = () => {
    setRotation((rotation + 90) % 360);
  };

  const handlePreviousPage = () => {
    setCurrentPage(Math.max(currentPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(Math.min(currentPage + 1, totalPages));
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleVerificationItemChange = (id: string, checked: boolean) => {
    setVerificationItems(
      verificationItems.map((item) =>
        item.id === id ? { ...item, checked } : item,
      ),
    );
  };

  return (
    <div
      className={`flex flex-col ${isFullscreen ? "fixed inset-0 z-50 bg-background p-4" : "h-full"}`}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm">{zoom}%</span>
          <Button variant="outline" size="sm" onClick={handleZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleRotate}>
            <RotateCw className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" /> Download
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-1" /> Print
          </Button>
          <Button variant="outline" size="sm" onClick={toggleFullscreen}>
            {isFullscreen ? (
              <Minimize className="h-4 w-4" />
            ) : (
              <Maximize className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <div className="flex gap-4 h-full">
        <div className="w-16 border rounded-md overflow-y-auto hidden md:block">
          {/* Thumbnail navigation */}
          {Array.from({ length: totalPages }).map((_, index) => (
            <div
              key={index}
              className={`p-2 cursor-pointer hover:bg-muted/50 ${currentPage === index + 1 ? "bg-muted" : ""}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              <div className="aspect-[3/4] bg-muted/30 rounded flex items-center justify-center">
                <span className="text-xs">{index + 1}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex-1 flex flex-col">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex-1 flex flex-col"
          >
            <TabsList className="self-start mb-4">
              <TabsTrigger value="document">Document</TabsTrigger>
              <TabsTrigger value="verification">Verification</TabsTrigger>
              <TabsTrigger value="comparison">Comparison</TabsTrigger>
              <TabsTrigger value="annotation">Annotation</TabsTrigger>
            </TabsList>

            <TabsContent value="document" className="flex-1 flex flex-col mt-0">
              <div className="flex-1 border rounded-md overflow-hidden bg-muted/30 flex items-center justify-center">
                <div
                  style={{
                    transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                    transition: "transform 0.2s ease",
                  }}
                  className="relative"
                >
                  {/* Placeholder for document - in a real app, this would be the actual document */}
                  <div className="w-[595px] h-[842px] bg-white shadow-md flex items-center justify-center">
                    <div className="text-center">
                      <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Document Preview</p>
                      <p className="text-sm text-muted-foreground">
                        Page {currentPage} of {totalPages}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-4 space-x-2">
                <Button variant="outline" size="sm">
                  <Hand className="h-4 w-4 mr-1" /> Pan
                </Button>
                <Button variant="outline" size="sm">
                  <Move className="h-4 w-4 mr-1" /> Move
                </Button>
                <Button variant="outline" size="sm">
                  <ScanLine className="h-4 w-4 mr-1" /> Scan Text
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="verification" className="flex-1 mt-0">
              <div className="border rounded-md p-4 space-y-4">
                <h3 className="font-medium">Document Verification Checklist</h3>
                <p className="text-sm text-muted-foreground">
                  Verify the following items before approving:
                </p>

                <div className="space-y-3">
                  {verificationItems.map((item) => (
                    <div key={item.id} className="flex items-start space-x-2">
                      <Checkbox
                        id={item.id}
                        checked={item.checked}
                        onCheckedChange={(checked) =>
                          handleVerificationItemChange(
                            item.id,
                            checked as boolean,
                          )
                        }
                      />
                      <Label htmlFor={item.id} className="text-sm">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label
                    htmlFor="verification-notes"
                    className="text-sm font-medium"
                  >
                    Verification Notes
                  </Label>
                  <Textarea
                    id="verification-notes"
                    placeholder="Add any notes or observations about the document..."
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    <X className="h-4 w-4 mr-1" /> Reject Document
                  </Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Check className="h-4 w-4 mr-1" /> Verify Document
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="comparison" className="flex-1 mt-0">
              <div className="grid grid-cols-2 gap-4 h-full">
                <div className="border rounded-md overflow-hidden bg-muted/30 flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Current Document
                    </p>
                  </div>
                </div>
                <div className="border rounded-md overflow-hidden bg-muted/30 flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Reference Document
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 border rounded-md p-4">
                <h3 className="font-medium mb-2">Comparison Results</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckSquare className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">
                      Name matches on both documents
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckSquare className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">ID number matches</span>
                  </div>
                  <div className="flex items-center">
                    <X className="h-4 w-4 text-red-600 mr-2" />
                    <span className="text-sm">
                      Address discrepancy detected
                    </span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="annotation" className="flex-1 mt-0">
              <div className="flex-1 border rounded-md overflow-hidden bg-muted/30 flex items-center justify-center">
                <div className="relative w-[595px] h-[842px] bg-white shadow-md">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Document Preview</p>
                    </div>
                  </div>
                  {/* Example annotations */}
                  <div className="absolute top-[100px] left-[50px] w-[200px] h-[30px] border-2 border-red-500 bg-red-100/30"></div>
                  <div className="absolute top-[200px] left-[100px] w-[150px] h-[30px] border-2 border-green-500 bg-green-100/30"></div>
                  <div className="absolute top-[300px] left-[150px] w-[100px] h-[100px] border-2 border-blue-500 bg-blue-100/30 rounded-full"></div>
                </div>
              </div>

              <div className="flex justify-center mt-4 space-x-2">
                <Button variant="outline" size="sm">
                  <PenLine className="h-4 w-4 mr-1" /> Draw
                </Button>
                <Button variant="outline" size="sm">
                  <Move className="h-4 w-4 mr-1" /> Select
                </Button>
                <Input
                  type="color"
                  className="w-10 h-10 p-1 border rounded-md cursor-pointer"
                  defaultValue="#ff0000"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
