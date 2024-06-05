import express from "express";
import User from "../models/user"
import { sha256Hash} from "../helpers/authentication"

export const getUsers = async(req: express.Request, res: express.Response)=>{
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        console.log(error)
        return res.status(400).json();
    }
}

export const getUserDetail = async(req: express.Request, res: express.Response)=>{
    const {userId }= req.body
    const authedUserId = res.locals.userId;
    if(authedUserId !== userId){
        return res.status(401).json("Unauthorized");
    }
    try {
        const user = await User.findOne({_id:userId});
        if(!user){
            return res.status(400).json("Kullanici bulunamadi.");
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log(error)
        return res.status(400).json();
    }
}
export const getUserDetailForAdmin = async(req: express.Request, res: express.Response)=>{
    const {userId }= req.body
    try {
        const user = await User.findOne({_id:userId});
        if(!user){
            return res.status(400).json("Kullanici bulunamadi.");
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log(error)
        return res.status(400).json();
    }
}
export const updateUser = async(req: express.Request, res: express.Response)=>{
    const {userId,name,email,password,phoneNumber}= req.body
    const authedUserId = res.locals.userId;
    if(authedUserId !== userId){
        return res.status(401).json("Unauthorized");
    }
    try {
        const hashedPassword = sha256Hash(password);

        await User.findByIdAndUpdate({_id:userId},{
            name:name,
            email:email,
            password: hashedPassword,
            phoneNumber : phoneNumber
        })        
        return res.status(200).json("Kullanici guncellendi.");
    } catch (error) {
        console.log(error)
        return res.status(400).json();
    }
}

export const updateUserForAdmin = async(req: express.Request, res: express.Response)=>{
    const {userId,name,email,password,phoneNumber }= req.body
    try {
        const hashedPassword = sha256Hash(password);
        
        await User.findByIdAndUpdate({_id:userId},{
            name:name,
            email:email,
            password: hashedPassword,
            phoneNumber : phoneNumber
        })    
        return res.status(200).json("Kullanici guncellendi.");
    } catch (error) {
        console.log(error)
        return res.status(400).json();
    }
}


export const deleteUser = async(req: express.Request, res: express.Response)=>{
    const {userId }= req.body
    const authedUserId = res.locals.userId;
    if(authedUserId !== userId){
        return res.status(401).json("Unauthorized");
    }
    try {
        await User.findByIdAndDelete(userId);
        return res.status(200).json("Kullanici silindi.");
    } catch (error) {
        console.log(error)
        return res.status(400).json();
    }
}
export const deleteUserForAdmin = async(req: express.Request, res: express.Response)=>{
    const {userId }= req.body
    try {
        await User.findByIdAndDelete(userId);
        return res.status(200).json("Kullanici silindi.");
    } catch (error) {
        console.log(error)
        return res.status(400).json();
    }
}