import { useState, useRef, useEffect, useCallback } from 'react';
import * as tmImage from '@teachablemachine/image';
import {
  UploadCloud,
  Camera,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ImageIcon,
  ArrowRight
} from 'lucide-react';
const MODEL_URL = 'https://teachablemachine.withgoogle.com/models/2yz_f7yqt/';
export default function ScanWidget({ onImageCapture }) {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'camera'
  const [capturedImage, setCapturedImage] = useState(null);
  const [imageMeta, setImageMeta] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
const [scanResult, setScanResult] = useState(null);
const [scanError, setScanError] = useState('');

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  }, []);

  // Stop camera on unmount or tab switch
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (err) {
      console.warn('Camera access denied or unavailable:', err);
      setCameraError('Unable to access camera. Please check permissions or upload a file instead.');
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
  };

  const handleCapturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
      
      stopCamera();
      setCapturedImage(dataUrl);
      setImageMeta({
        source: 'Camera Capture',
        timestamp: new Date().toLocaleTimeString(),
        resolution: `${canvas.width} x ${canvas.height} px`
      });

      if (onImageCapture) {
        onImageCapture(dataUrl);
      }
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        setCapturedImage(dataUrl);
        setImageMeta({
          source: file.name,
          size: `${(file.size / 1024).toFixed(1)} KB`,
          timestamp: new Date().toLocaleTimeString()
        });

        if (onImageCapture) {
          onImageCapture(dataUrl, file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

const handleSubmitPhoto = async () => {
  if (!capturedImage) return;

  setIsScanning(true);
  setScanError('');
  setScanResult(null);

  try {
    const model = await tmImage.load(
      `${MODEL_URL}model.json`,
      `${MODEL_URL}metadata.json`
    );

    const image = new Image();
    image.src = capturedImage;

    await new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = () => reject(new Error('Image load avvaledu.'));
    });

    const predictions = await model.predict(image);
    predictions.sort((a, b) => b.probability - a.probability);

    const best = predictions[0];
    const label = best.className.toLowerCase();

    let wasteType = '';

    if (label.includes('plastic')) wasteType = 'plastic';
    else if (label.includes('glass')) wasteType = 'glass';
    else if (label.includes('paper')) wasteType = 'paper';
    else if (label.includes('organic') || label.includes('food')) {
      wasteType = 'organic';
    } else if (label.includes('metal')) wasteType = 'metal';

    if (!wasteType) {
      throw new Error(
        `Model prediction: ${best.className}. Ee category ki disposal advice setup cheyyaledu.`
      );
    }

    const response = await fetch('http://localhost:3000/api/disposal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ wasteType })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Disposal advice fetch avvaledu.');
    }

    setScanResult({
      label: best.className,
      confidence: Math.round(best.probability * 100),
      disposalAdvice: data.disposalAdvice
    });
  } catch (error) {
    setScanError(error.message || 'Scanning fail ayyindi. Malli try cheyyi.');
  } finally {
    setIsScanning(false);
  }
};

  const handleReset = () => {
    setCapturedImage(null);
    setImageMeta(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (activeTab === 'camera') {
      startCamera();
    }
  };

  return (
    <section id="scan" className="scan-section">
      <div className="widget-card">
        {/* Header */}
        <div className="widget-header">
          <div className="widget-badge">
            <Camera size={15} />
            <span>Image Intake System</span>
          </div>
          <h1 className="widget-title">SCAN YOUR WASTE</h1>
          <p className="widget-subtitle">
            Take a picture of the waste item using your camera or upload an image from your device.
          </p>
        </div>

        {/* Mode Selector Tabs (only shown when no image has been captured yet) */}
        {!capturedImage && (
          <div className="tab-pill-container">
            <button
              className={`tab-pill ${activeTab === 'upload' ? 'active' : ''}`}
              onClick={() => handleTabChange('upload')}
              type="button"
            >
              <UploadCloud size={18} />
              <span>Upload Photo</span>
            </button>
            <button
              className={`tab-pill ${activeTab === 'camera' ? 'active' : ''}`}
              onClick={() => handleTabChange('camera')}
              type="button"
            >
              <Camera size={18} />
              <span>Use Camera</span>
            </button>
          </div>
        )}

        {/* Central Intake & Preview Area */}
        <div className="scanner-viewport">
          {/* STATE 1: Image Captured / Uploaded Preview */}
          {capturedImage ? (
            <div className="intake-preview-container">
              <div className="preview-media-frame">
                <img
                  src={capturedImage}
                  alt="Captured waste intake"
                  className="preview-image"
                />
                <div className="preview-badge-status">
                  <CheckCircle2 size={16} />
                  <span>Photo Intake Successful</span>
                </div>
              </div>

              {/* File / Capture Meta */}
              <div className="intake-meta-card">
                <div className="meta-row">
                  <span className="meta-label">Source:</span>
                  <strong className="meta-value">{imageMeta?.source || 'Captured Image'}</strong>
                </div>
                {imageMeta?.size && (
                  <div className="meta-row">
                    <span className="meta-label">File Size:</span>
                    <strong className="meta-value">{imageMeta.size}</strong>
                  </div>
                )}
                {imageMeta?.resolution && (
                  <div className="meta-row">
                    <span className="meta-label">Resolution:</span>
                    <strong className="meta-value">{imageMeta.resolution}</strong>
                  </div>
                )}
                <div className="meta-row">
                  <span className="meta-label">Time:</span>
                  <strong className="meta-value">{imageMeta?.timestamp}</strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="intake-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleReset}
                >
                  <RotateCcw size={16} />
                  <span>Retake / Change Photo</span>
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleSubmitPhoto}
                >
                  <span>Submit Photo</span>
                  <ArrowRight size={16} />
                </button>
              </div>
              
{isScanning && (
  <p role="status">AI is scanning your waste image...</p>
)}

{scanError && (
  <p role="alert" style={{ color: 'red' }}>
    {scanError}
  </p>
)}

{scanResult && (
  <div className="scan-result">
    <h2>Waste Analysis Result</h2>
    <p>
      <strong>Waste Type:</strong> {scanResult.label}
    </p>
    <p>
      <strong>Confidence:</strong> {scanResult.confidence}%
    </p>

    <h3>Disposal Advice</h3>
    <ul>
      {scanResult.disposalAdvice.map((advice, index) => (
        <li key={index}>{advice}</li>
      ))}
    </ul>
  </div>
)}

            </div>
          ) : (
            /* STATE 2: Intake Flow (Upload Dropzone or Camera View) */
            <>
              {activeTab === 'upload' && (
                <div
                  className="dropzone"
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const dataUrl = event.target.result;
                        setCapturedImage(dataUrl);
                        setImageMeta({
                          source: file.name,
                          size: `${(file.size / 1024).toFixed(1)} KB`,
                          timestamp: new Date().toLocaleTimeString()
                        });
                        if (onImageCapture) onImageCapture(dataUrl, file);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden-file-input"
                    onChange={handleFileUpload}
                  />
                  <div className="dropzone-icon-circle">
                    <UploadCloud size={38} className="dropzone-icon" />
                  </div>
                  <h3 className="dropzone-title">Drop your image here or browse</h3>
                  <p className="dropzone-hint">
                    Supports JPG, PNG, WEBP files up to 15MB
                  </p>
                  <button type="button" className="btn-browse">
                    <ImageIcon size={16} />
                    <span>Select Photo</span>
                  </button>
                </div>
              )}

              {activeTab === 'camera' && (
                <div className="camera-view-container">
                  {cameraError ? (
                    <div className="camera-error-box">
                      <AlertTriangle size={32} className="error-icon" />
                      <p>{cameraError}</p>
                      <button
                        type="button"
                        className="btn-retry-camera"
                        onClick={startCamera}
                      >
                        Try Again
                      </button>
                    </div>
                  ) : (
                    <div className="video-wrapper">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="camera-video-feed"
                      />
                      <canvas ref={canvasRef} className="hidden-canvas" />
                      <div className="camera-viewfinder-overlay">
                        <div className="viewfinder-crosshair"></div>
                      </div>
                      <div className="camera-controls">
                        <button
                          type="button"
                          className="camera-snap-button"
                          onClick={handleCapturePhoto}
                          title="Capture photo"
                        >
                          <div className="snap-inner-circle"></div>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
