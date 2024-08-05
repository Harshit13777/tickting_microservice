import express, { Response, Request, NextFunction } from "express";

import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { User } from "../models/users";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middleware/validate-request";
import { Password } from "../services/password";
import jwt from 'jsonwebtoken'

require('express-async-errors');
const router = express.Router();

router.post('/api/users/signin', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .notEmpty()
        .withMessage('Enter a password')

],
    validateRequest,
    async (req: Request, res: Response) => {


        const { email, password } = req.body;

        const Userexist = await User.findOne({ email });
        if (!Userexist) {
            console.log('User not exist')
            //bcz it aync function we pass error to next fun but we use library so not requ

            throw new BadRequestError('Invalid credentials')
        }

        if (!await Password.compare(Userexist.password, password)) {
            throw new BadRequestError('Invalid credentials')

        }
        const userjwt = jwt.sign({
            id: Userexist.id,
            email: Userexist.email
        }, process.env.JWT_KEY!); //'!' this assure typescript that var is defined

        // store it in session object
        // session object value encrypt in base64 and store in cookie key (session) value (object) pair
        req.session = {
            jwt: userjwt
        }

        return res.status(200).send(Userexist)

    })

export { router as signinRouter };