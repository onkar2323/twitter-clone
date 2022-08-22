const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,

        trim: true
    },
    lastName: {
        type: String,

        trim: true
    },
    username: {
        type: String,

        trim: true,
        unique: true
    },
    email: {
        type: String,

        trim: true,
        unique: true
    },
    password: {
        type: String,

    },
    googleId: {
        type: String,
    },
    profilePic: {
        type: String,
        default: '/images/defaultProfile.jpg'
    },
    coverPhoto: {
        type: String,
        default: '/images/coverphoto.jpg'
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    retweets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;