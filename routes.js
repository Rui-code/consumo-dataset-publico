const express = require('express');
const router = express.Router();

const dskController = require('./dskController');

router.get('/dsk', dskController.index);

module.exports = router;