import { NextFunction, Response, Request } from "express"
import { IUser } from "./user.type"

interface IReq extends Request {
    user?: IUser
}
interface IRes extends Response {
}
interface INext extends NextFunction { }

interface IError extends Error {
    statusCode?: number
}

export { IReq, IRes, INext,IError };