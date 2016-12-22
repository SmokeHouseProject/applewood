'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    name: String,
    model: String,
    description: String,
    price: Number
});

module.exports = mongoose.model('Product', schema);