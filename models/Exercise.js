// models/Exercise.js - Enhanced Exercise Model

const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
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
  question: {
    type: String,
    required: true,
    trim: true
  },
  // models/Exercise.js dosyanızda question field'dan sonra şunu ekleyin:

// 🆕 IMAGE FIELD EKLE
image: {
  url: {
    type: String,
    trim: true
  },
  alt: {
    type: String,
    trim: true
  },
  caption: {
    type: String,
    trim: true
  },
  source: {
    type: String,
    enum: ['unsplash', 'pixabay', 'local', 'placeholder'],
    default: 'unsplash'
  }
},
  options: [{
    type: String,
    required: true,
    trim: true
  }],
  answer: {
    type: String,
    required: true,
    trim: true
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

// Compound indexes for efficient querying
exerciseSchema.index({ language: 1, category: 1, level: 1 });
exerciseSchema.index({ language: 1, category: 1, level: 1, order: 1 });
exerciseSchema.index({ difficulty: 1, level: 1 });
exerciseSchema.index({ isActive: 1 });

// Pre-save middleware to update timestamp
exerciseSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Instance methods
exerciseSchema.methods.isCorrectAnswer = function(userAnswer) {
  return this.answer.toLowerCase().trim() === userAnswer.toLowerCase().trim();
};

exerciseSchema.methods.getPublicFields = function() {
  return {
    _id: this._id,
    question: this.question,
    options: this.options,
    points: this.points,
    order: this.order,
    difficulty: this.difficulty,
    explanation: this.explanation,
    tags: this.tags
    // Note: 'answer' field is excluded for security
  };
};

// Static methods
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

// Virtual for formatted difficulty
exerciseSchema.virtual('formattedDifficulty').get(function() {
  return this.difficulty.charAt(0).toUpperCase() + this.difficulty.slice(1);
});

// Ensure virtual fields are included in JSON output
exerciseSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Exercise', exerciseSchema);