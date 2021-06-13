import mongoose from "mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;

const momentSchema = new Schema({
    title: String,
    message: String,
    creator: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    tags: [
        {
            type: String,
        },
    ],
    image: String,
    likes: {
        type: Number,
        default: 0,
    },
    dislikes: {
        type: Number,
        default: 0,
    },
    comments: String,
    createdAt: {
        type: Date,
        default: () => Date.now(),
    },
});

const Moment = model("Moment", momentSchema);

export default Moment;
