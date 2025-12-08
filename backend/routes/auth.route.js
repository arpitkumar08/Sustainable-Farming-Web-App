const express = require('express');
const { signup, login } = require('../controllers/auth.controller');
const { protect } = require('../middlewares/auth.middleware');
const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// 🔐 Protected route example
router.get('/me', protect, (req, res) => {
    res.json({
        success: true,
        message: "Protected route accessed!",
        userId: req.user
    });
});

module.exports = router;
