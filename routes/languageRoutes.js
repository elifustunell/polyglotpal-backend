const express = require('express');
const router = express.Router();
const { getLanguages } = require('../controllers/languageController');

// GET /api/languages - Dil listesini getir
router.get('/', getLanguages);

module.exports = router;

