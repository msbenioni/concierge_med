# Patient Document Management System

This document describes the patient document storage system implemented for Compass Connect.

## Overview

The patient document management system allows administrators to upload, view, and manage patient-related documents directly from the admin panel. Documents are stored securely in Supabase Storage with proper access controls.

## Features

### Document Upload
- **File Types Supported**: PDF, Word documents, text files, and images (JPEG, PNG, GIF)
- **File Size Limit**: 10MB per file
- **Document Types**: Medical reports, passports, visas, insurance documents, consent forms, lab results, medical imaging, and other documents
- **Drag & Drop**: Intuitive file upload with drag-and-drop support
- **Validation**: Client-side file type and size validation

### Document Management
- **View Documents**: Browse all documents for a specific patient
- **Download**: Download documents directly from the interface
- **Delete**: Remove documents with confirmation
- **Search**: Filter documents by patient name or reference
- **Metadata**: Track upload date, file size, and document type

### Security & Access Control
- **Row Level Security**: Documents are protected by RLS policies
- **User Permissions**: Users can only access their own documents
- **Admin Access**: Administrators can manage all documents
- **Secure Storage**: Files stored in Supabase Storage with proper policies

## Setup Instructions

### 1. Database Setup

Run the SQL commands in `database_setup.sql` in your Supabase SQL Editor:

```sql
-- This will create:
-- - patient_documents table
-- - Indexes for performance
-- - RLS policies for security
-- - Storage bucket and policies
-- - Triggers and functions
```

### 2. Storage Bucket Setup

1. Go to your Supabase Dashboard
2. Navigate to Storage
3. Create a new bucket named `patient-documents`
4. Enable public access
5. The storage policies will be automatically applied by the SQL setup

### 3. Environment Variables

Ensure your Supabase environment variables are configured:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Usage

### For Administrators

1. **Access Documents**: In the Admin panel, go to the "Interests" tab
2. **View Documents**: Click the document icon (📄) in the Actions column
3. **Upload Documents**: Click the upload icon (⬆️) in the Actions column
4. **Manage Documents**: Use the document management modal to view, download, or delete files

### Document Types

The system supports the following document types:
- **Medical Report**: Patient medical records and reports
- **Passport**: Patient passport copies
- **Visa**: Travel visa documents
- **Insurance**: Insurance policy documents
- **Consent Form**: Signed consent forms
- **Lab Results**: Laboratory test results
- **Medical Imaging**: X-rays, MRIs, and other medical images
- **Other**: Any other patient-related documents

## File Structure

Documents are stored in the following structure in Supabase Storage:
```
patient-documents/
├── {interest_id}/
│   ├── {timestamp}_{random_id}.pdf
│   ├── {timestamp}_{random_id}.jpg
│   └── ...
```

## API Functions

The following database service functions are available:

### Document Operations
- `uploadDocument(file, interestId, documentType, description)` - Upload a new document
- `getDocumentsByInterestId(interestId)` - Get all documents for a patient
- `getAllDocuments()` - Get all documents (admin only)
- `deleteDocument(documentId)` - Delete a document
- `updateDocument(documentId, updates)` - Update document metadata
- `getDocumentById(documentId)` - Get a specific document

## Components

### DocumentUpload Component
- Handles file upload with validation
- Supports drag-and-drop interface
- Provides document type selection
- Shows upload progress and feedback

### DocumentList Component
- Displays documents for a specific patient
- Provides view, download, and delete actions
- Shows document metadata
- Handles empty states and loading

## Security Considerations

1. **File Validation**: All files are validated for type and size
2. **Access Control**: RLS policies ensure users can only access their own documents
3. **Secure Storage**: Files stored in Supabase Storage with proper policies
4. **Admin Oversight**: Administrators can manage all documents
5. **Audit Trail**: Document uploads and deletions are tracked

## Troubleshooting

### Common Issues

1. **Upload Fails**: Check file size (max 10MB) and file type
2. **Storage Access**: Ensure storage bucket is created and policies are applied
3. **Permission Errors**: Verify RLS policies are correctly configured
4. **Missing Documents**: Check if the interest_id is valid

### Error Messages

- "Invalid file type": Upload only supported file types
- "File size must be less than 10MB": Reduce file size before uploading
- "Failed to upload document": Check network connection and storage configuration
- "Access denied": Verify user permissions and RLS policies

## Future Enhancements

Potential improvements for the document system:

1. **Document Preview**: Built-in PDF and image preview
2. **Bulk Upload**: Upload multiple files at once
3. **Document Sharing**: Secure sharing links for patients
4. **Version Control**: Track document versions and changes
5. **Advanced Search**: Search within document content
6. **Document Templates**: Pre-defined document templates
7. **Automated Processing**: OCR and data extraction from documents
8. **Integration**: Connect with external document management systems

## Support

For issues or questions about the document management system:

1. Check the troubleshooting section above
2. Verify your Supabase configuration
3. Review the database setup SQL
4. Test with different file types and sizes
5. Contact your system administrator for access issues
