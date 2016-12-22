'use strict';

var express = require('express');
var entity = require('../api/user/model');
var controller = require('./controller')(entity);

var router = express.Router();

router.post('/', controller.authenticate);

module.exports = router;