const express = require('express');
const userRoutes = require('./server/user/user.route');
const authRoutes = require('./server/auth/auth.route');

const router = express.Router();

router.get('/health-check', (req, res) =>
  res.send('OK')
);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;
