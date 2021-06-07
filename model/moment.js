import mongoose from "mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;

const momentSchema = new Schema({
    title: String,
    message: String,
    creator: String,
    // tags: [String],
    tags: [
        {
            type: String,
        },
    ],
    image: String,
    likes: {
        type: String,
        default: 0,
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    // },
    createdAt: {
        type: Date,
        default: () => Date.now(),
    },
});

const Moment = model("Moment", momentSchema);

export default Moment;
