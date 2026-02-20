import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database service functions
export const databaseService = {
  // Interests
  async createInterest(interestData) {
    try {
      const { data, error } = await supabase
        .from('interests')
        .insert([interestData])
        .select();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error creating interest:', error);
      return { success: false, error: error.message };
    }
  },

  async getInterests() {
    try {
      const { data, error } = await supabase
        .from('interests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching interests:', error);
      return { success: false, error: error.message };
    }
  },

  async getInterestByRef(bookingRef) {
    try {
      const { data, error } = await supabase
        .from('interests')
        .select('*')
        .eq('booking_ref', bookingRef)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
        throw error;
      }
      
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching interest by ref:', error);
      return { success: false, error: error.message };
    }
  },

  async updateInterest(interestId, updates) {
    try {
      const { data, error } = await supabase
        .from('interests')
        .update(updates)
        .eq('id', interestId)
        .select();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error updating interest:', error);
      return { success: false, error: error.message };
    }
  },

  async updateInterestQuestionnaireClicked(bookingRef) {
    try {
      const { data, error } = await supabase
        .from('interests')
        .update({ q_form_clicked: true })
        .eq('booking_ref', bookingRef)
        .select();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error updating q-form clicked status:', error);
      return { success: false, error: error.message };
    }
  },

  async deleteInterest(interestId) {
    try {
      const { error } = await supabase
        .from('interests')
        .delete()
        .eq('id', interestId);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error deleting interest:', error);
      return { success: false, error: error.message };
    }
  },

  // Companions
  async createCompanion(companionData) {
    try {
      const { data, error } = await supabase
        .from('companions')
        .insert([companionData])
        .select();

      if (error) throw error;
      return { success: true, data: data[0] };
    } catch (error) {
      console.error('Error creating companion:', error);
      return { success: false, error: error.message };
    }
  },

  async getCompanionByInterestId(interestId) {
    try {
      const { data, error } = await supabase
        .from('companions')
        .select('*')
        .eq('interest_id', interestId)
        .maybeSingle(); // Use maybeSingle() instead of single() to handle no results

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
        throw error;
      }
      return { success: true, data: data || null };
    } catch (error) {
      console.error('Error fetching companion:', error);
      return { success: false, error: error.message };
    }
  },

  async deleteCompanion(companionId) {
    try {
      const { error } = await supabase
        .from('companions')
        .delete()
        .eq('id', companionId);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error deleting companion:', error);
      return { success: false, error: error.message };
    }
  },

  async updateCompanion(companionId, updates) {
    try {
      const { data, error } = await supabase
        .from('companions')
        .update(updates)
        .eq('id', companionId)
        .select();

      if (error) throw error;
      return { success: true, data: data[0] };
    } catch (error) {
      console.error('Error updating companion:', error);
      return { success: false, error: error.message };
    }
  },

  async deleteCompanion(companionId) {
    try {
      const { error } = await supabase
        .from('companions')
        .delete()
        .eq('id', companionId);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error deleting companion:', error);
      return { success: false, error: error.message };
    }
  },

  // Questionnaires
  async createQuestionnaire(questionnaireData) {
    try {
      const { data, error } = await supabase
        .from('questionnaires')
        .insert([questionnaireData])
        .select();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error creating questionnaire:', error);
      return { success: false, error: error.message };
    }
  },

  async getQuestionnaires() {
    try {
      const { data, error } = await supabase
        .from('questionnaires')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching questionnaires:', error);
      return { success: false, error: error.message };
    }
  },

  async getQuestionnaireByReference(reference) {
    try {
      const { data, error } = await supabase
        .from('questionnaires')
        .select('*')
        .eq('reference', reference)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching questionnaire by reference:', error);
      return { success: false, error: error.message };
    }
  },

  // Trips/Featured Trips
  async getFeaturedTrips() {
    try {
      const { data, error } = await supabase
        .from('trips')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching featured trips:', error);
      return { success: false, error: error.message };
    }
  },

  async getAllTrips() {
    try {
      const { data, error } = await supabase
        .from('trips')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching all trips:', error);
      return { success: false, error: error.message };
    }
  },

  async createTrip(tripData) {
    try {
      const { data, error } = await supabase
        .from('trips')
        .insert([tripData])
        .select();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error creating trip:', error);
      return { success: false, error: error.message };
    }
  },

  async updateTrip(tripId, updates) {
    try {
      const { data, error } = await supabase
        .from('trips')
        .update(updates)
        .eq('id', tripId)
        .select();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error updating trip:', error);
      return { success: false, error: error.message };
    }
  },

  async deleteTrip(tripId) {
    try {
      const { error } = await supabase
        .from('trips')
        .delete()
        .eq('id', tripId);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error deleting trip:', error);
      return { success: false, error: error.message };
    }
  },

  // Users
  async createUser(userData) {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([userData])
        .select();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error creating user:', error);
      return { success: false, error: error.message };
    }
  },

  async getUserByEmail(email) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching user by email:', error);
      return { success: false, error: error.message };
    }
  },

  async updateUser(userId, updates) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error updating user:', error);
      return { success: false, error: error.message };
    }
  },

  // Analytics and Stats
  async getBookingStats() {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('booking_status, payment_status, created_at');

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching booking stats:', error);
      return { success: false, error: error.message };
    }
  },

  async getQuestionnaireStats() {
    try {
      const { data, error } = await supabase
        .from('questionnaires')
        .select('status, created_at');

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching questionnaire stats:', error);
      return { success: false, error: error.message };
    }
  },

  // Patient Documents
  async uploadDocument(file, interestId, documentType, description = '') {
    try {
      // Generate unique file path
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `patient-documents/${interestId}/${fileName}`;

      // Upload file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('patient-documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL for the file
      const { data: urlData } = supabase.storage
        .from('patient-documents')
        .getPublicUrl(filePath);

      // Create document record in database
      const documentData = {
        interest_id: interestId,
        document_type: documentType,
        file_name: file.name,
        file_path: filePath,
        file_size: file.size,
        file_type: file.type,
        public_url: urlData.publicUrl,
        description: description,
        uploaded_at: new Date().toISOString()
      };

      const { data: docData, error: docError } = await supabase
        .from('patient_documents')
        .insert([documentData])
        .select();

      if (docError) throw docError;

      return { success: true, data: docData[0] };
    } catch (error) {
      console.error('Error uploading document:', error);
      return { success: false, error: error.message };
    }
  },

  async getDocumentsByInterestId(interestId) {
    try {
      const { data, error } = await supabase
        .from('patient_documents')
        .select('*')
        .eq('interest_id', interestId)
        .order('uploaded_at', { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching documents:', error);
      return { success: false, error: error.message };
    }
  },

  async getAllDocuments() {
    try {
      const { data, error } = await supabase
        .from('patient_documents')
        .select(`
          *,
          interests!inner(
            id,
            booking_ref,
            full_name,
            email,
            trip_title
          )
        `)
        .order('uploaded_at', { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching all documents:', error);
      return { success: false, error: error.message };
    }
  },

  async deleteDocument(documentId) {
    try {
      // Get document info first
      const { data: docData, error: fetchError } = await supabase
        .from('patient_documents')
        .select('file_path')
        .eq('id', documentId)
        .single();

      if (fetchError) throw fetchError;

      // Delete file from storage
      const { error: storageError } = await supabase.storage
        .from('patient-documents')
        .remove([docData.file_path]);

      if (storageError) throw storageError;

      // Delete database record
      const { error: dbError } = await supabase
        .from('patient_documents')
        .delete()
        .eq('id', documentId);

      if (dbError) throw dbError;

      return { success: true };
    } catch (error) {
      console.error('Error deleting document:', error);
      return { success: false, error: error.message };
    }
  },

  async updateDocument(documentId, updates) {
    try {
      const { data, error } = await supabase
        .from('patient_documents')
        .update(updates)
        .eq('id', documentId)
        .select();

      if (error) throw error;
      return { success: true, data: data[0] };
    } catch (error) {
      console.error('Error updating document:', error);
      return { success: false, error: error.message };
    }
  },

  async getDocumentById(documentId) {
    try {
      const { data, error } = await supabase
        .from('patient_documents')
        .select('*')
        .eq('id', documentId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching document:', error);
      return { success: false, error: error.message };
    }
  }
};

export default supabase;
