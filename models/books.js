const mongoose = require("mongoose")

const schema = mongoose.Schema;

const Books = new schema({
    title: String,
    author: String,
    summary: String
})

module.exports = mongoose.model("books", Books);