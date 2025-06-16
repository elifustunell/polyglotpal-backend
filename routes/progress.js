// routes/progress.js - Enhanced routes for unified exercise system

const express = require('express');
const router = express.Router();
const Exercise = require('../models/Exercise');
const UserProgress = require('../models/UserProgress');
const { authenticateUser } = require('../middleware/auth');

// Apply authentication middleware to all routes
router.use(authenticateUser);

// GET /api/progress/:language/:category/:level/exercises
// Get exercises for a specific language, category, and level
router.get('/:language/:category/:level/exercises', async (req, res) => {
  try {
    const { language, category, level } = req.params;
    
    // Validate parameters
    const validLanguages = ['English', 'German', 'French', 'Spanish'];
    const validCategories = ['filltheblanks', 'vocabulary', 'grammar', 'sentences', 'imagebased'];
    
    if (!validLanguages.includes(language)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid language'
      });
    }
    
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid category'
      });
    }
    
    const levelNum = parseInt(level);
    if (isNaN(levelNum) || levelNum < 1 || levelNum > 10) {
      return res.status(400).json({
        success: false,
        error: 'Invalid level'
      });
    }
    
    // Get exercises using static method
    const exercises = await Exercise.getExercises(language, category, levelNum);
    
    if (!exercises || exercises.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'No exercises found for this level'
      });
    }
    
    console.log(`📚 Retrieved ${exercises.length} ${category} exercises for ${language} Level ${level}`);
    
    res.json({
      success: true,
      exercises,
      count: exercises.length,
      language,
      category,
      level: levelNum
    });
    
  } catch (error) {
    console.error('❌ Error fetching exercises:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch exercises'
    });
  }
});

// POST /api/progress/:language/:category/:level/submit
// Submit answer for an exercise
router.post('/:language/:category/:level/submit', async (req, res) => {
  try {
    const { language, category, level } = req.params;
    const { exerciseId, userAnswer } = req.body;
    const userId = req.user.uid;
    
    if (!exerciseId || userAnswer === undefined || userAnswer === null) {
      return res.status(400).json({
        success: false,
        error: 'Exercise ID and user answer are required'
      });
    }
    
    // Find the exercise
    const exercise = await Exercise.findById(exerciseId);
    if (!exercise) {
      return res.status(404).json({
        success: false,
        error: 'Exercise not found'
      });
    }
    
    // Validate answer using the exercise's method
    const isCorrect = exercise.validateAnswer(userAnswer);
    const correctAnswer = exercise.getCorrectAnswer();
    
    // Calculate points earned
    const pointsEarned = isCorrect ? exercise.points : 0;
    
    // Find or create user progress
    let userProgress = await UserProgress.findOne({
      userId,
      language,
      category,
      level: parseInt(level)
    });
    
    if (!userProgress) {
      userProgress = new UserProgress({
        userId,
        language,
        category,
        level: parseInt(level),
        totalScore: 0,
        exercisesCompleted: [],
        isCompleted: false
      });
    }
    
    // Update progress
    const exerciseProgress = {
      exerciseId,
      completed: true,
      isCorrect,
      pointsEarned,
      userAnswer,
      correctAnswer,
      completedAt: new Date()
    };
    
    // Check if exercise was already completed
    const existingIndex = userProgress.exercisesCompleted.findIndex(
      ex => ex.exerciseId.toString() === exerciseId
    );
    
    if (existingIndex >= 0) {
      // Update existing exercise progress
      const previousPoints = userProgress.exercisesCompleted[existingIndex].pointsEarned || 0;
      userProgress.exercisesCompleted[existingIndex] = exerciseProgress;
      userProgress.totalScore = userProgress.totalScore - previousPoints + pointsEarned;
    } else {
      // Add new exercise progress
      userProgress.exercisesCompleted.push(exerciseProgress);
      userProgress.totalScore += pointsEarned;
    }
    
    userProgress.lastActivity = new Date();
    await userProgress.save();
    
    console.log(`📝 Answer submitted: ${isCorrect ? 'Correct' : 'Incorrect'} (+${pointsEarned} points)`);
    
    // Prepare response
    const result = {
      isCorrect,
      correctAnswer,
      explanation: exercise.explanation,
      pointsEarned,
      totalScore: userProgress.totalScore,
      levelCompleted: false,
      nextLevelUnlocked: false,
      unlockedLevels: [],
      currentLevel: parseInt(level),
      exercisesCompletedInLevel: userProgress.exercisesCompleted.length,
      totalExercisesInLevel: await Exercise.countDocuments({
        language,
        category,
        level: parseInt(level),
        isActive: true
      })
    };
    
    res.json({
      success: true,
      result
    });
    
  } catch (error) {
    console.error('❌ Error submitting answer:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit answer'
    });
  }
});

