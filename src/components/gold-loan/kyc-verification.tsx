import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Upload,
  Camera,
  X,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Check,
  HelpCircle,
  Trash2,
} from "lucide-react";

type KycVerificationProps = {
  initialData: any[];
  onSave: (data: any[]) => void;
};

type DocumentType = {
  id: string;
  type: string;
  name: string;
  description: string;
  required: boolean;
  file?: File;
  preview?: string;
  status: "pending" | "uploaded" | "verified" | "rejected";
  uploadProgress?: number;
};

export function KycVerification({ initialData, onSave }: KycVerificationProps) {
  const [documents, setDocuments] = useState<DocumentType[]>(
    initialData?.length > 0
      ? initialData
      : [
          {
            id: "id-proof",
            type: "id-proof",
            name: "ID Proof",
            description: "Aadhaar Card, PAN Card, Passport, or Voter ID",
            required: true,
            status: "pending",
          },
          {
            id: "address-proof",
            type: "address-proof",
            name: "Address Proof",
            description: "Utility Bill, Bank Statement, or Rental Agreement",
            required: true,
            status: "pending",
          },
          {
            id: "photo",
            type: "photo",
            name: "Passport Size Photo",
            description: "Recent color photograph with white background",
            required: true,
            status: "pending",
          },
          {
            id: "income-proof",
            type: "income-proof",
            name: "Income Proof",
            description: "Salary Slip, IT Returns, or Bank Statement",
            required: false,
            status: "pending",
          },
        ],
  );

  const [activeDocument, setActiveDocument] = useState<string | null>(null);
  const [previewZoom, setPreviewZoom] = useState(1);
  const [previewRotation, setPreviewRotation] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraActive, setCameraActive] = useState(false);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    docId: string,
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      // Simulate upload progress
      const updatedDocs = documents.map((doc) => {
        if (doc.id === docId) {
          return { ...doc, file, uploadProgress: 0, status: "uploaded" };
        }
        return doc;
      });
      setDocuments(updatedDocs);

      // Simulate progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress <= 100) {
          setDocuments((prevDocs) =>
            prevDocs.map((doc) => {
              if (doc.id === docId) {
                return { ...doc, uploadProgress: progress };
              }
              return doc;
            }),
          );
        } else {
          clearInterval(interval);
        }
      }, 200);

      reader.onload = (e) => {
        if (e.target?.result) {
          setDocuments((prevDocs) =>
            prevDocs.map((doc) => {
              if (doc.id === docId) {
                return {
                  ...doc,
                  preview: e.target?.result as string,
                  status: "uploaded",
                };
              }
              return doc;
            }),
          );
          setActiveDocument(docId);
          onSave(updatedDocs);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent, docId: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();

      // Update document with file and start upload progress
      const updatedDocs = documents.map((doc) => {
        if (doc.id === docId) {
          return { ...doc, file, uploadProgress: 0, status: "uploaded" };
        }
        return doc;
      });
      setDocuments(updatedDocs);

      // Simulate progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress <= 100) {
          setDocuments((prevDocs) =>
            prevDocs.map((doc) => {
              if (doc.id === docId) {
                return { ...doc, uploadProgress: progress };
              }
              return doc;
            }),
          );
        } else {
          clearInterval(interval);
        }
      }, 200);

      reader.onload = (e) => {
        if (e.target?.result) {
          setDocuments((prevDocs) =>
            prevDocs.map((doc) => {
              if (doc.id === docId) {
                return {
                  ...doc,
                  preview: e.target?.result as string,
                  status: "uploaded",
                };
              }
              return doc;
            }),
          );
          setActiveDocument(docId);
          onSave(updatedDocs);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async (docId: string) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
        setActiveDocument(docId);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current && activeDocument) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageDataUrl = canvas.toDataURL("image/png");

        // Convert data URL to Blob
        const byteString = atob(imageDataUrl.split(",")[1]);
        const mimeString = imageDataUrl
          .split(",")[0]
          .split(":")[1]
          .split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });
        const file = new File([blob], `captured-${Date.now()}.png`, {
          type: "image/png",
        });

        setDocuments((prevDocs) =>
          prevDocs.map((doc) => {
            if (doc.id === activeDocument) {
              return {
                ...doc,
                file,
                preview: imageDataUrl,
                status: "uploaded",
              };
            }
            return doc;
          }),
        );

        // Stop camera stream
        const stream = video.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        video.srcObject = null;
        setCameraActive(false);

        // Save updated documents
        onSave(documents);
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
        setCameraActive(false);
      }
    }
  };

  const removeDocument = (docId: string) => {
    setDocuments((prevDocs) =>
      prevDocs.map((doc) => {
        if (doc.id === docId) {
          return {
            ...doc,
            file: undefined,
            preview: undefined,
            status: "pending",
            uploadProgress: undefined,
          };
        }
        return doc;
      }),
    );
    if (activeDocument === docId) {
      setActiveDocument(null);
    }
    onSave(documents);
  };

  const verifyDocument = (docId: string) => {
    setDocuments((prevDocs) =>
      prevDocs.map((doc) => {
        if (doc.id === docId) {
          return { ...doc, status: "verified" };
        }
        return doc;
      }),
    );
    onSave(documents);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      case "uploaded":
        return <Badge variant="secondary">Uploaded</Badge>;
      case "verified":
        return <Badge className="bg-green-100 text-green-800">Verified</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  const getCompletedSteps = () => {
    return documents.filter(
      (doc) =>
        doc.status === "verified" ||
        (doc.status === "uploaded" && !doc.required),
    ).length;
  };

  const getTotalRequiredSteps = () => {
    return documents.filter((doc) => doc.required).length;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">
          KYC Verification
        </h2>
        <p className="text-muted-foreground mb-4">
          Upload the required documents to verify your identity and address
        </p>

        {/* Verification Progress */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Verification Progress</span>
            <span className="text-sm font-medium">
              {getCompletedSteps()}/{getTotalRequiredSteps()} Steps Completed
            </span>
          </div>
          <Progress
            value={(getCompletedSteps() / getTotalRequiredSteps()) * 100}
            className="h-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          {documents.map((doc) => (
            <Card
              key={doc.id}
              className={`overflow-hidden ${activeDocument === doc.id ? "ring-2 ring-primary" : ""}`}
              onClick={() => doc.preview && setActiveDocument(doc.id)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{doc.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {doc.description}
                    </p>
                  </div>
                  <div>{getStatusBadge(doc.status)}</div>
                </div>

                {doc.status === "pending" ? (
                  <div
                    className="mt-4 border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, doc.id)}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, doc.id)}
                    />
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-center font-medium">
                      Drag & drop or click to upload
                    </p>
                    <p className="text-xs text-muted-foreground text-center mt-1">
                      Supports JPG, PNG, PDF up to 5MB
                    </p>

                    <div className="flex mt-4 space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          startCamera(doc.id);
                        }}
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        Use Camera
                      </Button>
                    </div>
                  </div>
                ) : doc.uploadProgress !== undefined &&
                  doc.uploadProgress < 100 ? (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Uploading...</span>
                      <span>{doc.uploadProgress}%</span>
                    </div>
                    <Progress value={doc.uploadProgress} className="h-2" />
                  </div>
                ) : (
                  <div className="mt-4 relative">
                    {doc.preview && (
                      <div className="relative group">
                        <img
                          src={doc.preview}
                          alt={doc.name}
                          className="w-full h-32 object-cover rounded-md"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2 rounded-md">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveDocument(doc.id);
                            }}
                          >
                            <ZoomIn className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeDocument(doc.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                    {doc.status === "uploaded" && (
                      <div className="mt-2 flex justify-end">
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            verifyDocument(doc.id);
                          }}
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Mark as Verified
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="md:col-span-2">
          {activeDocument ? (
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">
                    {documents.find((d) => d.id === activeDocument)?.name}{" "}
                    Preview
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setPreviewZoom(Math.max(0.5, previewZoom - 0.1))
                      }
                    >
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">
                      {Math.round(previewZoom * 100)}%
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setPreviewZoom(Math.min(2, previewZoom + 0.1))
                      }
                    >
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setPreviewRotation((previewRotation + 90) % 360)
                      }
                    >
                      <RotateCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="border rounded-md overflow-hidden bg-muted/30 flex items-center justify-center h-[400px]">
                  {cameraActive ? (
                    <div className="relative w-full h-full">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full h-full object-contain"
                      />
                      <canvas ref={canvasRef} className="hidden" />
                      <div className="absolute inset-x-0 bottom-4 flex justify-center space-x-2">
                        <Button onClick={capturePhoto}>
                          <Camera className="h-4 w-4 mr-2" />
                          Capture
                        </Button>
                        <Button variant="outline" onClick={stopCamera}>
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                      <div className="absolute inset-0 border-2 border-dashed border-primary/50 m-8 pointer-events-none" />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      {documents.find((d) => d.id === activeDocument)
                        ?.preview ? (
                        <div
                          className="relative overflow-auto max-w-full max-h-full"
                          style={{
                            transform: `scale(${previewZoom}) rotate(${previewRotation}deg)`,
                            transition: "transform 0.2s ease",
                          }}
                        >
                          <img
                            src={
                              documents.find((d) => d.id === activeDocument)
                                ?.preview
                            }
                            alt="Document Preview"
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="text-center">
                          <p className="text-muted-foreground">
                            No preview available
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {!cameraActive && activeDocument && (
                  <div className="mt-4">
                    <Tabs defaultValue="guidelines">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="guidelines">
                          Document Guidelines
                        </TabsTrigger>
                        <TabsTrigger value="examples">
                          Example Images
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="guidelines" className="mt-2">
                        <div className="text-sm space-y-2">
                          <div className="flex items-start">
                            <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                            <p>
                              Ensure the document is clearly visible and all
                              text is readable
                            </p>
                          </div>
                          <div className="flex items-start">
                            <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                            <p>
                              All four corners of the document should be visible
                            </p>
                          </div>
                          <div className="flex items-start">
                            <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                            <p>Document should not be folded or damaged</p>
                          </div>
                          <div className="flex items-start">
                            <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                            <p>Take the photo in good lighting conditions</p>
                          </div>
                          <div className="flex items-start">
                            <X className="h-4 w-4 text-red-600 mr-2 mt-0.5" />
                            <p>Do not crop or edit the document image</p>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="examples" className="mt-2">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="border rounded-md p-2">
                            <p className="text-xs font-medium mb-1 text-green-600">
                              Good Example
                            </p>
                            <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                              <img
                                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80"
                                alt="Good document example"
                                className="max-w-full max-h-full object-contain rounded-md"
                              />
                            </div>
                          </div>
                          <div className="border rounded-md p-2">
                            <p className="text-xs font-medium mb-1 text-red-600">
                              Bad Example
                            </p>
                            <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                              <img
                                src="https://images.unsplash.com/photo-1621600411688-4be93c2c1208?w=400&q=80"
                                alt="Bad document example"
                                className="max-w-full max-h-full object-contain rounded-md"
                              />
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 flex flex-col items-center justify-center min-h-[400px] text-center">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                  <HelpCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Document Preview</h3>
                <p className="text-muted-foreground mb-4 max-w-md">
                  Upload or capture a document from the left panel to view and
                  verify it here.
                </p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">
                        <HelpCircle className="h-4 w-4 mr-2" />
                        Why do we need these documents?
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>
                        We require these documents to verify your identity and
                        address as part of our KYC (Know Your Customer) process,
                        which is mandated by regulatory requirements for
                        financial services.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
