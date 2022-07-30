const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    _id: {type: String, required: true},
    name: {type: String, required: true},
    personal: {type: String, required: true},
    parent: {type: String, required: true},
    room: {type: String, required: true},
    semester: {type: String, required: true},
    password: {type: String, required: true},
    link: {type: String, required: true}

}, {collection: 'students'});

const students = mongoose.model('UserSchema', UserSchema);

module.exports = students;