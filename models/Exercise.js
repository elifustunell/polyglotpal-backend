// models/Exercise.js - Enhanced Exercise Model with Multi-Format Support
const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  // Core fields - required for all exercise types
  language: {
    type: String,
    required: true,
    enum: ['English', 'Spanish', 'Turkish', 'German'],
    index: true
  },
  category: {
    type: String,
    required: true,
    enum: ['filltheblanks', 'vocabulary', 'grammar', 'sentences', 'imagebased'],
    index: true
  },
  level: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
    index: true
  },
  order: {
    type: Number,
    required: true,
    default: 1,
    min: 1
  },
  points: {
    type: Number,
    default: 10,
    min: 1,
    max: 100
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'easy'
  },
  explanation: {
    type: String,
    trim: true
  },

  // ============================================
  // VOCABULARY SPECIFIC FIELDS (Matching Format)
  // ============================================
  sourceWord: {
    type: String,
    trim: true,
    // Required only for vocabulary exercises
    required: function() {
      return this.category === 'vocabulary';
    }
  },
  targetWord: {
    type: String,
    trim: true,
    // Required only for vocabulary exercises
    required: function() {
      return this.category === 'vocabulary';
    }
  },

  // ============================================
  // GRAMMAR & IMAGEBASED SPECIFIC FIELDS (Multiple Choice)
  // ============================================
  question: {
    type: String,
    trim: true,
    // Required for grammar, imagebased, but not vocabulary or sentences
    required: function() {
      return ['grammar', 'imagebased'].includes(this.category);
    }
  },
  options: [{
    type: String,
    trim: true
  }],
  correctAnswer: {
    type: String,
    trim: true,
    // Required for grammar, imagebased
    required: function() {
      return ['grammar', 'imagebased'].includes(this.category);
    }
  },
  
  // Grammar specific
  grammarRule: {
    type: String,
    trim: true
  },
  
  // Image support for grammar and imagebased
  imageUrl: {
    type: String,
    trim: true
  },

  // ============================================
  // FILL THE BLANKS SPECIFIC FIELDS (Dialogue Format)
  // ============================================
  dialogue: [{
    speaker: {
      type: String,
      enum: ['A', 'B'],
      required: function() {
        return this.parent().category === 'filltheblanks';
      }
    },
    text: {
      type: String,
      trim: true,
      required: function() {
        return this.parent().category === 'filltheblanks';
      }
    },
    blank: {
      type: Boolean,
      default: false
    },
    options: [{
      type: String,
      trim: true
    }],
    correct: {
      type: String,
      trim: true
    }
  }],

  // ============================================
  // SENTENCES SPECIFIC FIELDS (Word Building)
  // ============================================
  targetSentence: {
    type: String,
    trim: true,
    // Required only for sentences exercises
    required: function() {
      return this.category === 'sentences';
    }
  },
  hint: {
    type: String,
    trim: true
  },
  words: [{
    type: String,
    trim: true
  }],

  // ============================================
  // LEGACY FIELDS (For backward compatibility)
  // ============================================
  answer: {
    type: String,
    trim: true,
    // Keep for backward compatibility but not required
  },

  // ============================================
  // METADATA FIELDS
  // ============================================
  tags: [{
    type: String,
    trim: true
  }],
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

// ============================================
// COMPOUND INDEXES
// ============================================
exerciseSchema.index({ language: 1, category: 1, level: 1 });
exerciseSchema.index({ language: 1, category: 1, level: 1, order: 1 });
exerciseSchema.index({ difficulty: 1, level: 1 });
exerciseSchema.index({ isActive: 1 });
exerciseSchema.index({ category: 1, language: 1 });

