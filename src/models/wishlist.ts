import mongoose from "mongoose";
const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: "products" },
    userId: { type: Schema.Types.ObjectId, ref: "users" },
}, { timestamps: true })

export const Category = mongoose.model("category", wishlistSchema);