import { INext, IRegisterUser, IReq, IRes } from "../types";
import joi from "joi";
import createError from "http-errors"
const validateRegisterUser = (req: IReq, res: IRes, next: INext) => {
    const userSchema = joi.object<IRegisterUser>({
        username: joi.string().required().disallow("").trim(),
        email: joi.string().email().required().disallow(""),
        city: joi.string().required().disallow("").trim(),
        gender: joi.string().required().disallow("").valid("Male", "Female", "Other"),
        hearingSource: joi.string().disallow("").required().valid("LinkedIn", "Friends", "Job Portal", "Others"),
        password: joi.string().required().disallow(""),
        phone: joi.number().required(),
        state: joi.string().required().disallow("").trim()
    })

    const { value, error } = userSchema.validate(req.body)
    if (error) {
        return next(createError(422, error))
    }
    req.user = value;
    next();
}

const validateLoginUser = (req: IReq, res: IRes, next: INext) => {
    const userSchema = joi.object<IRegisterUser>({
        email: joi.string().email().required().disallow(""),
        password: joi.string().required().disallow(""),
    })
    const { value, error } = userSchema.validate(req.body)
    if (error) {
        return next(createError(422, error))
    }

    req.user = value;
    next();
}




export { validateRegisterUser,validateLoginUser };