// POST /api/progress/:language/:category/:level/complete
// Complete a level (requires 60% success rate)
router.post('/:language/:category/:level/complete', async (req, res) => {
  try {
    const { language, category, level } = req.params;
    const { percentage, correctAnswers, totalQuestions } = req.body;
    const userId = req.user.uid;
    
    if (!percentage || !correctAnswers || !totalQuestions) {
      return res.status(400).json({
        success: false,
        error: 'Percentage, correct answers, and total questions are required'
      });
    }
    
    // Verify 60% threshold
    const requiredPercentage = 60;
    if (percentage < requiredPercentage) {
      return res.status(400).json({
        success: false,
        error: `You need at least ${requiredPercentage}% to complete this level. You scored ${percentage}%.`
      });
    }
    
    // Find user progress
    let userProgress = await UserProgress.findOne({
      userId,
      language,
      category,
      level: parseInt(level)
    });
    
    if (!userProgress) {
      return res.status(404).json({
        success: false,
        error: 'No progress found for this level'
      });
    }
    
    // Mark level as completed
    userProgress.isCompleted = true;
    userProgress.completedAt = new Date();
    userProgress.finalScore = correctAnswers;
    userProgress.finalPercentage = percentage;
    userProgress.lastActivity = new Date();
    
    await userProgress.save();
    
    // Check if next level should be unlocked
    const nextLevel = parseInt(level) + 1;
    const hasNextLevel = await Exercise.exists({
      language,
      category,
      level: nextLevel,
      isActive: true
    });
    
    let nextLevelUnlocked = false;
    if (hasNextLevel) {
      // Check if next level progress exists
      const nextLevelProgress = await UserProgress.findOne({
        userId,
        language,
        category,
        level: nextLevel
      });
      
      if (!nextLevelProgress) {
        // Create next level progress (unlocked but not started)
        const newProgress = new UserProgress({
          userId,
          language,
          category,
          level: nextLevel,
          totalScore: 0,
          exercisesCompleted: [],
          isCompleted: false,
          isUnlocked: true
        });
        await newProgress.save();
        nextLevelUnlocked = true;
        console.log(`🔓 Level ${nextLevel} unlocked for ${language}/${category}`);
      }
    }
    
    // Get all unlocked levels for this category
    const allProgress = await UserProgress.find({
      userId,
      language,
      category
    }).sort({ level: 1 });
    
    const unlockedLevels = allProgress
      .filter(p => p.isUnlocked || p.isCompleted)
      .map(p => p.level);
    
    console.log(`🎉 Level ${level} completed with ${percentage}% (${correctAnswers}/${totalQuestions})`);
    
    res.json({
      success: true,
      message: `Level ${level} completed successfully!`,
      levelCompleted: true,
      nextLevelUnlocked,
      unlockedLevels,
      finalScore: correctAnswers,
      finalPercentage: percentage,
      totalScore: userProgress.totalScore
    });
    
  } catch (error) {
    console.error('❌ Error completing level:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to complete level'
    });
  }
});

