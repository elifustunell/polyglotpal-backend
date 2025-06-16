// scripts/updateImages.js - Hızlı resim ekleme scripti

const mongoose = require('mongoose');
const Exercise = require('../models/Exercise');

const MONGO_URI = 'mongodb+srv://user:user123456@cluster0.k0qenmz.mongodb.net/test?retryWrites=true&w=majority';

// 🔥 HAZIR RESİM MAPPINGS
const QUICK_IMAGES = {
  'Red': 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=300&fit=crop',
  'Cat': 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop',
  'Pen': 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=300&fit=crop',
  'Water': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop',
  'Shoes': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
  'Refrigerator': 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=300&fit=crop',
  'Bicycle': 'https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=400&h=300&fit=crop',
  'Thunderstorm': 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=400&h=300&fit=crop',
  'Saw': 'https://images.unsplash.com/photo-1609205418106-b5a7c7db8e5a?w=400&h=300&fit=crop',
  'Petal': 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=300&fit=crop',
  
  // German images
  'Katze': 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=400&h=300&fit=crop',
  'Apfel': 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=300&fit=crop',
  'Auto': 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=400&h=300&fit=crop',
  'Sonne': 'https://images.unsplash.com/photo-1504050939949-f12ceceab5bb?w=400&h=300&fit=crop',
  'Brot': 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=300&fit=crop',
  'Kühlschrank': 'https://images.unsplash.com/photo-1571175444372-f625f2621def?w=400&h=300&fit=crop',
  'Fahrrad': 'https://images.unsplash.com/photo-1544191696-15693072e2f4?w=400&h=300&fit=crop',
  'Gewitter': 'https://images.unsplash.com/photo-1601297183622-95bb4d83d83d?w=400&h=300&fit=crop',
  'Hammer': 'https://images.unsplash.com/photo-1609205418106-b5a7c7db8e5a?w=400&h=300&fit=crop',
  'Blume': 'https://images.unsplash.com/photo-1470137430626-983da4ac2cd1?w=400&h=300&fit=crop'
};


async function quickUpdateImages() {
  try {
    console.log('🚀 Starting quick image update...');
    
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');
    
    // Find imagebased exercises without images
    const exercises = await Exercise.find({
      category: 'imagebased',
      $or: [
        { 'image.url': { $exists: false } },
        { 'image.url': null },
        { 'image.url': '' }
      ]
    });
    
    console.log(`📊 Found ${exercises.length} exercises needing images`);
    
    let updated = 0;
    
    for (const exercise of exercises) {
      // Try to match answer first, then options
      let imageUrl = QUICK_IMAGES[exercise.answer];
      
      if (!imageUrl) {
        // Try options
        for (const option of exercise.options) {
          if (QUICK_IMAGES[option]) {
            imageUrl = QUICK_IMAGES[option];
            break;
          }
        }
      }
      
      // Use placeholder if no match
      if (!imageUrl) {
        imageUrl = `https://via.placeholder.com/400x300/e3f2fd/1976d2?text=${encodeURIComponent(exercise.answer)}`;
      }
      
      // Update exercise
      exercise.image = {
        url: imageUrl,
        alt: exercise.answer,
        caption: `Image showing ${exercise.answer}`,
        source: QUICK_IMAGES[exercise.answer] ? 'unsplash' : 'placeholder'
      };
      
      await exercise.save();
      updated++;
      
      console.log(`✅ ${updated}/${exercises.length} - Updated: ${exercise.question}`);
    }
    
    console.log(`🎉 Successfully updated ${updated} exercises!`);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Connection closed');
  }
}

// Çalıştır
quickUpdateImages();