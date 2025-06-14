const express = require('express');
const router = express.Router();
const { updateSettings } = require('../controllers/settingsController');
const authMiddleware = require('../middlewares/authMiddleware');

// PUT /api/settings - Kullanıcı ayarlarını güncelle
router.put('/', authMiddleware, updateSettings);

module.exports = router;