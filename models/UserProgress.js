// models/UserProgress.js - Düzeltilmiş index yapısı

const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  currentLevel: {
    type: Number,
    default: 1
  },
  unlockedLevels: [{
    type: Number
  }],
  completedLevels: [{
    level: Number,
    score: Number,
    completedAt: {
      type: Date,
      default: Date.now
    },
    totalExercises: Number,
    correctAnswers: Number
  }],
  totalScore: {
    type: Number,
    default: 0
  },
  completedExercises: [{
    exerciseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise'
    },
    userAnswer: String,
    isCorrect: Boolean,
    pointsEarned: Number,
    completedAt: {
      type: Date,
      default: Date.now
    }
  }],
  lastActivity: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// DOĞRU INDEX: userId + language + category kombinasyonu unique olmalı
userProgressSchema.index({ userId: 1, language: 1, category: 1 }, { unique: true });

// Arama için additional index
userProgressSchema.index({ userId: 1 });
userProgressSchema.index({ lastActivity: 1 });

// Methods
userProgressSchema.methods.unlockNextLevel = function() {
  const nextLevel = this.currentLevel + 1;
  if (nextLevel <= 10 && !this.unlockedLevels.includes(nextLevel)) {
    this.unlockedLevels.push(nextLevel);
  }
};

userProgressSchema.methods.completeLevel = function(level, score, totalExercises, correctAnswers) {
  // Remove if already completed
  this.completedLevels = this.completedLevels.filter(cl => cl.level !== level);
  
  // Add new completion
  this.completedLevels.push({
    level,
    score,
    totalExercises,
    correctAnswers,
    completedAt: new Date()
  });
  
  // Update current level
  if (level >= this.currentLevel) {
    this.currentLevel = level + 1;
    this.unlockNextLevel();
  }
  
  this.lastActivity = new Date();
};

userProgressSchema.methods.addExerciseCompletion = function(exerciseId, userAnswer, isCorrect, pointsEarned) {
  // Remove if already completed (allow retries)
  this.completedExercises = this.completedExercises.filter(
    ce => ce.exerciseId.toString() !== exerciseId.toString()
  );
  
  // Add new completion
  this.completedExercises.push({
    exerciseId,
    userAnswer,
    isCorrect,
    pointsEarned,
    completedAt: new Date()
  });
  
  // Update total score
  this.totalScore += pointsEarned;
  this.lastActivity = new Date();
};

// Static methods
userProgressSchema.statics.findOrCreateProgress = async function(userId, email, language, category) {
  try {
    let progress = await this.findOne({ userId, language, category });
    
    if (!progress) {
      progress = new this({
        userId,
        email,
        language,
        category,
        currentLevel: 1,
        unlockedLevels: [1], // Start with level 1 unlocked
        completedLevels: [],
        totalScore: 0,
        completedExercises: []
      });
      
      await progress.save();
      console.log(`✅ Created new progress for ${email}: ${language}/${category}`);
    } else {
      console.log(`📋 Found existing progress for ${email}: ${language}/${category}`);
    }
    
    return progress;
  } catch (error) {
    console.error(`❌ Error in findOrCreateProgress:`, error);
    throw error;
  }
};

module.exports = mongoose.model('UserProgress', userProgressSchema);