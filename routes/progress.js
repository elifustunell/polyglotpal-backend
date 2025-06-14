// routes/progress.js - Route sıraları düzeltilmiş

const express = require('express');
const router = express.Router();
const Exercise = require('../models/Exercise');
const UserProgress = require('../models/UserProgress');
const authMiddleware = require('../middlewares/authMiddleware');

// Firebase doğrulama middleware'ini tüm /progress rotaları için uygula
router.use(authMiddleware);

// İsteğe özel logging devam edebilir
router.use((req, res, next) => {
  console.log(`📍 Progress API: ${req.method} ${req.originalUrl}`);
  console.log(`👤 Authenticated user: ${req.user.email} (${req.user.uid})`);
  next();
});

// ÖNEMLI: Spesifik route'lar önce gelmelidir!

// GET user statistics for a language
router.get('/:language/stats', async (req, res) => {
  try {
    const { language } = req.params;
    const userId = req.user?.uid;
    const userEmail = req.user?.email;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }
    
    console.log(`📊 Getting stats for: ${userEmail} - ${language}`);
    
    const allProgress = await UserProgress.find({ userId, language });
    
    const stats = {
      totalScore: allProgress.reduce((sum, p) => sum + p.totalScore, 0),
      completedLevels: allProgress.reduce((sum, p) => sum + p.completedLevels.length, 0),
      completedExercises: allProgress.reduce((sum, p) => sum + p.completedExercises.length, 0),
      categoriesStarted: allProgress.length,
      lastActivity: allProgress.length > 0 ? Math.max(...allProgress.map(p => new Date(p.lastActivity).getTime())) : Date.now()
    };
    
    console.log(`✅ User stats for ${userEmail}:`, stats);
    
    res.json({
      success: true,
      stats
    });
    
  } catch (error) {
    console.error('❌ Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch stats',
      error: error.message
    });
  }
});

// GET today's activity for a language
router.get('/:language/today', async (req, res) => {
  try {
    const { language } = req.params;
    const userId = req.user?.uid;
    const userEmail = req.user?.email;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }
    
    console.log(`📅 Getting today's activity for: ${userEmail} - ${language}`);
    
    // Get today's date range
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    
    console.log(`📅 Date range: ${startOfDay.toISOString()} to ${endOfDay.toISOString()}`);
    
    const allProgress = await UserProgress.find({ userId, language });
    console.log(`🔍 Found ${allProgress.length} progress records for ${userEmail} in ${language}`);
    
    let exercisesCompletedToday = 0;
    let pointsEarnedToday = 0;
    let levelsCompletedToday = 0;
    
    for (const progress of allProgress) {
      // Count exercises completed today
      const todayExercises = progress.completedExercises.filter(ce => 
        ce.completedAt >= startOfDay && ce.completedAt < endOfDay
      );
      exercisesCompletedToday += todayExercises.length;
      pointsEarnedToday += todayExercises.reduce((sum, ce) => sum + ce.pointsEarned, 0);
      
      console.log(`📝 ${progress.category}: ${todayExercises.length} exercises today`);
      
      // Count levels completed today
      const todayLevels = progress.completedLevels.filter(cl => 
        cl.completedAt >= startOfDay && cl.completedAt < endOfDay
      );
      levelsCompletedToday += todayLevels.length;
      
      console.log(`🏆 ${progress.category}: ${todayLevels.length} levels today`);
    }
    
    // Estimate time spent (2 minutes per exercise)
    const timeSpentToday = exercisesCompletedToday * 2;
    
    const activity = {
      exercisesCompleted: exercisesCompletedToday,
      pointsEarned: pointsEarnedToday,
      levelsCompleted: levelsCompletedToday,
      timeSpent: timeSpentToday
    };
    
    console.log(`✅ Today's activity for ${userEmail}:`, activity);
    
    res.json({
      success: true,
      activity
    });
    
  } catch (error) {
    console.error('❌ Error fetching today activity:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch today activity',
      error: error.message
    });
  }
});

