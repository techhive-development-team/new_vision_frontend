import React, { useState, useRef, useCallback } from "react";
import { Controller } from "react-hook-form";
import { Upload, X, User, Camera, AlertCircle, CheckCircle, FileImage } from "lucide-react";

const StudentImageUpload = ({ 
  name, 
  control, 
  label, 
  error, 
  required = false,
  disabled = false,
  maxSize = 2 * 1024 * 1024, // 2MB default
  acceptedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
}) => {
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  // File validation function
  const validateFile = useCallback((file) => {
    const errors = [];
    
    if (!file.type.startsWith("image/")) {
      errors.push("Please select an image file");
    }
    
    if (!acceptedFormats.includes(file.type)) {
      errors.push(`Supported formats: ${acceptedFormats.map(f => f.split('/')[1].toUpperCase()).join(', ')}`);
    }
    
    if (file.size > maxSize) {
      errors.push(`File size should be less than ${(maxSize / 1024 / 1024).toFixed(1)}MB`);
    }
    
    if (file.size < 1024) {
      errors.push("File appears to be corrupted or too small");
    }
    
    return errors;
  }, [maxSize, acceptedFormats]);

  // Image processing with compression
  const processImage = useCallback(async (file) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions (max 800x800 while maintaining aspect ratio)
        const maxDimension = 800;
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxDimension) {
            height = (height * maxDimension) / width;
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width = (width * maxDimension) / height;
            height = maxDimension;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              // Create new file object with compressed data
              const compressedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now()
              });
              resolve(compressedFile);
            } else {
              reject(new Error('Failed to compress image'));
            }
          },
          file.type,
          0.85 // 85% quality
        );
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  }, []);

  // Handle file selection with processing
  const handleFileSelect = useCallback(async (file, onChange) => {
    if (!file) return;
    
    setIsProcessing(true);
    setUploadProgress(0);
    
    try {
      // Validate file
      const validationErrors = validateFile(file);
      if (validationErrors.length > 0) {
        alert(validationErrors.join('\n'));
        return;
      }
      
      // Simulate progress for UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 100);
      
      let processedFile = file;
      
      // Compress if file is large
      if (file.size > 500 * 1024) { // 500KB threshold
        processedFile = await processImage(file);
      }
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
        onChange(processedFile);
        setUploadProgress(0);
      };
      reader.readAsDataURL(processedFile);
      
    } catch (error) {
      console.error('Image processing error:', error);
      alert(`Error processing image: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  }, [validateFile, processImage]);

  const handleRemoveImage = useCallback((onChange) => {
    setPreview(null);
    setUploadProgress(0);
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  }, [disabled]);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e, onChange) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0], onChange);
    }
  }, [disabled, handleFileSelect]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>

          <div className="space-y-4">
            {/* Upload Area */}
            <div
              className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
                disabled 
                  ? "border-gray-200 bg-gray-50 cursor-not-allowed"
                  : isDragging
                  ? "border-blue-400 bg-blue-50 scale-105"
                  : error 
                  ? "border-red-300 bg-red-50" 
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, onChange)}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept={acceptedFormats.join(',')}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file && !disabled) {
                    handleFileSelect(file, onChange);
                  }
                }}
                disabled={disabled || isProcessing}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
              />

              <div className="space-y-2">
                <div className={`mx-auto w-12 h-12 flex items-center justify-center rounded-full transition-colors ${
                  isProcessing 
                    ? "bg-blue-100 animate-pulse" 
                    : error 
                    ? "bg-red-100" 
                    : "bg-gray-100"
                }`}>
                  {isProcessing ? (
                    <Upload className="w-6 h-6 text-blue-500 animate-bounce" />
                  ) : error ? (
                    <AlertCircle className="w-6 h-6 text-red-500" />
                  ) : (
                    <Upload className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                
                <div>
                  {isProcessing ? (
                    <div className="space-y-2">
                      <p className="text-sm text-blue-600 font-medium">
                        Processing image...
                      </p>
                      <div className="w-32 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 transition-all duration-300 ease-out"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm text-gray-600">
                        <span className={`font-medium ${disabled ? 'text-gray-400' : 'text-blue-600 hover:text-blue-500'}`}>
                          Click to upload
                        </span>{" "}
                        {!disabled && "or drag and drop"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {acceptedFormats.map(f => f.split('/')[1].toUpperCase()).join(', ')} up to {(maxSize / 1024 / 1024).toFixed(1)}MB
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Preview Section */}
            {preview && (
              <div className="relative animate-in fade-in duration-300">
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  {/* Image Preview */}
                  <div className="relative flex-shrink-0 group">
                    <img
                      src={preview}
                      alt="Student preview"
                      className="w-24 h-24 object-cover rounded-lg border-2 border-white shadow-sm"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-200 flex items-center justify-center">
                      <Camera className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    {/* Success indicator */}
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Image Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <FileImage className="w-4 h-4 text-gray-500" />
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {value?.name || "Student Image"}
                      </p>
                    </div>
                    <div className="space-y-1 text-xs text-gray-500">
                      <p>Size: {value?.size ? (value.size / 1024 / 1024).toFixed(2) + " MB" : "Unknown"}</p>
                      <p>Type: {value?.type || "Unknown"}</p>
                      {value?.lastModified && (
                        <p>Modified: {new Date(value.lastModified).toLocaleDateString()}</p>
                      )}
                    </div>
                    <div className="mt-2 flex items-center text-xs text-green-600">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Ready for upload
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(onChange)}
                    disabled={disabled}
                    className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Remove image"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Alternative Upload Button */}
            {!preview && !isProcessing && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={disabled}
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium border rounded-md transition-colors ${
                    disabled
                      ? "text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed"
                      : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  }`}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Student Photo
                </button>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-start space-x-2 p-3 bg-red-50 border border-red-200 rounded-md">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-red-800">Upload Error</p>
                <p className="text-sm text-red-700">{error.message}</p>
              </div>
            </div>
          )}

          {/* Help Text */}
          <div className="text-xs text-gray-500 space-y-1">
            <p>• Upload a clear photo of the student for identification purposes</p>
            <p>• Recommended size: 300x300px or larger</p>
            <p>• The image will be automatically optimized for faster upload</p>
            <p>• Supported formats: JPEG, PNG, GIF, WebP</p>
          </div>

          {/* Processing indicator overlay */}
          {isProcessing && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                <p className="text-sm text-gray-600">Processing...</p>
              </div>
            </div>
          )}
        </div>
      )}
    />
  );
};

export default StudentImageUpload;