// ============================================
// PRE-SAVE MIDDLEWARE
// ============================================
exerciseSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Validation middleware for format-specific requirements
exerciseSchema.pre('validate', function(next) {
  // Vocabulary format validation
  if (this.category === 'vocabulary') {
    if (!this.sourceWord || !this.targetWord) {
      return next(new Error('Vocabulary exercises require sourceWord and targetWord'));
    }
  }

  // Grammar/ImageBased format validation
  if (['grammar', 'imagebased'].includes(this.category)) {
    if (!this.question || !this.options || this.options.length < 2 || !this.correctAnswer) {
      return next(new Error(`${this.category} exercises require question, options, and correctAnswer`));
    }
    if (!this.options.includes(this.correctAnswer)) {
      return next(new Error('correctAnswer must be one of the provided options'));
    }
  }

  // Fill the blanks format validation
  if (this.category === 'filltheblanks') {
    if (!this.dialogue || this.dialogue.length === 0) {
      return next(new Error('Fill the blanks exercises require dialogue array'));
    }
    const hasBlank = this.dialogue.some(line => line.blank === true);
    if (!hasBlank) {
      return next(new Error('Fill the blanks exercises must have at least one blank field'));
    }
  }

  // Sentences format validation
  if (this.category === 'sentences') {
    if (!this.targetSentence || !this.words || this.words.length === 0) {
      return next(new Error('Sentences exercises require targetSentence and words array'));
    }
  }

  next();
});

// ============================================
// INSTANCE METHODS
// ============================================

// Check correct answer based on exercise type
exerciseSchema.methods.isCorrectAnswer = function(userAnswer) {
  switch (this.category) {
    case 'vocabulary':
      // For vocabulary, userAnswer should be a mapping object
      try {
        const matches = JSON.parse(userAnswer);
        return Object.keys(matches).every(sourceId => matches[sourceId] === sourceId);
      } catch {
        return false;
      }
      
    case 'grammar':
    case 'imagebased':
      return this.correctAnswer?.toLowerCase().trim() === userAnswer?.toLowerCase().trim();
      
    case 'filltheblanks':
      const blankLine = this.dialogue.find(line => line.blank);
      return blankLine?.correct?.toLowerCase().trim() === userAnswer?.toLowerCase().trim();
      
    case 'sentences':
      return this.targetSentence?.toLowerCase().trim() === userAnswer?.toLowerCase().trim();
      
    default:
      // Fallback to legacy answer field
      return this.answer?.toLowerCase().trim() === userAnswer?.toLowerCase().trim();
  }
};

// Get public fields excluding sensitive data
exerciseSchema.methods.getPublicFields = function() {
  const baseFields = {
    _id: this._id,
    language: this.language,
    category: this.category,
    level: this.level,
    order: this.order,
    points: this.points,
    difficulty: this.difficulty,
    explanation: this.explanation,
    tags: this.tags
  };

  // Add category-specific fields
  switch (this.category) {
    case 'vocabulary':
      return {
        ...baseFields,
        sourceWord: this.sourceWord,
        targetWord: this.targetWord
        // Note: Don't expose the mapping directly
      };
      
    case 'grammar':
    case 'imagebased':
      return {
        ...baseFields,
        question: this.question,
        options: this.options,
        grammarRule: this.grammarRule,
        imageUrl: this.imageUrl
        // Note: correctAnswer excluded for security
      };
      
    case 'filltheblanks':
      return {
        ...baseFields,
        dialogue: this.dialogue.map(line => ({
          speaker: line.speaker,
          text: line.text,
          blank: line.blank,
          options: line.options
          // Note: correct answer excluded for security
        }))
      };
      
    case 'sentences':
      return {
        ...baseFields,
        hint: this.hint,
        words: this.words
        // Note: targetSentence excluded for security
      };
      
    default:
      return {
        ...baseFields,
        question: this.question,
        options: this.options
        // Legacy support
      };
  }
};

// Get the correct answer (for backend use only)
exerciseSchema.methods.getCorrectAnswer = function() {
  switch (this.category) {
    case 'vocabulary':
      // Return mapping structure
      const mapping = {};
      mapping[this._id] = this._id; // Self-mapping for vocabulary
      return mapping;
      
    case 'grammar':
    case 'imagebased':
      return this.correctAnswer;
      
    case 'filltheblanks':
      const blankLine = this.dialogue.find(line => line.blank);
      return blankLine?.correct;
      
    case 'sentences':
      return this.targetSentence;
      
    default:
      return this.answer; // Legacy fallback
  }
};

// ============================================
// STATIC METHODS
// ============================================

exerciseSchema.statics.findByLevel = function(language, category, level) {
  return this.find({
    language,
    category,
    level: parseInt(level),
    isActive: true
  }).sort({ order: 1, _id: 1 });
};

