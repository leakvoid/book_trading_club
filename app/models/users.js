'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var bookSchema = new Schema({
    name: String
});

var userSchema = new Schema({
    github: {
        id: String,
        displayName: String,
        username: String,
        publicRepos: Number
    },
    settings: {
        full_name: String,
        city: String,
        state: String
    },
    books: [bookSchema]
});

module.exports = mongoose.model('User', userSchema);
