// cleanup-database.js - Mevcut userprogresses collection'ı temizle

const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://user:user123456@cluster0.k0qenmz.mongodb.net/test?retryWrites=true&w=majority';

async function cleanupDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('🔗 Connected to MongoDB Atlas');
    
    // Drop the entire userprogresses collection to remove bad indexes
    const db = mongoose.connection.db;
    
    try {
      await db.collection('userprogresses').drop();
      console.log('🧹 Dropped userprogresses collection');
    } catch (error) {
      if (error.code === 26) {
        console.log('📝 userprogresses collection does not exist (already clean)');
      } else {
        throw error;
      }
    }
    
    console.log('✅ Database cleanup completed');
    
    // Recreate with correct model to ensure proper indexes
    const UserProgress = require('./models/UserProgress');
    console.log('📝 UserProgress model loaded with correct indexes');
    
    await mongoose.disconnect();
    console.log('✅ Cleanup completed successfully');
    
  } catch (error) {
    console.error('❌ Error cleaning database:', error);
    process.exit(1);
  }
}

cleanupDatabase();