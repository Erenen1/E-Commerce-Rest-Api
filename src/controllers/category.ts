import express from "express";
import {Category,SubCategory } from "../models/category"


export const getCategories = async (req: express.Request, res: express.Response) => {
    try {
        const categories = await Category.find();
        return res.status(200).json(categories);
    } catch (error) {
        console.log(error);
        return res.status(400).json()
    }
}

export const postCategory = async (req: express.Request, res: express.Response) => {
    const {name,description}= req.body;
    try {
        const category  = new Category({
            name:name,
            description:description
        })
        await category.save()
        return res.status(201).json("Basariyla kategori olusturuldu.")
    } catch (error) {
        console.log(error);
        return res.status(400).json();
    }
}
export const deleteCategory = async (req: express.Request, res: express.Response) => {
    const { categoryId } = req.body;
    try {
        await Category.findOneAndDelete(categoryId);
        
        return res.status(200).json("Basariyla kategori silindi.")
    } catch (error) {
        console.log(error);
        return res.status(400).json();
    }
}

export const getSubCategories = async (req: express.Request, res: express.Response) => {
    const { categoryName } = req.body;
    try {
        const category = await Category.findOne({name:categoryName});
        if(!category){
            return res.status(400).json("kategori bulunamadi");
        }
        const subCategories = await SubCategory.find({ parentId:category._id});
        
        return res.status(200).json(subCategories);
    } catch (error) {
        console.log(error);
        return res.status(400).json();
    }
}



export const postSubCategory = async (req: express.Request, res: express.Response) => {
    const {name,description, parentCategoryName}= req.body;
    try {
        const parentCategory = await Category.findOne({name:parentCategoryName});
        if(!parentCategory){
            return res.status(400).json("Bu isimde üst kategori yok.");
        }

        const subCategory = new SubCategory({
            name:name,
            description:description,
            parentId:parentCategory._id
        })
        await subCategory.save()

        return res.status(200).json("Basariyla alt kategori olusturuldu.")
    } catch (error) {
        console.log(error);
        return res.status(400).json();
    }
}

export const deleteSubCategory = async (req: express.Request, res: express.Response) => {
    const { subCategoryId } = req.body;
    try {
        await SubCategory.findOneAndDelete(subCategoryId);

        return res.status(200).json("Basariyla alt kategori silindi.")
    } catch (error) {
        console.log(error);
        return res.status(400).json();
    }
}