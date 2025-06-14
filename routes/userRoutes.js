const express = require('express');
const router = express.Router();
const { getUser, createOrUpdateUser, updateProgress } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// GET /api/users/me - Kullanıcı bilgilerini getir
router.get('/me', authMiddleware, getUser);

// POST /api/users/update - Kullanıcı bilgilerini güncelle
router.post('/update', authMiddleware, createOrUpdateUser);

// PUT /api/users/progress - Progress güncelle
router.put('/progress', authMiddleware, updateProgress);

module.exports = router;