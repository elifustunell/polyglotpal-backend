// models/UserProgress.js - Enhanced model for unified exercise system

const mongoose = require('mongoose');

// Schema for individual exercise completion
const ExerciseCompletionSchema = new mongoose.Schema({
  exerciseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise',
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  isCorrect: {
    type: Boolean,
    required: true
  },
  pointsEarned: {
    type: Number,
    default: 0
  },
  userAnswer: {
    type: mongoose.Schema.Types.Mixed, // Can be string, object, or array depending on exercise type
    required: true
  },
  correctAnswer: {
    type: String,
    required: true
  },
  completedAt: {
    type: Date,
    default: Date.now
  },
  timeSpent: {
    type: Number, // in seconds
    default: 0
  }
}, { _id: false });

const UserProgressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  language: {
    type: String,
    required: true,
    enum: ['English', 'German', 'French', 'Spanish']
  },
  category: {
    type: String,
    required: true,
    enum: ['filltheblanks', 'vocabulary', 'grammar', 'sentences', 'imagebased']
  },
  level: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  
  // Progress tracking
  totalScore: {
    type: Number,
    default: 0
  },
  exercisesCompleted: [ExerciseCompletionSchema],
  
  // Level completion status
  isCompleted: {
    type: Boolean,
    default: false
  },
  isUnlocked: {
    type: Boolean,
    default: function() {
      return this.level === 1; // Level 1 is always unlocked
    }
  },
  
  // Completion details
  finalScore: {
    type: Number // Number of correct answers when level was completed
  },
  finalPercentage: {
    type: Number // Percentage score when level was completed
  },
  completedAt: {
    type: Date
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastActivity: {
    type: Date,
    default: Date.now
  },
  
  // Additional tracking
  attemptCount: {
    type: Number,
    default: 1
  },
  bestScore: {
    type: Number,
    default: 0
  },
  bestPercentage: {
    type: Number,
    default: 0
  }
});

// Indexes for better performance
UserProgressSchema.index({ userId: 1, language: 1, category: 1, level: 1 }, { unique: true });
UserProgressSchema.index({ userId: 1, language: 1, category: 1 });
UserProgressSchema.index({ userId: 1, language: 1 });
UserProgressSchema.index({ userId: 1 });
UserProgressSchema.index({ lastActivity: -1 });

// Virtual for completion percentage
UserProgressSchema.virtual('completionPercentage').get(function() {
  if (!this.exercisesCompleted || this.exercisesCompleted.length === 0) {
    return 0;
  }
  
  const correctAnswers = this.exercisesCompleted.filter(ex => ex.isCorrect).length;
  return Math.round((correctAnswers / this.exercisesCompleted.length) * 100);
});

// Virtual for total exercises attempted
UserProgressSchema.virtual('totalExercisesAttempted').get(function() {
  return this.exercisesCompleted ? this.exercisesCompleted.length : 0;
});

// Virtual for correct answers count
UserProgressSchema.virtual('correctAnswersCount').get(function() {
  return this.exercisesCompleted ? 
    this.exercisesCompleted.filter(ex => ex.isCorrect).length : 0;
});

// Virtual for total time spent
UserProgressSchema.virtual('totalTimeSpent').get(function() {
  return this.exercisesCompleted ? 
    this.exercisesCompleted.reduce((total, ex) => total + (ex.timeSpent || 0), 0) : 0;
});

// Instance method to check if level meets completion requirements
UserProgressSchema.methods.meetsCompletionRequirements = function(requiredPercentage = 60) {
  const percentage = this.completionPercentage;
  return percentage >= requiredPercentage;
};

// Instance method to add or update exercise completion
UserProgressSchema.methods.addExerciseCompletion = function(exerciseData) {
  const existingIndex = this.exercisesCompleted.findIndex(
    ex => ex.exerciseId.toString() === exerciseData.exerciseId.toString()
  );
  
  if (existingIndex >= 0) {
    // Update existing exercise
    const previousPoints = this.exercisesCompleted[existingIndex].pointsEarned || 0;
    this.exercisesCompleted[existingIndex] = exerciseData;
    this.totalScore = this.totalScore - previousPoints + exerciseData.pointsEarned;
  } else {
    // Add new exercise
    this.exercisesCompleted.push(exerciseData);
    this.totalScore += exerciseData.pointsEarned;
  }
  
  // Update best scores
  const currentPercentage = this.completionPercentage;
  if (this.totalScore > this.bestScore) {
    this.bestScore = this.totalScore;
  }
  if (currentPercentage > this.bestPercentage) {
    this.bestPercentage = currentPercentage;
  }
  
  this.lastActivity = new Date();
};

// Instance method to complete level
UserProgressSchema.methods.completeLevel = function(finalScore, finalPercentage) {
  this.isCompleted = true;
  this.finalScore = finalScore;
  this.finalPercentage = finalPercentage;
  this.completedAt = new Date();
  this.lastActivity = new Date();
  
  // Update best scores
  if (finalScore > this.bestScore) {
    this.bestScore = finalScore;
  }
  if (finalPercentage > this.bestPercentage) {
    this.bestPercentage = finalPercentage;
  }
};

