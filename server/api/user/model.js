'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    username: String,
    password: String,
    displayName: String,
    role: Number,
    created: Date
});

module.exports = mongoose.model('User', schema);