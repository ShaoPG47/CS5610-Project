const mongoose = require("mongoose");

// Schema for answers
module.exports = mongoose.Schema(
    {
        // define relevant properties.
        // id: {type: String, required: true, unique: true},
        text: {type: String, required: true},
        ans_by: {type: String, required: true},
        ans_date_time: {type: Date, required: true},
        question: {type: mongoose.Schema.Types.ObjectId, ref: "Question"},
        comments: [{type:mongoose.Schema.Types.ObjectId, ref: 'Acomment'}]
    },
    { collection: "Answer" }
);
