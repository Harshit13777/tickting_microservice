import express, { Request, Response } from "express";

const router = express.Router();
import jwt from "jsonwebtoken";
import { currentUser } from "@rameticket/common";
import { requireAuth } from "@rameticket/common";

router.get('/api/users/currentuser', currentUser, requireAuth, (req: Request, res: Response) => {

    res.send({ currentUser: req.currentUser ?? null })

})

export { router as currentUserRouter };