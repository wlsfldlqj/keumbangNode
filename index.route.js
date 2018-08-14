const express = require('express');
const userRoutes = require('./server/user/user.route');
const walletRoutes = require('./server/wallet/wallet.route');
const authRoutes = require('./server/auth/auth.route');

const router = express.Router();

router.get('/health-check', (req, res) =>
  res.send('OK')
);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/wallets', walletRoutes);

module.exports = router;
