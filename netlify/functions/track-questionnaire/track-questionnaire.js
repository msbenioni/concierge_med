// Database service functions for Netlify functions
const databaseService = {
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
  }
};

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ 
        success: false, 
        error: 'Method not allowed' 
      })
    };
  }

  try {
    const { booking_ref, timestamp, user_agent } = JSON.parse(event.body);
    
    console.log('📊 Questionnaire link clicked:', {
      booking_ref,
      timestamp,
      user_agent,
      ip: event.headers['x-forwarded-for'] || event.headers['client-ip']
    });

    // Update database to mark q-form as completed
    try {
      const updateResult = await databaseService.updateInterestQuestionnaireClicked(booking_ref);
      
      if (updateResult.success) {
        console.log('✅ q-form column updated successfully for:', booking_ref);
      } else {
        console.error('❌ Failed to update q-form column:', updateResult.error);
      }
    } catch (dbError) {
      console.error('❌ Database update error:', dbError);
      // Continue with response even if database update fails
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: 'Questionnaire click tracked successfully',
        booking_ref 
      })
    };

  } catch (error) {
    console.error('❌ Error tracking questionnaire click:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        error: error.message 
      })
    };
  }
};
