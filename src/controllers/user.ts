import express from "express";


export const getUser = (req: express.Request, res: express.Response, next: express.NextFunction)=>{
    console.log(res.locals.isAdmin)

    res.send("454554")
}