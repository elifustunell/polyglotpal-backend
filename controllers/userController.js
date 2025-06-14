const User = require('../models/User');

// Kullanıcı bilgilerini getir
exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.user.uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Kullanıcı oluştur veya güncelle
exports.createOrUpdateUser = async (req, res) => {
  const { email, name, language } = req.body;
  const uid = req.user.uid;

  try {
    let user = await User.findOne({ uid });
    
    if (user) {
      // Kullanıcı varsa güncelle
      user.email = email || user.email;
      user.name = name || user.name;
      user.language = language || user.language;
    } else {
      // Yeni kullanıcı oluştur
      user = new User({
        uid,
        email,
        name,
        language,
        points: 0
      });
    }

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Progress güncelle
exports.updateProgress = async (req, res) => {
  const uid = req.user.uid;
  const { points } = req.body;

  try {
    let user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.points = (user.points || 0) + (points || 1);
    await user.save();
    
    res.json({ points: user.points });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};