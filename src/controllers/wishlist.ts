import express from "express";
import Wishlist from "../models/wishlist"

export const getWishlists = async(req: express.Request, res: express.Response)=>{
    const userId = res.locals.userId
    if(!userId){
        return res.status(403).json("Login olunuz")
    }
    try {
        const favProducts = await Wishlist.find({userId:userId}).populate("productId")
        return res.status(200).json(favProducts);
    } catch (error) {
        console.log(error)
        return res.status(400).json();
    }
}

export const postWishToList = async(req: express.Request, res: express.Response)=>{
    const userId = res.locals.userId
    if(!userId){
        return res.status(403).json("Login olunuz")
    }
    const {productId} = req.body
    try {
        const isThereSameProduct = await Wishlist.findOne({productId:productId, userId:userId});
        if(isThereSameProduct){
            return res.status(400).json("Bu urun listenizde var.")
        }
        const wish = new Wishlist({
            productId:productId,
            userId:userId
        })
        await wish.save()
        return res.status(201).json("Urun basariyla favori listesine eklendi.");
    } catch (error) {
        console.log(error)
        return res.status(400).json();
    }
}

export const deleteWishFromList = async(req: express.Request, res: express.Response)=>{
    const userId = res.locals.userId
    if(!userId){
        return res.status(403).json("Login olunuz")
    }
    const productId = req.params.productId;
    try {
        const wish = await Wishlist.findOne({productId:productId , userId:userId})
        if(!wish){
            return res.status(400).json("Urun favori listende bulunamadi")
        }
        await Wishlist.findByIdAndDelete(wish._id);
        return res.status(200).json("Urun basariyla favori listesinden silindi.");
    } catch (error) {
        console.log(error)
        return res.status(400).json();
    }
}

export const deleteAllWish = async(req: express.Request, res: express.Response)=>{
    const userId = res.locals.userId
    if(!userId){
        return res.status(403).json("Login olunuz")
    }
    try {
        const wishlist = await Wishlist.find({userId:userId})
        if(!wishlist){
            return res.status(400).json("Favori listende urun bulunamadi")
        }
        for (const wish of wishlist) {
            await Wishlist.findByIdAndDelete(wish._id);
        }
        return res.status(200).json("Urun basariyla favori listesinden silindi.");
    } catch (error) {
        console.log(error)
        return res.status(400).json();
    }
}
