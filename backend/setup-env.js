#!/usr/bin/env node

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

console.log('🔧 Backend Environment Setup Helper\n');

// Generate secure secrets
const jwtSecret = crypto.randomBytes(64).toString('hex');
const jwtRefreshSecret = crypto.randomBytes(64).toString('hex');

console.log('✅ Generated secure JWT secrets\n');

// Create .env.example content
const envExample = `# Backend Environment Variables
# Copy this file to .env for local development

# MongoDB Connection (Replace with your MongoDB Atlas connection string)
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>

# JWT Secrets (Generated securely)
JWT_SECRET=${jwtSecret}
JWT_REFRESH_SECRET=${jwtRefreshSecret}

# Email Configuration (Gmail with App Password)
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password

# Environment
NODE_ENV=development

# Frontend URL (for CORS - update when frontend is deployed)
FRONTEND_URL=http://localhost:8080

# Port (optional, defaults to 3000)
PORT=3000
`;

// Write to .env.example
const envPath = path.join(__dirname, '.env.example');
fs.writeFileSync(envPath, envExample);

console.log('📝 Created .env.example file');
console.log('🔑 Generated JWT secrets:');
console.log(`   JWT_SECRET: ${jwtSecret.substring(0, 20)}...`);
console.log(`   JWT_REFRESH_SECRET: ${jwtRefreshSecret.substring(0, 20)}...`);
console.log('\n📋 Next steps:');
console.log('1. Copy .env.example to .env');
console.log('2. Update MONGO_URI with your MongoDB connection string');
console.log('3. Set up Gmail app password for EMAIL_PASS');
console.log('4. Update FRONTEND_URL when you deploy your frontend');
console.log('\n🚀 Ready for deployment!'); 