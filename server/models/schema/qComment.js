const mongoose = require('mongoose')


module.exports = mongoose.Schema(
    {
        text: {type: String, required: true},
        cmt_by: {type: String, required: true},
        question: {type: mongoose.Schema.Types.ObjectId, ref: 'Question'}
    },
    {collection: "Qcomment"}
)