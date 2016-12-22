'use strict';

var express = require('express');
var entity = require('./model');
var controller = require('../controller/controller')(entity);
var router = express.Router();
var auth = require('../../auth/controller')();

router.use(auth.validate); 
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;