// Static method to get user's overall progress
UserProgressSchema.statics.getUserOverallProgress = function(userId) {
  return this.aggregate([
    { $match: { userId } },
    {
      $group: {
        _id: {
          language: '$language',
          category: '$category'
        },
        levels: {
          $push: {
            level: '$level',
            totalScore: '$totalScore',
            isCompleted: '$isCompleted',
            exercisesCompleted: { $size: '$exercisesCompleted' },
            completionPercentage: {
              $cond: {
                if: { $gt: [{ $size: '$exercisesCompleted' }, 0] },
                then: {
                  $multiply: [
                    {
                      $divide: [
                        {
                          $size: {
                            $filter: {
                              input: '$exercisesCompleted',
                              cond: { $eq: ['$$this.isCorrect', true] }
                            }
                          }
                        },
                        { $size: '$exercisesCompleted' }
                      ]
                    },
                    100
                  ]
                },
                else: 0
              }
            },
            lastActivity: '$lastActivity'
          }
        },
        totalScore: { $sum: '$totalScore' },
        levelsCompleted: {
          $sum: { $cond: [{ $eq: ['$isCompleted', true] }, 1, 0] }
        }
      }
    },
    {
      $group: {
        _id: '$_id.language',
        categories: {
          $push: {
            category: '$_id.category',
            levels: '$levels',
            totalScore: '$totalScore',
            levelsCompleted: '$levelsCompleted'
          }
        },
        grandTotalScore: { $sum: '$totalScore' },
        grandLevelsCompleted: { $sum: '$levelsCompleted' }
      }
    },
    { $sort: { '_id': 1 } }
  ]);
};

// Static method to get leaderboard data
UserProgressSchema.statics.getLeaderboard = function(language = null, category = null, limit = 10) {
  const matchStage = { userId: { $exists: true } };
  if (language) matchStage.language = language;
  if (category) matchStage.category = category;
  
  return this.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: '$userId',
        totalScore: { $sum: '$totalScore' },
        levelsCompleted: {
          $sum: { $cond: [{ $eq: ['$isCompleted', true] }, 1, 0] }
        },
        exercisesCompleted: { $sum: { $size: '$exercisesCompleted' } },
        lastActivity: { $max: '$lastActivity' }
      }
    },
    { $sort: { totalScore: -1, levelsCompleted: -1 } },
    { $limit: limit }
  ]);
};

// Static method to get user statistics
UserProgressSchema.statics.getUserStats = function(userId) {
  return this.aggregate([
    { $match: { userId } },
    {
      $group: {
        _id: null,
        totalScore: { $sum: '$totalScore' },
        levelsCompleted: {
          $sum: { $cond: [{ $eq: ['$isCompleted', true] }, 1, 0] }
        },
        totalExercises: { $sum: { $size: '$exercisesCompleted' } },
        correctAnswers: {
          $sum: {
            $size: {
              $reduce: {
                input: '$exercisesCompleted',
                initialValue: [],
                in: {
                  $concatArrays: [
                    '$value',
                    {
                      $cond: [
                        { $eq: ['$this.isCorrect', true] },
                        ['$this'],
                        []
                      ]
                    }
                  ]
                }
              }
            }
          }
        },
        languages: { $addToSet: '$language' },
        categories: { $addToSet: '$category' },
        lastActivity: { $max: '$lastActivity' },
        firstActivity: { $min: '$createdAt' }
      }
    }
  ]);
};

// Pre-save middleware to update timestamps and validate
UserProgressSchema.pre('save', function(next) {
  this.lastActivity = new Date();
  
  // Ensure level 1 is always unlocked
  if (this.level === 1) {
    this.isUnlocked = true;
  }
  
  // Validate that completed levels have completion data
  if (this.isCompleted && (!this.finalScore || !this.finalPercentage)) {
    // Auto-calculate if missing
    this.finalScore = this.correctAnswersCount;
    this.finalPercentage = this.completionPercentage;
  }
  
  next();
});

// Pre-save validation
UserProgressSchema.pre('save', function(next) {
  // Validate that exercises completed belong to this level
  if (this.exercisesCompleted && this.exercisesCompleted.length > 0) {
    // This could be enhanced with actual exercise validation
    // For now, we trust the application logic
  }
  
  next();
});

// Post-save middleware for logging
UserProgressSchema.post('save', function(doc) {
  console.log(`📊 Progress updated: ${doc.userId} - ${doc.language}/${doc.category}/Level ${doc.level} - Score: ${doc.totalScore}`);
});

// Transform output to include virtual fields
UserProgressSchema.set('toJSON', { 
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.__v;
    return ret;
  }
});

UserProgressSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('UserProgress', UserProgressSchema);