// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const controller = require('../controllers/productsController');

router.get('/', controller.index);

router.get('/create', controller.create);
router.post('/create', controller.store);

router.delete('/:id', controller.destroy);

module.exports = router;
