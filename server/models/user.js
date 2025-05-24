const { Schema, model, Aggregate } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
});

module.exports = model('User', userSchema);