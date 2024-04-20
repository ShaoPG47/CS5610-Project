const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 5
        },
        password: {
            type: String,
            required: true,
            minLength: 8
        },
        createdDate: {
            type: Date,
            default: Date.now
        },
        useremail: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        questions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
        }],
        answers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Answer'
        }],
        qComments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Qcomment"
        }],
        aComments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Acomment"
        }]
})

userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next();
})

module.exports = userSchema;