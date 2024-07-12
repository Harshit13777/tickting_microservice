import express, { Response, Request, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { RequestDatabaseError } from "../errors/request-database-error";
import { User } from "../models/users";
import { BadRequestError } from "../errors/bad-request-error";
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

    return res.status(200).send(user)

})

export { router as signupRouter };