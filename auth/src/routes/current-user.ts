import express, { Request, Response } from "express";

const router = express.Router();
import jwt from "jsonwebtoken";

router.get('/api/users/currentuser', (req: Request, res: Response) => {
    if (!req.session?.jwt) {
        return res.send({ currentUser: null })
    };

    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!)
        res.send({ currentUser: payload })
    } catch (e: any) {
        res.send({ currentUser: null })
    }

})

export { router as currentUserRouter };