import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Trash2, 
  Eye, 
  Calendar,
  File,
  Image,
  Paperclip,
  ExternalLink,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { databaseService } from '@/services/databaseService';
import { formatDate, DATE_FORMATS } from '@/utils/dateFormats';
import { 
  COMPONENTS, 
  COLORS, 
  GLASS, 
  BORDERS,
  TEXT_PRIMARY_ALPHA_70
} from '@/constants/colors';

const DOCUMENT_TYPE_LABELS = {
  medical_report: 'Medical Report',
  passport: 'Passport',
  visa: 'Visa',
  insurance: 'Insurance Document',
  consent_form: 'Consent Form',
  lab_results: 'Lab Results',
  imaging: 'Medical Imaging',
  other: 'Other Document'
};

const DOCUMENT_TYPE_COLORS = {
  medical_report: 'bg-red-100 text-red-800',
  passport: 'bg-blue-100 text-blue-800',
  visa: 'bg-green-100 text-green-800',
  insurance: 'bg-purple-100 text-purple-800',
  consent_form: 'bg-yellow-100 text-yellow-800',
  lab_results: 'bg-indigo-100 text-indigo-800',
  imaging: 'bg-pink-100 text-pink-800',
  other: 'bg-gray-100 text-gray-800'
};

export default function DocumentList({ interestId, patientInfo, onDocumentDeleted }) {
  const { toast } = useToast();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDocuments();
  }, [interestId]);

  const loadDocuments = async () => {
    if (!interestId) return;

    try {
      setLoading(true);
      setError(null);
      
      const result = await databaseService.getDocumentsByInterestId(interestId);
      
      if (result.success) {
        setDocuments(result.data || []);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to load documents');
      console.error('Error loading documents:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (document) => {
    try {
      // Create a temporary link to download the file
      const link = document.createElement('a');
      link.href = document.public_url;
      link.download = document.file_name;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download Started",
        description: "Document download has been initiated",
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download Failed",
        description: "Failed to download document",
        variant: "destructive",
      });
    }
  };

  const handleView = (document) => {
    // Open document in new tab
    window.open(document.public_url, '_blank');
  };

  const handleDelete = async (documentId) => {
    if (!confirm('Are you sure you want to delete this document? This action cannot be undone.')) {
      return;
    }

    try {
      const result = await databaseService.deleteDocument(documentId);
      
      if (result.success) {
        setDocuments(prev => prev.filter(doc => doc.id !== documentId));
        onDocumentDeleted && onDocumentDeleted();
        
        toast({
          title: "Document Deleted",
          description: "Document has been removed successfully",
        });
      } else {
        toast({
          title: "Delete Failed",
          description: result.error || "Failed to delete document",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: "Delete Failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
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

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-16 bg-gray-200 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-4 border-red-200 bg-red-50">
        <div className="flex items-center gap-2 text-red-700">
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm">{error}</span>
        </div>
      </Card>
    );
  }

  if (documents.length === 0) {
    return (
      <Card className="p-8 text-center border-gray-200 bg-gray-50">
        <File className="w-12 h-12 mx-auto text-gray-400 mb-3" />
        <p className="text-gray-600 font-medium">No documents uploaded</p>
        <p className="text-gray-500 text-sm mt-1">
          Upload patient-related documents to get started
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {patientInfo && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm font-medium text-blue-900">
            Documents for: {patientInfo?.full_name || patientInfo?.trip_title || 'Patient'}
          </p>
          {patientInfo?.email && (
            <p className="text-xs text-blue-700 mt-1">{patientInfo.email}</p>
          )}
        </div>
      )}

      {documents.map((document, index) => {
        const FileIcon = getFileIcon(document.file_type);
        
        return (
          <motion.div
            key={document.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className="p-4 hover:shadow-md transition-shadow cursor-pointer"
              style={{ 
                backgroundColor: GLASS.CARD_BACKGROUND, 
                border: `1px solid ${BORDERS.TEXT_SUBTLE}` 
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <FileIcon className="w-5 h-5 text-gray-600" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm truncate" style={{ color: COMPONENTS.TEXT_PRIMARY }}>
                        {document.file_name}
                      </h4>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${DOCUMENT_TYPE_COLORS[document.document_type] || DOCUMENT_TYPE_COLORS.other}`}
                      >
                        {DOCUMENT_TYPE_LABELS[document.document_type] || 'Other'}
                      </Badge>
                    </div>
                    
                    {document.description && (
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                        {document.description}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(new Date(document.uploaded_at), DATE_FORMATS.DISPLAY)}
                      </div>
                      <div className="flex items-center gap-1">
                        <File className="w-3 h-3" />
                        {formatFileSize(document.file_size)}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 ml-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleView(document)}
                    className="rounded-lg p-2 h-8 w-8"
                    title="View document"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDownload(document)}
                    className="rounded-lg p-2 h-8 w-8"
                    title="Download document"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(document.id)}
                    className="rounded-lg p-2 h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                    title="Delete document"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
      
      <div className="text-xs text-gray-500 pt-2 border-t border-gray-200">
        {documents.length} document{documents.length !== 1 ? 's' : ''} uploaded
      </div>
    </div>
  );
}
