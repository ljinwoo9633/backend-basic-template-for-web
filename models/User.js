let mongoose = require('mongoose');

const USER_SCHEMA = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required :true
        },
        name: {
            type: String,
            required: true
        },
        emailVerification: {
            type: Boolean,
            default: false
        },
        gender: {
            type: Boolean,
            default: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        onLine: {
            type: Boolean,
            default: false
        },
        birthDateYear: {
            type: Number
        },
        birthDateMonth: {
            type: Number,
        },
        birthDateDay: {
            type: Number
        }
    }
)

module.exports = mongoose.model('User', USER_SCHEMA);