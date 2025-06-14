const User = require('../models/User');

exports.updateSettings = async (req, res) => {
  const { language } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { uid: req.user.uid },
      { language },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
