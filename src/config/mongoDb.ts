import mongoose from "mongoose";


export default async () => {
    try {
        await mongoose.connect(process.env.DB_HOST as string)
        console.log("Db baglantisi basarili");

    } catch (error) {
        console.log(error)
    }
}