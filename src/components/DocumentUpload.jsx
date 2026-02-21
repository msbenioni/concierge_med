import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  File, 
  X, 
  AlertCircle, 
  CheckCircle, 
  FileText,
  Image,
  Paperclip
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast, TOAST_CONFIG } from '@/components/ui/use-toast';
import { databaseService } from '@/services/databaseService';
import { 
  COMPONENTS, 
  COLORS, 
  BORDERS,
  BACKGROUND_SUBTLE_LIGHT,
  BACKGROUND_DIALOG
} from '@/constants/colors';

const DOCUMENT_TYPES = {
  medical_report: 'Medical Report',
  passport: 'Passport',
  visa: 'Visa',
  insurance: 'Insurance Document',
  consent_form: 'Consent Form',
  lab_results: 'Lab Results',
  imaging: 'Medical Imaging (X-ray/MRI)',
  other: 'Other Document'
};

const ALLOWED_FILE_TYPES = {
  'application/pdf': true,
  'image/jpeg': true,
  'image/png': true,
  'image/gif': true,
  'application/msword': true,
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': true,
  'text/plain': true
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function DocumentUpload({ interestId, onUploadSuccess, onClose }) {
  const { toast } = useToast();
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentType, setDocumentType] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

  const validateFile = (file) => {
    const newErrors = {};

    if (!ALLOWED_FILE_TYPES[file.type]) {
      newErrors.file = 'Invalid file type. Please upload PDF, Word, or image files.';
    }

    if (file.size > MAX_FILE_SIZE) {
      newErrors.file = 'File size must be less than 10MB.';
    }

    return newErrors;
  };

  const handleFileSelect = (file) => {
    const validationErrors = validateFile(file);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSelectedFile(null);
      return;
    }

    setErrors({});
    setSelectedFile(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) return Image;
    if (fileType === 'application/pdf') return FileText;
    return Paperclip;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = {};
    
    if (!selectedFile) {
      newErrors.file = 'Please select a file';
    }
    
    if (!documentType) {
      newErrors.documentType = 'Please select a document type';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsUploading(true);
    setErrors({});

    try {
      const result = await databaseService.uploadDocument(
        selectedFile,
        interestId,
        documentType,
        description
      );

      if (result.success) {
        toast({
          title: "Document Uploaded",
          description: "Document has been uploaded successfully!",
          duration: TOAST_CONFIG.DURATION.NORMAL,
        });
        
        onUploadSuccess && onUploadSuccess(result.data);
        onClose && onClose();
        
        // Reset form
        setSelectedFile(null);
        setDocumentType('');
        setDescription('');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        toast({
          title: "Upload Failed",
          description: result.error || "Failed to upload document",
          variant: "destructive",
          duration: TOAST_CONFIG.DURATION.NORMAL,
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: "An unexpected error occurred",
        variant: "destructive",
        duration: TOAST_CONFIG.DURATION.NORMAL,
      });
    } finally {
      setIsUploading(false);
    }
  };

  const FileIcon = selectedFile ? getFileIcon(selectedFile.type) : File;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: BACKGROUND_DIALOG, border: `1px solid ${BORDERS.TEXT_SUBTLE}` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: COLORS.ACCENT_PRIMARY }}>
                <Upload className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold" style={{ color: COMPONENTS.TEXT_PRIMARY }}>Upload Document</h2>
                <p className="text-sm" style={{ color: COMPONENTS.TEXT_MUTED }}>Add patient-related document</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="rounded-full"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* File Upload Area */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Select File</Label>
              <div
                className="relative border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer"
                style={{
                  borderColor: dragActive ? COLORS.ACCENT_PRIMARY : selectedFile ? '#10b981' : errors.file ? '#ef4444' : BORDERS.TEXT_SUBTLE,
                  backgroundColor: dragActive ? COLORS.ACCENT_PRIMARY_ALPHA_10 : selectedFile ? 'rgba(16, 185, 129, 0.1)' : errors.file ? 'rgba(239, 68, 68, 0.1)' : BACKGROUND_SUBTLE_LIGHT
                }}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileInputChange}
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.webp,.gif"
                  className="hidden"
                />
                
                {selectedFile ? (
                  <div className="flex items-center justify-center gap-3">
                    <FileIcon className="w-8 h-8 text-green-600" />
                    <div className="text-left">
                      <p className="font-medium text-sm text-gray-900">{selectedFile.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(selectedFile.size)}</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-8 h-8 mx-auto text-gray-400" />
                    <p className="text-sm text-gray-600">
                      Drag and drop a file here, or click to select
                    </p>
                    <p className="text-xs text-gray-500">
                      PDF, Word, or image files (Max 10MB)
                    </p>
                  </div>
                )}
              </div>
              {errors.file && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.file}
                </p>
              )}
            </div>

            {/* Document Type */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Document Type</Label>
              <Select value={documentType} onValueChange={setDocumentType}>
                <SelectTrigger className={`rounded-xl ${errors.documentType ? 'border-red-500' : ''}`}>
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(DOCUMENT_TYPES).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.documentType && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.documentType}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Description (Optional)</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add any additional notes about this document..."
                className="resize-none rounded-xl"
                rows={3}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 rounded-xl"
                disabled={isUploading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 rounded-xl"
                style={{ backgroundColor: COLORS.ACCENT_PRIMARY }}
                disabled={isUploading || !selectedFile || !documentType}
              >
                {isUploading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Uploading...
                  </div>
                ) : (
                  'Upload Document'
                )}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}
