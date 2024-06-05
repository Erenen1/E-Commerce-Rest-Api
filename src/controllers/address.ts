import express from "express";
import { Address,UserAddresses} from "../models/address"


export const getAddress = async (req: express.Request, res: express.Response) => {
    const userId = res.locals.userId;
    if(!userId){
        return res.status(403).json("Login olunuz")
    }
    try {
        const addresses = await UserAddresses.find({userId:userId}).populate("addressId");

        return res.status(200).json(addresses);
    } catch (error) {
        console.log(error);
        return res.status(400).json()
    }
}

export const postAddress = async (req: express.Request, res: express.Response) => {
    const userId = res.locals.userId;
    if(!userId){
        return res.status(403).json("Login olunuz")
    }
    const { address,city,postalCode,region} = req.body;
    try {
        const newAddress = new Address({
            address:address,
            city:city,
            postalCode:postalCode,
            region:region
        })
        await newAddress.save()
        const userAddress = new UserAddresses({
            userId:userId,
            addressId:newAddress._id
        })
        await userAddress.save()    
        return res.status(201).json("Basariyla address olusturuldu.")
    } catch (error) {
        console.log(error);
        return res.status(400).json();
    }
}
export const updateAddress = async (req: express.Request, res: express.Response) => {
    const userId = res.locals.userId;
    if(!userId){
        return res.status(403).json("Login olunuz")
    }
    const { address,city,postalCode,region,addressId} = req.body;
    try {
        const userAddress = await Address.findOne({_id:addressId});
        if(!userAddress){
            return res.status(400).json("Adres bulunamadi");
        }
        await Address.findByIdAndUpdate(userAddress._id,{
            address:address,
            city:city,
            postalCode:postalCode,
            region:region
        })
        return res.status(200).json("Basariyla address guncellendi.")
    } catch (error) {
        console.log(error);
        return res.status(400).json();
    }
}


export const deleteAddress = async (req: express.Request, res: express.Response) => {
    const userId = res.locals.userId;
    const { addressId } = req.body;
    try {
        const userAddress = await UserAddresses.findOne({addressId:addressId});
        if(!userAddress){
            return res.status(400).json("Address bulunamadi")
        }
        await Address.findByIdAndDelete({_id:addressId});
        await UserAddresses.findByIdAndDelete({_id:userAddress._id});
        return res.status(200).json("Basariyla adres silindi.")
    } catch (error) {
        console.log(error);
        return res.status(400).json();
    }
}
