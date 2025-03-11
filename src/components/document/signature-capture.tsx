import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PenLine, Upload, Camera, Save, Trash2, Check } from "lucide-react";

type SignatureCaptureProps = {
  onCapture?: (signatureData: string) => void;
  initialSignature?: string;
};

export function SignatureCapture({
  onCapture,
  initialSignature,
}: SignatureCaptureProps) {
  const [activeTab, setActiveTab] = useState("draw");
  const [isDrawing, setIsDrawing] = useState(false);
  const [signatureData, setSignatureData] = useState<string | null>(
    initialSignature || null,
  );
  const [tempSignatureData, setTempSignatureData] = useState<string | null>(
    null,
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(false);

  // Initialize canvas when component mounts or tab changes
  useEffect(() => {
    if (activeTab === "draw") {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext("2d");
      if (!context) return;

      // Set canvas dimensions
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      // Set canvas styles
      context.lineWidth = 2;
      context.lineCap = "round";
      context.strokeStyle = "#000";

      // Clear canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // If there's a temporary signature, draw it
      if (tempSignatureData) {
        const img = new Image();
        img.onload = () => {
          context.drawImage(img, 0, 0);
        };
        img.src = tempSignatureData;
      }
    }
  }, [activeTab, tempSignatureData]);

  const startDrawing = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ("touches" in e) {
      // Touch event
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      // Mouse event
      clientX = e.clientX;
      clientY = e.clientY;
    }

    context.beginPath();
    context.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ("touches" in e) {
      // Touch event
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
      e.preventDefault(); // Prevent scrolling on touch devices
    } else {
      // Mouse event
      clientX = e.clientX;
      clientY = e.clientY;
    }

    context.lineTo(clientX - rect.left, clientY - rect.top);
    context.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (canvasRef.current) {
      setTempSignatureData(canvasRef.current.toDataURL());
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    setTempSignatureData(null);
  };

  const saveSignature = () => {
    if (tempSignatureData) {
      setSignatureData(tempSignatureData);
      if (onCapture) {
        onCapture(tempSignatureData);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target?.result) {
          setSignatureData(event.target.result as string);
          if (onCapture) {
            onCapture(event.target.result as string);
          }
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Get image data
        const imageData = canvas.toDataURL("image/png");
        setSignatureData(imageData);
        if (onCapture) {
          onCapture(imageData);
        }

        // Stop camera stream
        stopCamera();
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

  return (
    <div className="border rounded-md p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="draw">
            <PenLine className="h-4 w-4 mr-2" /> Draw
          </TabsTrigger>
          <TabsTrigger value="upload">
            <Upload className="h-4 w-4 mr-2" /> Upload
          </TabsTrigger>
          <TabsTrigger value="camera">
            <Camera className="h-4 w-4 mr-2" /> Camera
          </TabsTrigger>
        </TabsList>

        <TabsContent value="draw" className="mt-4">
          <div className="space-y-4">
            <div className="border-2 border-dashed rounded-md bg-muted/20 h-40 flex items-center justify-center">
              {signatureData ? (
                <div className="relative w-full h-full">
                  <img
                    src={signatureData}
                    alt="Signature"
                    className="max-w-full max-h-full object-contain mx-auto"
                  />
                  <div className="absolute top-2 right-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setSignatureData(null)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <canvas
                  ref={canvasRef}
                  className="w-full h-full cursor-crosshair"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                ></canvas>
              )}
            </div>

            {!signatureData && (
              <div className="flex justify-between">
                <Button variant="outline" size="sm" onClick={clearSignature}>
                  <Trash2 className="h-4 w-4 mr-2" /> Clear
                </Button>
                <Button
                  size="sm"
                  onClick={saveSignature}
                  disabled={!tempSignatureData}
                >
                  <Save className="h-4 w-4 mr-2" /> Save Signature
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="upload" className="mt-4">
          <div className="space-y-4">
            <div
              className="border-2 border-dashed rounded-md bg-muted/20 h-40 flex items-center justify-center cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              {signatureData ? (
                <div className="relative w-full h-full">
                  <img
                    src={signatureData}
                    alt="Signature"
                    className="max-w-full max-h-full object-contain mx-auto"
                  />
                  <div className="absolute top-2 right-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSignatureData(null);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-medium">
                    Click to upload signature
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG up to 5MB
                  </p>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="camera" className="mt-4">
          <div className="space-y-4">
            <div className="border-2 border-dashed rounded-md bg-muted/20 h-40 flex items-center justify-center">
              {signatureData ? (
                <div className="relative w-full h-full">
                  <img
                    src={signatureData}
                    alt="Signature"
                    className="max-w-full max-h-full object-contain mx-auto"
                  />
                  <div className="absolute top-2 right-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setSignatureData(null)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : cameraActive ? (
                <div className="relative w-full h-full">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  ></video>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    <Button size="sm" onClick={capturePhoto}>
                      <Camera className="h-4 w-4 mr-2" /> Capture
                    </Button>
                    <Button variant="outline" size="sm" onClick={stopCamera}>
                      <Trash2 className="h-4 w-4 mr-2" /> Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <Camera className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <Button onClick={startCamera}>Start Camera</Button>
                </div>
              )}
              <canvas ref={canvasRef} className="hidden"></canvas>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {signatureData && (
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center">
            <Check className="h-4 w-4 text-green-600 mr-2" />
            <span className="text-sm text-green-600">
              Signature captured successfully
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSignatureData(null)}
          >
            <Trash2 className="h-4 w-4 mr-2" /> Clear
          </Button>
        </div>
      )}
    </div>
  );
}
