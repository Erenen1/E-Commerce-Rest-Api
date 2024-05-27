import { verifyJwtToken } from "../helpers/authentication"
import express from "express";

const checkJwt = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const jwtToken = req.headers["authorization"]
        // req.headers["authorization"].split(" ")[1] 
        if (!jwtToken) {
            return next();
            
        }
        const decodedToken = verifyJwtToken(jwtToken);

        if (typeof decodedToken == "string") {
            return next();
        }
        res.locals.userId = decodedToken.userId;
        res.locals.email = decodedToken.email;
        res.locals.isAdmin = decodedToken.isAdmin;
        next();
    } catch (error) {
        console.log(error);
        res.status(403).send("jwt token invalid")
    }
}

export default checkJwt;