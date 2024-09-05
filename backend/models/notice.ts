import mongoose, { Document } from "mongoose";

interface INotice extends Document {
    noticeId: mongoose.Types.ObjectId;
    date: Date;
    time: string;
    title: string;
    notice: string;
    user: mongoose.Types.ObjectId;
}

const noticeSchema = new mongoose.Schema<INotice>({
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

export default mongoose.model<INotice>("Notice", noticeSchema);
