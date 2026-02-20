const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

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
    const { email, first_name, last_name, booking_ref, phone } = JSON.parse(event.body);
    
    console.log('📧 Server-side email send process starting...');
    console.log('📧 To:', email);
    console.log('📧 Ref:', booking_ref);
    console.log('📧 Name:', `${first_name} ${last_name}`);

    // Validate required fields
    if (!email || !first_name || !last_name || !booking_ref) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          success: false, 
          error: 'Missing required fields: email, first_name, last_name, booking_ref' 
        })
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          success: false, 
          error: 'Invalid email format' 
        })
      };
    }

    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin-bottom: 10px;">Compass Connect</h1>
          <p style="color: #64748b; font-size: 16px;">Medical Journey Support System</p>
        </div>
        
        <div style="background: #f8fafc; padding: 30px; border-radius: 10px; margin-bottom: 30px;">
          <h2 style="color: #1e293b; margin-bottom: 20px;">Interest Registration Confirmed</h2>
          <p style="color: #475569; line-height: 1.6; margin-bottom: 20px;">
            Dear ${first_name} ${last_name},
          </p>
          <p style="color: #475569; line-height: 1.6; margin-bottom: 20px;">
            Thank you for registering your interest with Compass Connect. We're here to support you on your medical journey.
          </p>
          <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb; margin-bottom: 20px;">
            <p style="margin: 0; color: #1e293b;"><strong>Your Interest Reference:</strong></p>
            <p style="margin: 5px 0 0 0; font-size: 24px; font-weight: bold; color: #2563eb;">${booking_ref}</p>
          </div>
        </div>
        
        <div style="background: #f0f9ff; padding: 25px; border-radius: 10px; margin-bottom: 30px;">
          <h3 style="color: #0369a1; margin-bottom: 15px;">Next Steps</h3>
          <ol style="color: #475569; line-height: 1.8; padding-left: 20px;">
            <li style="margin-bottom: 10px;"><strong>Complete Health Questionnaire:</strong> Click the link below to fill out your health questionnaire</li>
            <li style="margin-bottom: 10px;"><strong>Receive Hospital Quote:</strong> We'll email you a personalized quote from our trusted hospital partners</li>
            <li style="margin-bottom: 10px;"><strong>Organize Travel:</strong> Use your hospital reference to arrange travel with Compass Connect</li>
            <li style="margin-bottom: 10px;"><strong>Group Support:</strong> Join our supportive community of travelers</li>
          </ol>
        </div>
        
        <div style="text-align: center; margin-bottom: 30px;">
          <a href="${process.env.SITE_URL || 'https://compassconnect.vip'}/questionnaire?ref=${booking_ref}" 
             style="background: #2563eb; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
            Complete Health Questionnaire
          </a>
          <p style="color: #64748b; font-size: 12px; margin-top: 10px;">
            Link: ${process.env.SITE_URL || 'https://compassconnect.vip'}/questionnaire?ref=${booking_ref}
          </p>
        </div>
        
        <div style="background: #fef3c7; padding: 20px; border-radius: 10px; margin-bottom: 30px;">
          <h4 style="color: #92400e; margin-bottom: 10px;">Important Information</h4>
          <ul style="color: #78350f; line-height: 1.6; padding-left: 20px; margin: 0;">
            <li style="margin-bottom: 8px;">Keep your interest reference (${booking_ref}) for all communications</li>
            <li style="margin-bottom: 8px;">Hospital quotes are typically sent within 2-3 business days</li>
            <li style="margin-bottom: 8px;">You can use your hospital reference to organize travel once you receive your quote</li>
          </ul>
        </div>
        
        <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center;">
          <p style="color: #64748b; font-size: 14px; margin-bottom: 10px;">
            If you have any questions, please contact us at support@compassconnect.vip
          </p>
          <p style="color: #64748b; font-size: 12px;">
            Compass Connect - Supporting you every step of the way
          </p>
        </div>
      </div>
    `;

    const response = await resend.emails.send({
      from: 'Compass Connect <noreply@compassconnect.vip>',
      to: [email],
      subject: `Interest Confirmation - Reference: ${booking_ref}`,
      html: emailContent,
    });

    console.log('✅ Email sent successfully:', response);

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        data: response 
      })
    };

  } catch (error) {
    console.error('❌ Error sending email:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        error: error.message 
      })
    };
  }
};
