import express from "express"
const app = express();
import cors from "cors";
import env from "dotenv";
env.config({ path: `./.env.${process.env.NODE_ENV}` })
import connectDB from "./config/mongoDb"
connectDB();
import checkJwt from "./middlewares/checkJwt"

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(checkJwt);


import adminUsersRoutes from "./routes/admin/user"
import adminProductRoutes from "./routes/admin/product"
import adminCategoryRoutes from "./routes/admin/category"

import authRoutes from "./routes/auth"
import userRoutes from "./routes/user"

import productRoutes from "./routes/product"
import cartRoutes from "./routes/cart"
import userCategoryRoutes from "./routes/category"
import wishlistRoutes from "./routes/wishlist"


app.use("/api/admin/products", adminProductRoutes)
app.use("/api/admin/categories", adminCategoryRoutes)
app.use("/api/admin/users", adminUsersRoutes)

app.use("/api/categories", userCategoryRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/wishlist", wishlistRoutes)


app.use("/profile", userRoutes)
app.use("/auth", authRoutes)


app.listen(3000, () => {
    console.log("Sunucu http://localhost:3000 üzerinden calisiyor.")
})