import express from "express";

export const onlyAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if(res.locals.isAdmin){
        return next();
    }
    return res.status(403).json("Forbidden")
}