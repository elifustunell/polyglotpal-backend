// config/firebase.js - Firebase Admin SDK configuration
const admin = require('firebase-admin');

// Check if Firebase Admin is already initialized
if (!admin.apps.length) {
  try {
    // Initialize Firebase Admin SDK
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
      // Optional: Add database URL if using Realtime Database
      // databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}-default-rtdb.firebaseio.com/`
    });
    
    console.log('✅ Firebase Admin SDK initialized successfully');
  } catch (error) {
    console.error('❌ Firebase Admin SDK initialization error:', error);
    
    // Fallback for development environment
    if (process.env.NODE_ENV === 'development') {
      console.log('🔄 Using development mode - some Firebase features may be limited');
    }
  }
} else {
  console.log('✅ Firebase Admin SDK already initialized');
}

module.exports = admin;