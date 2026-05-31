import mongoose, { Schema, model, models } from "mongoose";

const LinkSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    handle: {
        type: String,
        required: true
    },
    Links: [String],
    description: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    public_id: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
)

const Link = models.Link || model("Link", LinkSchema);
export default Link;

