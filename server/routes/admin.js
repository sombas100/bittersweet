const express = require('express');
const router = express.Router();
const { requireAdmin } = require('../middleware/requireAdmin')
const adminController = require('../controllers/adminController');

router.get('/dashboard', requireAdmin, adminController.getDashboard);

module.exports = router;