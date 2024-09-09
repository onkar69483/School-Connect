const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter the notice title"],
    },
    notice: {
        type: String,
        required: [true, "Please enter the notice content"],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true,
    },
    date: {
        type: Date,
        required: [true, "Please enter the date of the event"],
    },
    time: {
        type: String,
        required: [true, "Please enter the time of the event"],
    },
});

module.exports = mongoose.model("Notice", noticeSchema);
