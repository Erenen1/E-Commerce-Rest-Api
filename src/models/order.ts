import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
    orderId: { type: Schema.Types.ObjectId, ref: "orders" },
    productId: { type: Schema.Types.ObjectId, ref: "products" },
    productSkuId: { type: Schema.Types.ObjectId, ref: "products_skus" },
    quantity: { type: Number, required: true },
    defaultAddressId: { type: Schema.Types.ObjectId, ref: "user_addresses" }
}, { timestamps: true })

export const OrderItem = mongoose.model("order_item", orderItemSchema);

const orderDetailSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "users" },
    // paymentId: { type: Schema.Types.ObjectId, ref: "payments" },
    total: { type: Number, required: true },
}, { timestamps: true })

export const OrderDetail = mongoose.model("order_detail", orderDetailSchema);