// GET all categories for a language
router.get('/:language/categories', async (req, res) => {
  try {
    const { language } = req.params;
    const userEmail = req.user?.email;
    
    console.log(`📋 Getting categories for: ${userEmail} - ${language}`);
    
    const categories = await Exercise.distinct('category', { language });
    
    res.json({
      success: true,
      categories
    });
    
  } catch (error) {
    console.error('❌ Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories',
      error: error.message
    });
  }
});

// GET user progress for a category - Bu en sonda olmalı çünkü /:language/:category catch-all
router.get('/:language/:category', async (req, res) => {
  try {
    const { language, category } = req.params;
    const userId = req.user?.uid;
    const userEmail = req.user?.email;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }
    
    console.log(`📊 Getting progress for: ${userEmail} -> ${language}/${category}`);
    
    // Find or create user progress
    const progress = await UserProgress.findOrCreateProgress(userId, userEmail, language, category);
    
    console.log(`✅ Progress found:`, {
      currentLevel: progress.currentLevel,
      unlockedLevels: progress.unlockedLevels,
      totalScore: progress.totalScore,
      completedLevels: progress.completedLevels.length
    });
    
    const responseData = {
      currentLevel: progress.currentLevel,
      unlockedLevels: progress.unlockedLevels,
      totalScore: progress.totalScore,
      completedLevels: progress.completedLevels,
      completedExercises: progress.completedExercises.length
    };
    
    res.json({
      success: true,
      progress: responseData
    });
    
  } catch (error) {
    console.error('❌ Error fetching progress:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch progress',
      error: error.message
    });
  }
});

