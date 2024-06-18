import express from "express";
import User from "../models/user"
import { sha256Hash, compareHash, createJwtToken } from "../helpers/authentication";

export const login = async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body
    try {
        //validate
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.sendStatus(400);
        }
        const isMatch: boolean = compareHash(password, user.password);
        if (!isMatch) {
            return res.sendStatus(403)
        }
        const jwtToken = createJwtToken(user._id.toString(), user.email, user.isAdmin);

        return res.status(302).setHeader("auhtorization", jwtToken).json({token:jwtToken})
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export const register = async (req: express.Request, res: express.Response) => {
    const { name, email, password, phoneNumber } = req.body;
    try {
        //validate 
        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return res.status(409).json("Bu email adresi zaten kayıtlı.")
        }
        const hashedPassword = sha256Hash(password);
        const user = new User({
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            password: hashedPassword
        })
        await user.save();
        return res.status(201).json("Hesap basariyla oluşturuldu.")
    } catch (error) {
        console.log(error)
        return res.status(400).json();
    }
}