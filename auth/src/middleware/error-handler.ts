import { Request, Response, NextFunction } from "express";
import { RequestValidationError } from "../errors/request-validation-error";
import { RequestDatabaseError } from "../errors/request-database-error";
import { CustomError } from "../errors/CustonError-abstract";

export type ResponseError = { message: string, field?: string }[]

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    console.log('Something went wrong')
    if (err instanceof CustomError) {
        res.status(err.statusCode).send({ Error: err.serializeError() })
    }
    res.status(400).send({ Error: [{ message: err.message }] })
}