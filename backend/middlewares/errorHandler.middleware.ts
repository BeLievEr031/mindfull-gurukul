import { IError, INext, IReq, IRes } from "../types";

const errorHandler = (err: IError, req: IReq, res: IRes, next: INext) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong"
    const success = false;
    const data = null
    const stack = err.stack || [];
    
    res.status(statusCode).json({
        success,
        statusCode,
        message,
        data,
        stack
    })
}

export default errorHandler;