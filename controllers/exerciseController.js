const Exercise = require('../models/Exercise');

exports.getExercises = async (req, res) => {
  const { language, category, level } = req.query;
  const query = {};

  if (language) query.language = language;
  if (category) query.category = category;
  if (level) query.level = Number(level);

  try {
    const exercises = await Exercise.find(query);
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
