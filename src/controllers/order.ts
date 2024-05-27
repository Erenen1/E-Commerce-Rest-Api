import express from "express";
import { OrderDetail, OrderItem } from "../models/order"
import { Cart, CartItem } from "../models/cart"


export const getOrders = async (req: express.Request, res: express.Response) => {
    const userId = res.locals.userId;
    try {
        if (!userId) {
            return res.status(403).json("login olunuz");
        }
        const order = await OrderDetail.findOne({ userId: userId })
        if (!order) {
            return res.status(400).json("Siparisiniz yok");
        }
        const items = await OrderItem.find({ orderId: order._id }).populate("defaultAddressId").populate("productId").populate("productSkuId")

        return res.status(200).json(items);
    } catch (error) {
        console.log(error);
        return res.status(400).json()
    }
}

export const postOrder = async (req: express.Request, res: express.Response) => {
    const userId = res.locals.userId;
    try {
        const cart = await Cart.findOne({ userId: userId })
        if (!cart) {
            return res.status(400).json("Sepet bos");
        }

        const cartItems = await CartItem.find({ cartId: cart._id }).populate("productSkuId").populate("productId");
        console.log(cartItems)
        // const item = new OrderItem({
        //     cartId: cart._id,
        //     productId: cart.productId,
        //     quantity: quantity,
        //     productSkuId: productSkuId,
        //     defaultAddressId:
        // })

        return res.status(200).json("Basariyla item olusturuldu.")
    } catch (error) {
        console.log(error);
        return res.status(400).json();
    }
}

export const deleteItemFromCart = async (req: express.Request, res: express.Response) => {
    const { itemId } = req.body;
    try {
        await CartItem.findByIdAndDelete(itemId);

        return res.status(200).json("Basariyla item kaldirildi.")
    } catch (error) {
        console.log(error);
        return res.status(400).json();
    }
}