exerciseSchema.statics.getAvailableLevels = function(language, category) {
  return this.distinct('level', {
    language,
    category,
    isActive: true
  }).then(levels => levels.sort((a, b) => a - b));
};

exerciseSchema.statics.getStatsByCategory = function(language, category) {
  return this.aggregate([
    { $match: { language, category, isActive: true } },
    {
      $group: {
        _id: '$level',
        count: { $sum: 1 },
        totalPoints: { $sum: '$points' },
        difficulties: { $addToSet: '$difficulty' }
      }
    },
    { $sort: { _id: 1 } }
  ]);
};

// Get exercises formatted for frontend by category
exerciseSchema.statics.getFormattedExercises = function(language, category, level) {
  return this.findByLevel(language, category, level).then(exercises => {
    switch (category) {
      case 'vocabulary':
        // Return pairs for matching
        return exercises.map(ex => ex.getPublicFields());
        
      case 'grammar':
      case 'imagebased':
        // Return questions with options
        return exercises.map(ex => ex.getPublicFields());
        
      case 'filltheblanks':
        // Return dialogue structures
        return exercises.map(ex => ex.getPublicFields());
        
      case 'sentences':
        // Return word building data
        return exercises.map(ex => ex.getPublicFields());
        
      default:
        return exercises.map(ex => ex.getPublicFields());
    }
  });
};

// Validate exercise format
exerciseSchema.statics.validateFormat = function(exerciseData) {
  const { category } = exerciseData;
  
  switch (category) {
    case 'vocabulary':
      return !!(exerciseData.sourceWord && exerciseData.targetWord);
      
    case 'grammar':
    case 'imagebased':
      return !!(exerciseData.question && exerciseData.options && 
               exerciseData.correctAnswer && 
               exerciseData.options.includes(exerciseData.correctAnswer));
      
    case 'filltheblanks':
      return !!(exerciseData.dialogue && Array.isArray(exerciseData.dialogue) &&
               exerciseData.dialogue.some(line => line.blank === true));
      
    case 'sentences':
      return !!(exerciseData.targetSentence && exerciseData.words && 
               Array.isArray(exerciseData.words));
      
    default:
      return false;
  }
};

// ============================================
// VIRTUALS
// ============================================

// Virtual for formatted difficulty
exerciseSchema.virtual('formattedDifficulty').get(function() {
  return this.difficulty.charAt(0).toUpperCase() + this.difficulty.slice(1);
});

// Virtual for exercise format type
exerciseSchema.virtual('formatType').get(function() {
  switch (this.category) {
    case 'vocabulary': return 'matching';
    case 'grammar': return 'multiple-choice-image';
    case 'filltheblanks': return 'dialogue';
    case 'sentences': return 'word-building';
    case 'imagebased': return 'visual-choice';
    default: return 'unknown';
  }
});

// Virtual for completion requirements
exerciseSchema.virtual('requirements').get(function() {
  switch (this.category) {
    case 'vocabulary':
      return { type: 'matching', description: 'Match all word pairs' };
    case 'grammar':
    case 'imagebased':
      return { type: 'choice', description: 'Select the correct answer' };
    case 'filltheblanks':
      return { type: 'fill', description: 'Fill in the blank' };
    case 'sentences':
      return { type: 'build', description: 'Build the correct sentence' };
    default:
      return { type: 'unknown', description: 'Complete the exercise' };
  }
});

// ============================================
// JSON TRANSFORM
// ============================================

// Ensure virtual fields are included in JSON output
exerciseSchema.set('toJSON', { 
  virtuals: true,
  transform: function(doc, ret) {
    // Remove sensitive fields from JSON output
    delete ret.answer; // Legacy field
    delete ret.correctAnswer; // For security
    delete ret.__v;
    
    // Remove correct answers from dialogue
    if (ret.dialogue) {
      ret.dialogue = ret.dialogue.map(line => {
        const safeLine = { ...line };
        delete safeLine.correct;
        return safeLine;
      });
    }
    
    // Remove target sentence for security
    if (ret.category === 'sentences') {
      delete ret.targetSentence;
    }
    
    return ret;
  }
});

// ============================================
// EXPORT
// ============================================

module.exports = mongoose.model('Exercise', exerciseSchema);