// GET /api/progress/:language
// Get user's progress for a specific language
router.get('/:language', async (req, res) => {
  try {
    const { language } = req.params;
    const userId = req.user.uid;
    
    // Get all progress for this language
    const progress = await UserProgress.find({
      userId,
      language
    }).sort({ category: 1, level: 1 });
    
    // Group by category
    const groupedProgress = {};
    progress.forEach(p => {
      if (!groupedProgress[p.category]) {
        groupedProgress[p.category] = [];
      }
      groupedProgress[p.category].push({
        level: p.level,
        totalScore: p.totalScore,
        exercisesCompleted: p.exercisesCompleted.length,
        isCompleted: p.isCompleted,
        isUnlocked: p.isUnlocked || p.level === 1, // Level 1 is always unlocked
        finalPercentage: p.finalPercentage,
        lastActivity: p.lastActivity
      });
    });
    
    // Get exercise statistics
    const stats = await Exercise.getStats(language);
    
    res.json({
      success: true,
      language,
      progress: groupedProgress,
      statistics: stats
    });
    
  } catch (error) {
    console.error('❌ Error fetching progress:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch progress'
    });
  }
});

// GET /api/progress/:language/:category
// Get user's progress for a specific language and category
router.get('/:language/:category', async (req, res) => {
  try {
    const { language, category } = req.params;
    const userId = req.user.uid;
    
    // Get progress for this category
    const progress = await UserProgress.find({
      userId,
      language,
      category
    }).sort({ level: 1 });
    
    // Get available levels from exercises
    const availableLevels = await Exercise.distinct('level', {
      language,
      category,
      isActive: true
    });
    
    // Create complete level information
    const levels = availableLevels.sort((a, b) => a - b).map(level => {
      const userProgress = progress.find(p => p.level === level);
      
      return {
        level,
        totalScore: userProgress?.totalScore || 0,
        exercisesCompleted: userProgress?.exercisesCompleted.length || 0,
        isCompleted: userProgress?.isCompleted || false,
        isUnlocked: userProgress?.isUnlocked || level === 1, // Level 1 is always unlocked
        finalPercentage: userProgress?.finalPercentage || 0,
        lastActivity: userProgress?.lastActivity,
        totalExercises: await Exercise.countDocuments({
          language,
          category,
          level,
          isActive: true
        })
      };
    });
    
    res.json({
      success: true,
      language,
      category,
      levels
    });
    
  } catch (error) {
    console.error('❌ Error fetching category progress:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch category progress'
    });
  }
});

// GET /api/progress/stats/overview
// Get overview statistics for the user
router.get('/stats/overview', async (req, res) => {
  try {
    const userId = req.user.uid;
    
    // Get all user progress
    const allProgress = await UserProgress.find({ userId });
    
    // Calculate overview statistics
    const stats = {
      totalScore: 0,
      levelsCompleted: 0,
      exercisesCompleted: 0,
      languagesStudied: new Set(),
      categoriesStudied: new Set(),
      averagePercentage: 0,
      recentActivity: null
    };
    
    let totalPercentages = 0;
    let completedLevels = 0;
    
    allProgress.forEach(progress => {
      stats.totalScore += progress.totalScore;
      stats.exercisesCompleted += progress.exercisesCompleted.length;
      stats.languagesStudied.add(progress.language);
      stats.categoriesStudied.add(progress.category);
      
      if (progress.isCompleted) {
        stats.levelsCompleted++;
        if (progress.finalPercentage) {
          totalPercentages += progress.finalPercentage;
          completedLevels++;
        }
      }
      
      if (!stats.recentActivity || progress.lastActivity > stats.recentActivity) {
        stats.recentActivity = progress.lastActivity;
      }
    });
    
    // Calculate average percentage
    stats.averagePercentage = completedLevels > 0 ? 
      Math.round(totalPercentages / completedLevels) : 0;
    
    // Convert sets to arrays
    stats.languagesStudied = Array.from(stats.languagesStudied);
    stats.categoriesStudied = Array.from(stats.categoriesStudied);
    
    res.json({
      success: true,
      stats
    });
    
  } catch (error) {
    console.error('❌ Error fetching overview stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch overview statistics'
    });
  }
});

module.exports = router;