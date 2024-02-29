const mongoose = require("mongoose");

const noteShema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
});

const note = mongoose.model("note", noteShema);

module.exports = note;
