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

    // TODO: Save to database - update questionnaire_clicked status
    // Example: await databaseService.updateQuestionnaireClicked(booking_ref);

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
