import express, { Response, Request, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "@rameticket/common";
import { RequestDatabaseError } from "@rameticket/common";
import { User } from "../models/users";
import { BadRequestError } from "@rameticket/common";
import jwt from "jsonwebtoken";

require('express-async-errors');
const router = express.Router();

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .isLength({ max: 20, min: 4 })
        .withMessage('Password must be between 4 to 20')
], async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array())
    }

    const { email, password } = req.body;

    const Userexist = await User.findOne({ email });
    if (Userexist) {
        console.log('User already exist')
        //bcz it aync function we pass error to next fun but we use library so not requ

        throw new BadRequestError('User already exist')

    }

    const user = User.build({ email, password })
    await user.save();

    //generate JWT 

    const userjwt = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY!); //'!' this assure typescript that var is defined

    // store it in session object
    // session object value encrypt in base64 and store in cookie key (session) value (object) pair
    
    req.session = {
        jwt: userjwt
    }

    return res.status(201).send(user)

})

export { router as signupRouter };