export const sendInterestConfirmationEmail = async (bookingData) => {
  try {
    const { email, first_name, last_name, booking_ref, phone } = bookingData;
    
    console.log('📧 Starting secure email send process...');
    console.log('📧 To:', email);
    console.log('📧 Ref:', booking_ref);
    console.log('📧 Name:', `${first_name} ${last_name}`);
    
    // Call the secure Netlify function
    const response = await fetch('/.netlify/functions/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        first_name,
        last_name,
        booking_ref,
        phone
      })
    });

    const result = await response.json();

    if (response.ok && result.success) {
      console.log('✅ Email sent successfully via secure function:', result.data);
      return { success: true, data: result.data };
    } else {
      console.error('❌ Email failed to send:', result.error);
      
      // Development fallback: show email content in console
      if (import.meta.env.DEV) {
        console.log('📧 EMAIL CONTENT (Development Mode - Email Failed):');
        console.log('To:', email);
        console.log('Subject:', `Interest Confirmation - Reference: ${booking_ref}`);
        console.log('Error:', result.error);
      }
      
      return { success: false, error: result.error || 'Unknown error occurred' };
    }
  } catch (error) {
    console.error('❌ Error calling email function:', error);
    
    // Development fallback: show error details
    if (import.meta.env.DEV) {
      console.log('📧 EMAIL FUNCTION ERROR (Development Mode):');
      console.log('Error:', error.message);
      console.log('This might be a network error or the function is not deployed yet.');
    }
    
    return { success: false, error: error.message };
  }
};
