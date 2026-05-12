const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const linksController = require('../controllers/linksController');

router.use(authMiddleware);

router.get('/', linksController.listSavedLinks);
router.post('/', linksController.saveLink);

module.exports = router;
