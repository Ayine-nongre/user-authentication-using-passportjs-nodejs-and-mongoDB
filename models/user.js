const { string, number } = require('joi');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/userDB');

var set = mongoose.connection;
set.on('error', console.error.bind(console, 'connection error:'));
set.once('open', function() {
    console.log('Connected')
});

const User =  mongoose.model('User', {
    name: String,
    email: String,
    age: Number,
    password: String,
});

module.exports = User;
