// models/UserProgress.js - WITH 60% RULE ENFORCEMENT

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
    correctAnswers: Number,
    percentage: Number // Add percentage field
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

// Index for unique user-language-category combination
userProgressSchema.index({ userId: 1, language: 1, category: 1 }, { unique: true });
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
  const percentage = Math.round((correctAnswers / totalExercises) * 100);
  const PASS_THRESHOLD = 60;
  
  // ENFORCE 60% RULE
  if (percentage < PASS_THRESHOLD) {
    console.log(`❌ Level completion blocked: ${percentage}% < ${PASS_THRESHOLD}%`);
    throw new Error(`You need at least ${PASS_THRESHOLD}% to complete this level. You scored ${percentage}%.`);
  }
  
  // Remove if already completed
  this.completedLevels = this.completedLevels.filter(cl => cl.level !== level);
  
  // Add new completion with percentage
  this.completedLevels.push({
    level,
    score,
    totalExercises,
    correctAnswers,
    percentage,
    completedAt: new Date()
  });
  
  // Update current level only if passed
  if (level >= this.currentLevel) {
    this.currentLevel = level + 1;
    this.unlockNextLevel();
  }
  
  this.lastActivity = new Date();
  console.log(`✅ Level ${level} completed with ${percentage}% (${correctAnswers}/${totalExercises})`);
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

// Check if level can be unlocked (60% rule)
userProgressSchema.methods.canUnlockLevel = function(level) {
  if (level === 1) return true;
  
  const previousLevel = level - 1;
  const completedLevel = this.completedLevels.find(cl => cl.level === previousLevel);
  
  if (!completedLevel) return false;
  
  return completedLevel.percentage >= 60;
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