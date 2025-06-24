// Simple test script to demonstrate OTP functionality
const axios = require('axios');

const API_BASE = 'http://localhost:3000/api';

async function testOTP() {
  try {
    const testEmail = 'test@example.com';
    
    console.log('🧪 Testing OTP functionality...');
    console.log('📧 Email:', testEmail);
    
    // Step 1: Send OTP
    console.log('\n1️⃣ Sending OTP...');
    const sendResponse = await axios.post(`${API_BASE}/auth/send-otp`, {
      email: testEmail
    });
    
    console.log('✅ OTP sent successfully!');
    console.log('📝 Response:', sendResponse.data);
    
    // Step 2: Verify OTP (using the OTP from console log)
    if (sendResponse.data.otp) {
      console.log('\n2️⃣ Verifying OTP...');
      console.log('🔢 OTP from response:', sendResponse.data.otp);
      
      const verifyResponse = await axios.post(`${API_BASE}/auth/verify-otp`, {
        email: testEmail,
        otp: sendResponse.data.otp
      });
      
      console.log('✅ OTP verified successfully!');
      console.log('🔑 Token received:', verifyResponse.data.token ? 'Yes' : 'No');
      console.log('👤 User:', verifyResponse.data.name);
    } else {
      console.log('\n⚠️ No OTP in response (check console for OTP)');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

// Test guest user creation
async function testGuestUser() {
  try {
    console.log('\n🎭 Testing Guest User creation...');
    
    const response = await axios.post(`${API_BASE}/auth/guest`);
    
    console.log('✅ Guest user created successfully!');
    console.log('👤 Guest name:', response.data.name);
    console.log('📧 Guest email:', response.data.email);
    console.log('🔑 Token received:', response.data.token ? 'Yes' : 'No');
    
  } catch (error) {
    console.error('❌ Guest user creation error:', error.response?.data || error.message);
  }
}

// Run tests
async function runTests() {
  console.log('🚀 Starting API tests...\n');
  
  await testGuestUser();
  await testOTP();
  
  console.log('\n✨ Tests completed!');
}

runTests(); 