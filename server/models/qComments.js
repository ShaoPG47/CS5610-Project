const mongoose = require('mongoose')

const Qcomment = require("./schema/qComment");

module.exports = mongoose.model("Qcomment", Qcomment)