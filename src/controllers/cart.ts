import express from "express";
import { Cart, CartItem } from "../models/cart"
import { ProductSku } from "../models/product";


export const getCart = async (req: express.Request, res: express.Response) => {
    const userId = res.locals.userId;
    try {
        if (!userId) {
            return res.status(403).json("Login olunuz")
        }
        const cart = await Cart.findOne({ userId: userId })
        if (!cart) {
            return res.status(400).json("Sepet bos");
        }
        const items = await CartItem.find({ cartId: cart._id })
        return res.status(200).json(items);
    } catch (error) {
        console.log(error);
        return res.status(400).json()
    }
}

export const postItemToCart = async (req: express.Request, res: express.Response) => {
    const userId = res.locals.userId;
    const { productId, quantity } = req.body;
    if (!quantity || typeof quantity !== "number" || quantity <= 0) {
        return res.status(400).json("Invalid quantity")
    }
    try {
        let cart = await Cart.findOne({ userId: userId })
        if (!cart) {
            cart = new Cart({ userId: userId });
            await cart.save();
        }
        const productSku = await ProductSku.findOne({ productId: productId })
        if (!productSku) {
            return res.status(400).json("Product not found")
        }
        let cartItem = await CartItem.findOne({ cartId: cart._id, productId: productId })
        if (cartItem) {
            if (typeof cartItem.quantity === "number") {
                cartItem.quantity += quantity;
            }
        } else {
            cartItem = new CartItem({
                cartId: cart._id,
                productId: productId,
                productSkuId: productSku._id,
                quantity: quantity
            })
        }
        await cartItem.save();

        //buradan sonrasi cart'in total price'ini hesaplamak icin
        const cartItems = await CartItem.find({ cartId: cart._id });
        let total = 0;
        for (const item of cartItems) {
            const sku = await ProductSku.findOne({ _id: item.productSkuId })
            if (sku && item.quantity) {
                total += sku.price * item.quantity;
            }
        }
        cart.total = total;
        await cart.save()

        return res.status(200).json("Basariyla item olusturuldu.")
    } catch (error) {
        console.log(error);
        return res.status(400).json();
    }
}

export const deleteItemFromCart = async (req: express.Request, res: express.Response) => {
    const { itemId } = req.body;
    try {
        const item = await CartItem.findOne({ _id: itemId });
        if (!item || !item.quantity) {
            return res.status(400).json("Urun yok")
        }
        item.quantity--;

        if (item.quantity === 0) {
            await CartItem.findByIdAndDelete(itemId);
        }
        else {
            await item.save();
        }

        //sepetin tutarini guncelle
        const cartItems = await CartItem.find({ cartId: item.cartId });
        let total = 0;
        for (const cartItem of cartItems) {
            const sku = await ProductSku.findOne({ _id: cartItem.productSkuId });
            if (sku && cartItem.quantity) {
                total += sku.price * cartItem.quantity;
            }
        }
        const cart = await Cart.findOne({ _id: item.cartId });
        if(cart){
            cart.total = total;
            await cart.save();
        }

        return res.status(200).json("Basariyla item silindi.")
    } catch (error) {
        console.log(error);
        return res.status(400).json();
    }
}
