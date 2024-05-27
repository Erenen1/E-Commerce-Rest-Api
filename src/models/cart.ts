import mongoose from "mongoose";
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "users" },
    total: { type: Number, required: true, default: 0 }
}, { timestamps: true })

export const Cart = mongoose.model("cart", cartSchema);

const cartItemSchema = new Schema({
    cartId: { type: Schema.Types.ObjectId, ref: "cart" },
    productId: { type: Schema.Types.ObjectId, ref: "products" },
    productSkuId: { type: Schema.Types.ObjectId, ref: "products_sku" },
    quantity: { type: Number, requried: true }

}, { timestamps: true })

export const CartItem = mongoose.model("cart_item", cartItemSchema);