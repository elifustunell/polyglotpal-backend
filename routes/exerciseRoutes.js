const express = require('express');
const router = express.Router();
const Exercise = require('../models/Exercise');
const authMiddleware = require('../middlewares/authMiddleware');

// GET exercises by language, category, and level
// Example: GET /api/exercises/en/filltheblanks/1
router.get('/:language/:category/:level', authMiddleware, async (req, res) => {
  try {
    const { language, category, level } = req.params;

    // Geçersiz parametre kontrolü
    if (!language || !category || isNaN(parseInt(level))) {
      return res.status(400).json({
        success: false,
        message: 'Invalid parameters. Expected /:language/:category/:level'
      });
    }

    console.log(`[EXERCISE] User: ${req.user.uid}, Query: ${language}/${category}/${level}`);

    const exercises = await Exercise.find({
      language,
      category,
      level: parseInt(level)
    });

    if (!exercises || exercises.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No exercises found for this criteria',
        language,
        category,
        level
      });
    }

    res.status(200).json({
      success: true,
      count: exercises.length,
      data: exercises
    });

  } catch (error) {
    console.error('Error fetching exercises:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching exercises',
      error: error.message
    });
  }
});

module.exports = router;
