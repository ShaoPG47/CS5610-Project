const mongoose = require('mongoose')

const Acomment = require("./schema/aComment");

module.exports = mongoose.model("Acomment", Acomment)