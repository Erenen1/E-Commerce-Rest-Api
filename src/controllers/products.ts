import express from "express";
import { Product, ProductSku } from "../models/product"


export const getProducts = async (req: express.Request, res: express.Response) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (error) {
        console.log(error);
        return res.status(400).json()
    }
}

export const getProductDetail = async (req: express.Request, res: express.Response) => {
    const productId = req.params.productId;
    try {
        const product = await Product.findOne({ _id: productId })
        return res.status(200).json(product)
    } catch (error) {
        console.log(error);
        return res.status(400).json();
    }
}

export const getProductsForAdmin = async (req: express.Request, res: express.Response) => {
    try {
        const products = await ProductSku.find().populate("productId");
        return res.status(200).json(products);
    } catch (error) {
        console.log(error);
        return res.status(400).json()
    }
}
export const getProductForAdmin = async (req: express.Request, res: express.Response) => {
    const productId = req.params.productId
    try {
        const products = await ProductSku.findOne({ productId: productId }).populate("productId");
        return res.status(200).json(products);
    } catch (error) {
        console.log(error);
        return res.status(400).json()
    }
}


export const postProduct = async (req: express.Request, res: express.Response) => {
    const { name, description, categoryId, sku, price } = req.body;
    try {
        const newProduct = await new Product({
            name: name,
            description: description,
        }).save();
        const product = newProduct.toObject();

        await new ProductSku({
            productId: product._id,
            sku: sku,
            price: price
        }).save();
        return res.status(201).json("Urun olusturuldu.");
    } catch (error) {
        console.log(error);
        return res.status(400).json()
    }
}

export const updateProduct = async (req: express.Request, res: express.Response) => {
    const productId = req.params.productId;
    const { name, description, sku, price } = req.body;
    try {
        await Product.findByIdAndUpdate(productId, {
            name: name,
            description: description,
            sku: sku,
            price: price
        })
        return res.status(200).json("Urun guncellendi.")
    } catch (error) {
        console.log(error);
        return res.status(400).json();
    }
}

export const deleteProduct = async (req: express.Request, res: express.Response) => {
    const productId = req.params.productId;
    try {
        await Product.findByIdAndDelete(productId)
        return res.status(200).json("Urun silindi.")
    } catch (error) {
        console.log(error);
        return res.status(400).json();
    }
}