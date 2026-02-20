// Database service functions for Netlify functions
const databaseService = {
  // Interests
  async createInterest(interestData) {
    try {
      const { createClient } = require('@supabase/supabase-js');
      const supabaseUrl = process.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
      const { createClient } = require('@supabase/supabase-js');
      const supabaseUrl = process.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
      const { createClient } = require('@supabase/supabase-js');
      const supabaseUrl = process.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
      const { createClient } = require('@supabase/supabase-js');
      const supabaseUrl = process.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
      const { createClient } = require('@supabase/supabase-js');
      const supabaseUrl = process.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
      const { createClient } = require('@supabase/supabase-js');
      const supabaseUrl = process.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
  }
};

module.exports = { databaseService };
