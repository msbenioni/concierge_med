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
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background-color: #F3EFE8;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #C79A3A 0%, #8C651E 100%); padding: 40px 30px; text-align: center;">
          <div style="margin-bottom: 20px;">
            <h1 style="color: #F3EFE8; font-size: 32px; font-weight: 700; margin: 0; letter-spacing: -0.5px;">Compass Connect</h1>
          </div>
          <p style="color: #F3E3B8; font-size: 16px; font-weight: 500; margin: 0; line-height: 1.5;">Medical Journey Support System</p>
        </div>
        
        <!-- Main Content -->
        <div style="padding: 40px 30px;">
          
          <!-- Welcome Section -->
          <div style="background: #FFFFFF; padding: 30px; border-radius: 16px; margin-bottom: 30px; border: 1px solid rgba(44, 38, 35, 0.15); box-shadow: 0 4px 6px rgba(44, 38, 35, 0.08);">
            <h2 style="color: #2C2623; font-size: 24px; font-weight: 600; margin-bottom: 16px; line-height: 1.3;">Interest Registration Confirmed</h2>
            <p style="color: #4A4541; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
              Dear ${first_name} ${last_name},
            </p>
            <p style="color: #4A4541; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Thank you for registering your interest with Compass Connect. We're here to support you on your medical journey with personalized care and attention.
            </p>
            
            <!-- Reference Card -->
            <div style="background: #F3EFE8; padding: 24px; border-radius: 12px; border-left: 4px solid #C79A3A; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(44, 38, 35, 0.1);">
              <p style="margin: 0; color: #6F7B6B; font-size: 14px; font-weight: 500; margin-bottom: 8px;">Your Interest Reference</p>
              <p style="margin: 0; font-size: 28px; font-weight: 700; color: #2C2623; font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;">${booking_ref}</p>
            </div>
          </div>
          
          <!-- Journey Progress -->
          <div style="background: #F3E3B8; padding: 30px; border-radius: 16px; margin-bottom: 30px; border: 1px solid rgba(199, 154, 58, 0.2);">
            <h3 style="color: #8C651E; font-size: 20px; font-weight: 600; margin-bottom: 20px;">Your Journey Progress</h3>
            
            <div style="space-y: 20px;">
              <!-- Step 1 -->
              <div style="display: flex; align-items: flex-start; gap: 16px; padding-bottom: 20px; border-bottom: 1px solid rgba(199, 154, 58, 0.2);">
                <div style="width: 40px; height: 40px; border-radius: 50%; background: #C79A3A; color: #F3EFE8; display: flex; align-items: center; justify-content: center; font-weight: 600; flex-shrink: 0; font-size: 18px;">✓</div>
                <div style="flex: 1;">
                  <h4 style="color: #2C2623; font-size: 16px; font-weight: 600; margin: 0 0 8px 0;">Interest Registered - Complete</h4>
                  <p style="color: #4A4541; margin: 0; font-size: 14px; line-height: 1.5;">Your interest has been successfully registered and saved to our database. This completes your registration with Compass Connect.</p>
                </div>
              </div>
              
              <!-- Step 2 -->
              <div style="display: flex; align-items: flex-start; gap: 16px; padding-bottom: 20px; border-bottom: 1px solid rgba(199, 154, 58, 0.2);">
                <div style="width: 40px; height: 40px; border-radius: 50%; background: #F3E3B8; color: #8C651E; display: flex; align-items: center; justify-content: center; font-weight: 600; flex-shrink: 0; font-size: 18px; border: 2px solid #C79A3A;">2</div>
                <div style="flex: 1;">
                  <h4 style="color: #2C2623; font-size: 16px; font-weight: 600; margin: 0 0 8px;">Health Questionnaire - Your Next Step</h4>
                  <p style="color: #4A4541; margin: 0 0 16px; font-size: 14px; line-height: 1.5;">Click below to complete the hospital's health questionnaire for your surgery quote.</p>
                  <div style="text-align: center; margin-top: 16px;">
                    <a href="https://mexicobariatriccenter.com/health-questionnaire/?RefID=2120" target="_blank"
                       style="background: linear-gradient(135deg, #C79A3A 0%, #8C651E 100%); color: #F3EFE8; padding: 16px 32px; text-decoration: none; border-radius: 12px; font-weight: 600; display: inline-block; font-size: 16px; box-shadow: 0 4px 6px rgba(199, 154, 58, 0.3); transition: all 0.2s ease;">
                      📋 Complete Health Questionnaire
                    </a>
                  </div>
                </div>
              </div>
              
              <!-- Step 3 -->
              <div style="display: flex; align-items: flex-start; gap: 16px; padding-bottom: 20px; border-bottom: 1px solid rgba(199, 154, 58, 0.2);">
                <div style="width: 40px; height: 40px; border-radius: 50%; background: #6F7B6B; color: #F3EFE8; display: flex; align-items: center; justify-content: center; font-weight: 600; flex-shrink: 0; font-size: 18px;">3</div>
                <div style="flex: 1;">
                  <h4 style="color: #2C2623; font-size: 16px; font-weight: 600; margin: 0 0 8px;">Receive Hospital Quote</h4>
                  <p style="color: #4A4541; margin: 0; font-size: 14px; line-height: 1.5;">The hospital will send your personalized surgery quote directly to you (typically within 2-3 business days).</p>
                </div>
              </div>
              
              <!-- Step 4 -->
              <div style="display: flex; align-items: flex-start; gap: 16px; padding-bottom: 20px; border-bottom: 1px solid rgba(199, 154, 58, 0.2);">
                <div style="width: 40px; height: 40px; border-radius: 50%; background: #6F7B6B; color: #F3EFE8; display: flex; align-items: center; justify-content: center; font-weight: 600; flex-shrink: 0; font-size: 18px;">4</div>
                <div style="flex: 1;">
                  <h4 style="color: #2C2623; font-size: 16px; font-weight: 600; margin: 0 0 8px;">Organize Travel with Compass Connect</h4>
                  <p style="color: #4A4541; margin: 0 0 16px; font-size: 14px; line-height: 1.5;">Once you have your quote, return to organize your travel arrangements.</p>
                  <div style="text-align: center; margin-top: 16px;">
                    <a href="${process.env.SITE_URL || 'https://compassconnect.vip'}/organize-travel?ref=${booking_ref}" 
                       style="background: linear-gradient(135deg, #C79A3A 0%, #8C651E 100%); color: #F3EFE8; padding: 16px 32px; text-decoration: none; border-radius: 12px; font-weight: 600; display: inline-block; font-size: 16px; box-shadow: 0 4px 6px rgba(199, 154, 58, 0.3); transition: all 0.2s ease;">
                      ✈️ Organize Travel with Compass Connect
                    </a>
                  </div>
                  <p style="font-size: 12px; color: #6F7B6B; margin-top: 12px; text-align: center; font-style: italic;">
                    Note: Pricing for concierge service is $4000pp and a travel companion is $2000
                  </p>
                </div>
              </div>
              
              <!-- Step 5 -->
              <div style="display: flex; align-items: flex-start; gap: 16px;">
                <div style="width: 40px; height: 40px; border-radius: 50%; background: #6F7B6B; color: #F3EFE8; display: flex; align-items: center; justify-content: center; font-weight: 600; flex-shrink: 0; font-size: 18px;">5</div>
                <div style="flex: 1;">
                  <h4 style="color: #2C2623; font-size: 16px; font-weight: 600; margin: 0 0 8px;">Join Group Support</h4>
                  <p style="color: #4A4541; margin: 0 0 16px; font-size: 14px; line-height: 1.5;">Connect with others on the same medical journey.</p>
                  <div style="text-align: center; margin-top: 16px;">
                    <a href="https://facebook.com/groups/compassconnect" target="_blank"
                       style="background: linear-gradient(135deg, #6F7B6B 0%, #4A4541 100%); color: #F3EFE8; padding: 16px 32px; text-decoration: none; border-radius: 12px; font-weight: 600; display: inline-block; font-size: 16px; box-shadow: 0 4px 6px rgba(111, 123, 107, 0.3); transition: all 0.2s ease;">
                      👥 Join Facebook Support Group
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Important Information -->
          <div style="background: #FFF4D6; padding: 24px; border-radius: 16px; margin-bottom: 30px; border: 1px solid rgba(199, 154, 58, 0.3);">
            <h4 style="color: #8C651E; font-size: 18px; font-weight: 600; margin-bottom: 16px;">📋 Important Information</h4>
            <ul style="color: #4A4541; line-height: 1.6; padding-left: 20px; margin: 0;">
              <li style="margin-bottom: 8px;">Keep your interest reference (${booking_ref}) for all communications</li>
              <li style="margin-bottom: 8px;">Hospital quotes are typically sent within 2-3 business days</li>
              <li style="margin-bottom: 8px;">You can use your hospital reference to organize travel once you receive your quote</li>
            </ul>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background: #2C2623; padding: 30px; text-align: center;">
          <div style="margin-bottom: 20px;">
            <p style="color: #F3E3B8; font-size: 14px; margin-bottom: 12px;">
              Questions? We're here to help.
            </p>
            <a href="mailto:support@compassconnect.vip" style="color: #F3EFE8; text-decoration: none; font-weight: 500;">
              support@compassconnect.vip
            </a>
          </div>
          
          <div style="padding-top: 20px; border-top: 1px solid rgba(243, 239, 232, 0.2);">
            <p style="color: #F3E3B8; font-size: 12px; margin: 0; line-height: 1.5;">
              Compass Connect - Supporting you every step of the way<br>
              <span style="color: rgba(243, 227, 184, 0.7);">© 2024 Compass Connect. All rights reserved.</span>
            </p>
          </div>
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
