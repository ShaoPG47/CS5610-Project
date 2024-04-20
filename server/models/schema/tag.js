const mongoose = require("mongoose");

module.exports = mongoose.Schema(
    {
        // add relevant properties.
        // id: {type: String, required: true, unique: true},
        name: {type: String, required: true}
    },
    { collection: "Tag" }
);
