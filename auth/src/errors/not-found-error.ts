import { CustomError } from "./CustonError-abstract";

export class NotFoundError extends CustomError {
    statusCode = 404;
    constructor() {
        super('Not found error')
        Object.setPrototypeOf(this, NotFoundError.prototype)

    }
    serializeError(): { message: string; field?: string | undefined; }[] {
        return [{ message: 'Not Found' }]
    }
}