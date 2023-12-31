import createError from 'http-errors';
import asyncHandler from 'express-async-handler';
import { IRegisterUser, IUser } from '../types';
import UserModel from '../models/UserModel';
const regitserUserService = async (user: IRegisterUser) => {
    const isUserExists = await UserModel.findOne({ email: user.email })
    if (isUserExists) {
        throw createError(403, "User already exists")
    }
    const newUser = await UserModel.create(user)
    return newUser;
}


export { regitserUserService }