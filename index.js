// app.js veya server.js - Backend setup

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`🌐 ${req.method} ${req.url}`);
  console.log(`🔑 Auth: ${req.headers.authorization ? 'Present' : 'Missing'}`);
  next();
});

// MongoDB connection
const MONGO_URI = 'mongodb+srv://user:user123456@cluster0.k0qenmz.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('🔗 MongoDB connected to test database');
    console.log('📍 Database:', mongoose.connection.name);
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Auth middleware (simple version for testing)
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('❌ No valid authorization header found');
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'No valid authorization header found'
    });
  }
  
  const token = authHeader.substring(7); // Remove 'Bearer ' prefix
  
  if (!token) {
    console.log('❌ No token found');
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'No token found'
    });
  }
  
  // For testing, accept any token
  // In production, verify Firebase token here
  console.log('✅ Token accepted:', token.substring(0, 20) + '...');
  
  // You can add Firebase token verification here:
  // const admin = require('firebase-admin');
  // try {
  //   const decodedToken = await admin.auth().verifyIdToken(token);
  //   req.user = decodedToken;
  // } catch (error) {
  //   return res.status(401).json({ error: 'Invalid token' });
  // }
  
  next();
};

// Routes
const progressRoutes = require('./routes/progress');

// Test route (no auth required)
app.get('/api/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Backend is running!',
    database: mongoose.connection.name,
    timestamp: new Date().toISOString()
  });
});

// Protected routes (auth required)
app.use('/api/progress', authMiddleware, progressRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('❌ Unhandled error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: error.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  console.log(`❌ Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
  console.log(`🔗 API endpoints:`);
  console.log(`   GET  /api/test (no auth)`);
  console.log(`   GET  /api/progress/:language/:category`);
  console.log(`   GET  /api/progress/:language/:category/:level/exercises`);
  console.log(`   POST /api/progress/:language/:category/:level/submit`);
});

module.exports = app;