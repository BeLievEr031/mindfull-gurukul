import createError from 'http-errors';
import asyncHandler from 'express-async-handler';
import { ILoginUser, IRegisterUser, IUser } from '../types';
import UserModel from '../models/UserModel';
const regitserUserService = async (user: IRegisterUser) => {
    const isUserExists = await UserModel.findOne({ email: user.email })
    if (isUserExists) {
        throw createError(403, "User already exists")
    }
    const newUser = await UserModel.create(user)
    return newUser;
}

const loginUserService = async (user: ILoginUser) => {
    const isUserExists = await UserModel.findOne({ email: user.email }).select("+password")
    if (!isUserExists) {
        throw createError(409, "Unauthorized user !!")
    }

    console.log(isUserExists);
    
    const isPassword = await isUserExists.comparePassword(user.password)
    console.log(isPassword);
    
    if (!isPassword) {
        throw createError(409, "Unauthorized user !!")
    }
    const accessToken = isUserExists.generateAccessToken()
    const refreshToken = isUserExists.generateRefreshToken()

    isUserExists.refreshToken = refreshToken;
    await isUserExists.save();
    return { accessToken, refreshToken, isUserExists };
}


export { regitserUserService, loginUserService }