// GET exercises for a specific level
router.get('/:language/:category/:level/exercises', async (req, res) => {
  try {
    const { language, category, level } = req.params;
    const userId = req.user?.uid;
    
    console.log(`📚 Getting exercises for: ${language}/${category}/${level}`);
    
    // Check if user has access to this level
    if (userId) {
      const progress = await UserProgress.findOne({ 
        userId, 
        language, 
        category 
      });
      
      if (progress && !progress.unlockedLevels.includes(parseInt(level))) {
        return res.status(403).json({
          success: false,
          message: `Level ${level} is locked. Complete previous levels first.`
        });
      }
    }
    
    const exercises = await Exercise.find({
      language: language,
      category: category,
      level: parseInt(level)
    }).sort({ order: 1 });
    
    console.log(`🔍 Found ${exercises.length} exercises`);
    
    if (exercises.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No exercises found for ${language} ${category} level ${level}`
      });
    }
    
    // Don't send the correct answer to frontend
    const safeExercises = exercises.map(ex => ({
      _id: ex._id,
      question: ex.question,
      options: ex.options,
      points: ex.points,
      order: ex.order,
      difficulty: ex.difficulty,
      explanation: ex.explanation
    }));
    
    res.json({
      success: true,
      exercises: safeExercises
    });
    
  } catch (error) {
    console.error('❌ Error fetching exercises:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch exercises',
      error: error.message
    });
  }
});

// POST submit answer
router.post('/:language/:category/:level/submit', async (req, res) => {
  try {
    const { language, category, level } = req.params;
    const { exerciseId, userAnswer } = req.body;
    const userId = req.user?.uid;
    const userEmail = req.user?.email;
    
    console.log(`📝 Submitting answer: ${userEmail} -> Exercise ${exerciseId} -> ${userAnswer}`);
    
    if (!exerciseId || !userAnswer) {
      return res.status(400).json({
        success: false,
        message: 'Exercise ID and user answer are required'
      });
    }
    
    // Find the exercise
    const exercise = await Exercise.findById(exerciseId);
    if (!exercise) {
      return res.status(404).json({
        success: false,
        message: 'Exercise not found'
      });
    }
    
    // Check answer
    const isCorrect = exercise.answer === userAnswer;
    const pointsEarned = isCorrect ? exercise.points : 0;
    
    console.log(`${isCorrect ? '✅' : '❌'} Answer ${isCorrect ? 'correct' : 'incorrect'}: ${userAnswer} vs ${exercise.answer}`);
    
    // Update user progress
    let progress = await UserProgress.findOrCreateProgress(userId, userEmail, language, category);
    
    // Add exercise completion
    progress.addExerciseCompletion(exerciseId, userAnswer, isCorrect, pointsEarned);
    await progress.save();
    
    // Check if level should be completed
    const levelExercises = await Exercise.find({
      language,
      category,
      level: parseInt(level)
    });
    
    const completedExercisesInLevel = progress.completedExercises.filter(ce => {
      return levelExercises.some(le => le._id.toString() === ce.exerciseId.toString());
    });
    
    const levelCompleted = completedExercisesInLevel.length >= levelExercises.length;
    const correctAnswersInLevel = completedExercisesInLevel.filter(ce => ce.isCorrect).length;
    
    let nextLevelUnlocked = false;
    
    if (levelCompleted) {
      const levelScore = completedExercisesInLevel.reduce((sum, ce) => sum + ce.pointsEarned, 0);
      
      // Complete the level
      progress.completeLevel(parseInt(level), levelScore, levelExercises.length, correctAnswersInLevel);
      
      // Unlock next level if not already unlocked
      const nextLevel = parseInt(level) + 1;
      if (nextLevel <= 10 && !progress.unlockedLevels.includes(nextLevel)) {
        progress.unlockedLevels.push(nextLevel);
        nextLevelUnlocked = true;
      }
      
      await progress.save();
      console.log(`🎉 Level ${level} completed! Next level unlocked: ${nextLevelUnlocked}`);
    }
    
    const result = {
      isCorrect,
      correctAnswer: exercise.answer,
      explanation: exercise.explanation,
      pointsEarned,
      totalScore: progress.totalScore,
      levelCompleted,
      nextLevelUnlocked,
      unlockedLevels: progress.unlockedLevels,
      currentLevel: progress.currentLevel,
      exercisesCompletedInLevel: completedExercisesInLevel.length,
      totalExercisesInLevel: levelExercises.length
    };
    
    res.json({
      success: true,
      result
    });
    
  } catch (error) {
    console.error('❌ Error submitting answer:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit answer',
      error: error.message
    });
  }
});

// POST complete level
router.post('/:language/:category/:level/complete', async (req, res) => {
  try {
    const { language, category, level } = req.params;
    const userId = req.user?.uid;
    const userEmail = req.user?.email;
    
    console.log(`🎯 Completing level: ${userEmail} -> ${language}/${category}/${level}`);
    
    const progress = await UserProgress.findOne({ userId, language, category });
    
    if (!progress) {
      return res.status(404).json({
        success: false,
        message: 'User progress not found'
      });
    }
    
    // Check if level is already completed
    const alreadyCompleted = progress.completedLevels.some(cl => cl.level === parseInt(level));
    
    if (!alreadyCompleted) {
      // Get level exercises to calculate score
      const levelExercises = await Exercise.find({
        language,
        category,
        level: parseInt(level)
      });
      
      const completedExercisesInLevel = progress.completedExercises.filter(ce => {
        return levelExercises.some(le => le._id.toString() === ce.exerciseId.toString());
      });
      
      const levelScore = completedExercisesInLevel.reduce((sum, ce) => sum + ce.pointsEarned, 0);
      const correctAnswers = completedExercisesInLevel.filter(ce => ce.isCorrect).length;
      
      progress.completeLevel(parseInt(level), levelScore, levelExercises.length, correctAnswers);
      await progress.save();
    }
    
    res.json({
      success: true,
      levelCompleted: true,
      nextLevelUnlocked: parseInt(level) < 10,
      message: `Level ${level} completed successfully!`,
      progress: {
        currentLevel: progress.currentLevel,
        unlockedLevels: progress.unlockedLevels,
        totalScore: progress.totalScore
      }
    });
    
  } catch (error) {
    console.error('❌ Error completing level:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to complete level',
      error: error.message
    });
  }
});

module.exports = router;