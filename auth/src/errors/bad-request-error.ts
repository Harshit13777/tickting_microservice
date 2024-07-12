import { CustomError } from "./CustonError-abstract";

export class BadRequestError extends CustomError {
    statusCode = 400;
    constructor(str: string) {
        super(str)
        Object.setPrototypeOf(this, BadRequestError.prototype)
    }
    serializeError(): { message: string; field?: string | undefined; }[] {
        return [{ message: this.message }]
    }
}