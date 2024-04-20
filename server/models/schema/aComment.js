const mongoose = require('mongoose')


module.exports = mongoose.Schema(
    {
        text: {type: String, required: true},
        cmt_by: {type: String, required: true},
        answer: {type: mongoose.Schema.Types.ObjectId, ref: 'Answer'}
    },
    {collection: "Acomment"}
)