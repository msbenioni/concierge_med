// Test file to verify email functionality
// This can be used for testing purposes

import { sendInterestConfirmationEmail } from './emailService.js';

const testBookingData = {
  email: "test@example.com",
  first_name: "Test",
  last_name: "User",
  booking_ref: "CC-TEST123",
  phone: "+1234567890"
};

// Test the email function
const testEmail = async () => {
  console.log('Testing email functionality...');
  try {
    const result = await sendInterestConfirmationEmail(testBookingData);
    console.log('Email test result:', result);
  } catch (error) {
    console.error('Email test failed:', error);
  }
};

export { testEmail };
