import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productsSchema = new Schema({
    name: { type: String, requried: true },
    description: { type: String, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "category" },
}, { timestamps: true })

export const Product = mongoose.model("products", productsSchema);


// const attributesSchema = new Schema({
//     type: { type: String, requried: true },
//     value: { type: String, required: true },
// }, { timestamps: true })

// export const Attribute = mongoose.model("attributes", attributesSchema);


const productsSkusSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: "products" },
    // sizeAttiribute: { type: Schema.Types.ObjectId, ref: "attributes" },
    // colorAttiribute: { type: Schema.Types.ObjectId, ref: "attributes" },
    sku: { type: String },
    price: { type: Number, required: true },
}, { timestamps: true })

export const ProductSku = mongoose.model("products_skus", productsSkusSchema);