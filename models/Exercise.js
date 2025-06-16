// models/Exercise.js - Enhanced model to support all exercise types

const mongoose = require('mongoose');

// Dialogue schema for fill-the-blanks exercises
const DialogueSchema = new mongoose.Schema({
  speaker: {
    type: String,
    required: true,
    enum: ['A', 'B']
  },
  text: {
    type: String,
    required: true
  },
  blank: {
    type: Boolean,
    default: false
  },
  options: [{
    type: String
  }],
  correct: {
    type: String
  }
}, { _id: false });

// Match pairs schema for vocabulary exercises
const MatchPairSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  target: {
    type: String,
    required: true
  }
}, { _id: false });

const ExerciseSchema = new mongoose.Schema({
  // Basic fields
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
  order: {
    type: Number,
    required: true,
    min: 1
  },
  question: {
    type: String,
    required: true
  },
  
  // Universal fields
  answer: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true,
    min: 0,
    default: 20
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['easy', 'medium', 'hard'],
    default: 'easy'
  },
  explanation: {
    type: String
  },

  // Category-specific fields
  
  // For multiple choice (grammar, imagebased, some filltheblanks)
  options: [{
    type: String
  }],
  
  // For fill-the-blanks exercises
  dialogue: [DialogueSchema],
  
  // For vocabulary exercises
  matchPairs: [MatchPairSchema],
  
  // For sentences exercises
  target: {
    type: String // The correct sentence to build
  },
  words: [{
    type: String // Array of words in correct order
  }],
  scrambled: [{
    type: String // Array of words in scrambled order
  }],
  hint: {
    type: String // Hint for sentence building
  },
  
  // For image-based exercises
  image: {
    type: String // URL or path to image
  },
  
  // Metadata
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

// Indexes for better performance
ExerciseSchema.index({ language: 1, category: 1, level: 1, order: 1 });
ExerciseSchema.index({ language: 1, category: 1, level: 1 });
ExerciseSchema.index({ isActive: 1 });

// Virtual for exercise type detection
ExerciseSchema.virtual('exerciseType').get(function() {
  if (this.dialogue && this.dialogue.length > 0) return 'filltheblanks';
  if (this.matchPairs && this.matchPairs.length > 0) return 'vocabulary';
  if (this.target && this.words && this.scrambled) return 'sentences';
  if (this.image) return 'imagebased';
  if (this.options && this.options.length > 0) return 'grammar';
  return 'unknown';
});

// Instance method to validate answer based on exercise type
ExerciseSchema.methods.validateAnswer = function(userAnswer) {
  switch (this.exerciseType) {
    case 'filltheblanks':
      // Find the blank dialogue line and check against correct answer
      const blankLine = this.dialogue.find(line => line.blank);
      return blankLine && blankLine.correct === userAnswer;
      
    case 'vocabulary':
      // Parse user's match selections and validate
      try {
        const selections = JSON.parse(userAnswer);
        const correctMatches = this.matchPairs.every(pair => 
          selections[pair.id] === pair.id
        );
        return correctMatches;
      } catch (error) {
        return false;
      }
      
    case 'sentences':
      // Check if user's sentence matches target
      return this.target && userAnswer.trim() === this.target.trim();
      
    case 'grammar':
    case 'imagebased':
    default:
      // Standard answer comparison
      return this.answer === userAnswer;
  }
};

// Instance method to get correct answer based on exercise type
ExerciseSchema.methods.getCorrectAnswer = function() {
  switch (this.exerciseType) {
    case 'filltheblanks':
      const blankLine = this.dialogue.find(line => line.blank);
      return blankLine ? blankLine.correct : this.answer;
      
    case 'vocabulary':
      return 'All pairs matched correctly';
      
    case 'sentences':
      return this.target || this.answer;
      
    case 'grammar':
    case 'imagebased':
    default:
      return this.answer;
  }
};

// Static method to get exercises by criteria
ExerciseSchema.statics.getExercises = function(language, category, level, options = {}) {
  const query = { 
    language, 
    category, 
    level, 
    isActive: true 
  };
  
  return this.find(query)
    .sort({ order: 1 })
    .limit(options.limit || 0)
    .lean(options.lean !== false);
};

// Static method to get exercise statistics
ExerciseSchema.statics.getStats = function(language = null) {
  const matchStage = language ? { $match: { language, isActive: true } } : { $match: { isActive: true } };
  
  return this.aggregate([
    matchStage,
    {
      $group: {
        _id: {
          language: '$language',
          category: '$category',
          level: '$level'
        },
        count: { $sum: 1 },
        totalPoints: { $sum: '$points' },
        difficulties: { $addToSet: '$difficulty' }
      }
    },
    {
      $group: {
        _id: {
          language: '$_id.language',
          category: '$_id.category'
        },
        levels: {
          $push: {
            level: '$_id.level',
            count: '$count',
            totalPoints: '$totalPoints',
            difficulties: '$difficulties'
          }
        },
        totalExercises: { $sum: '$count' },
        totalPoints: { $sum: '$totalPoints' }
      }
    },
    {
      $group: {
        _id: '$_id.language',
        categories: {
          $push: {
            category: '$_id.category',
            levels: '$levels',
            totalExercises: '$totalExercises',
            totalPoints: '$totalPoints'
          }
        },
        grandTotal: { $sum: '$totalExercises' },
        grandTotalPoints: { $sum: '$totalPoints' }
      }
    },
    {
      $sort: { '_id': 1 }
    }
  ]);
};

// Pre-save middleware to update timestamps
ExerciseSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Pre-save validation
ExerciseSchema.pre('save', function(next) {
  // Validate category-specific requirements
  switch (this.category) {
    case 'filltheblanks':
      if (!this.dialogue || this.dialogue.length === 0) {
        return next(new Error('Fill-the-blanks exercises must have dialogue'));
      }
      const hasBlank = this.dialogue.some(line => line.blank);
      if (!hasBlank) {
        return next(new Error('Fill-the-blanks exercises must have at least one blank'));
      }
      break;
      
    case 'vocabulary':
      if (!this.matchPairs || this.matchPairs.length === 0) {
        return next(new Error('Vocabulary exercises must have match pairs'));
      }
      break;
      
    case 'sentences':
      if (!this.target || !this.words || !this.scrambled) {
        return next(new Error('Sentence exercises must have target, words, and scrambled arrays'));
      }
      break;
      
    case 'imagebased':
      if (!this.image) {
        return next(new Error('Image-based exercises must have an image'));
      }
      // Fall through to check options
    case 'grammar':
      if (!this.options || this.options.length < 2) {
        return next(new Error('Grammar and image-based exercises must have at least 2 options'));
      }
      break;
  }
  
  next();
});

// Transform output to include virtual fields
ExerciseSchema.set('toJSON', { 
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.__v;
    return ret;
  }
});

ExerciseSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Exercise', ExerciseSchema);