import nodemailer from 'nodemailer';

// Check if email credentials are configured
const isEmailConfigured = process.env.EMAIL_USER && process.env.EMAIL_PASS;

console.log('📧 Email Configuration Status:');
console.log('EMAIL_USER:', process.env.EMAIL_USER ? '✅ Configured' : '❌ Missing');
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '✅ Configured' : '❌ Missing');
console.log('isEmailConfigured:', isEmailConfigured);

let transporter: nodemailer.Transporter;

if (isEmailConfigured) {
  console.log('🔧 Creating Gmail transporter...');
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  
  // Verify transporter configuration
  transporter.verify((error, success) => {
    if (error) {
      console.error('❌ Email transporter verification failed:', error);
    } else {
      console.log('✅ Email transporter verified successfully');
    }
  });
} else {
  // Create a test account for development
  console.warn('⚠️ Email credentials not configured. Using test account for development.');
  transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: 'test@example.com',
      pass: 'testpass',
    },
  });
}

export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    if (!isEmailConfigured) {
      // In development, just log the email instead of sending
      console.log('📧 Email would be sent:');
      console.log('To:', to);
      console.log('Subject:', subject);
      console.log('Content:', text);
      console.log('---');
      return;
    }

    console.log('📧 Attempting to send email to:', to);
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });

    console.log('✅ Email sent successfully:', info.messageId);
    console.log('📧 Email preview URL:', nodemailer.getTestMessageUrl(info));
    return info;
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    throw new Error(`Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
