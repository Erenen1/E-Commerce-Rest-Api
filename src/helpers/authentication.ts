import crypto from "crypto";
import jwt from "jsonwebtoken"

export const sha256Hash = (data: string): string => crypto.createHmac("sha256", process.env.HASH_SECRET as string).update(data).digest("hex");
export const compareHash = (data: string, hash: string): boolean => hash === crypto.createHmac("sha256", process.env.HASH_SECRET as string).update(data).digest("hex")

export const createJwtToken = (userId: string, email: string, isAdmin: boolean) => jwt.sign({ userId: userId, email: email, isAdmin: isAdmin }, process.env.JWT_SECRET as string, { expiresIn: "244h" })
export const verifyJwtToken = (token: string) => jwt.verify(token, process.env.JWT_SECRET as string);