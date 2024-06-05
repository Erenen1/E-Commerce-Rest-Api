import mongoose from "mongoose";
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    address: { type:String, required: true },
    city: { type: String, required: true },
    region: { type: String, required: true },
    postalCode: { type: String, required: true },
    //countryId: { type: Schema.Types.ObjectId, ref: "country" },
}, { timestamps: true })

export const Address = mongoose.model("address", addressSchema);

//const countrySchema = new Schema({
//    countryName: { type: String, required: true },
//}, { timestamps: true })
//export const Country = mongoose.model("country", countrySchema);


const userAddressesSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "users" },
    addressId: { type: Schema.Types.ObjectId, ref: "address" },
    isDefault: { type: Boolean, required: true, default: false },
}, { timestamps: true })

export const UserAddresses = mongoose.model("user_addresses", userAddressesSchema);