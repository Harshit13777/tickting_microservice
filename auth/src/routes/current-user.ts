import express, { Request, Response } from "express";

const router = express.Router();
import jwt from "jsonwebtoken";
import { currentUser } from "../middleware/current-user";

router.get('/api/users/currentuser', currentUser, (req: Request, res: Response) => {

    res.send({ currentUser: req.currentUser ?? null })

})

export { router as currentUserRouter };