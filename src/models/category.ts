import mongoose from "mongoose";
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true })

export const Category = mongoose.model("category", categorySchema);


const subCategorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    parentId: { type: Schema.Types.ObjectId, ref: "category" },
}, { timestamps: true })


export const SubCategory = mongoose.model("sub_category", subCategorySchema);