import createError from 'http-errors';
import asyncHandler from 'express-async-handler'
import { INext, IReq, IRes } from '../types'
import { ApiResponse } from '../utils'
import { loginUserService, regitserUserService } from '../services';

const registerUser = asyncHandler(async (req: IReq, res: IRes, next: INext) => {
    const userForRegister = req.user;
    if (!userForRegister) {
        next(createError(404, "User required for registeration !!"))
    }
    const newUser = await regitserUserService(userForRegister!)
    res.status(200).json(new ApiResponse(200, "User register successfully", newUser))
})

const loginUser = asyncHandler(async (req: IReq, res: IRes, next: INext) => {
    const userForLogin = req.user;
    if (!userForLogin) {
        next(createError(404, "User required for login !!"))
    }
    const { accessToken, refreshToken, isUserExists } = await loginUserService(userForLogin!)
    isUserExists.password = "null";
    const cookieOption = { httpOnly: true, maxAge: 48 * 60 * 60 * 1000 }
    res.status(200)
        .cookie("accesstoken", accessToken, cookieOption)
        .cookie("refreshtoken", refreshToken, cookieOption)
        .json(
            new ApiResponse(200, "User login successfully", { accessToken, refreshToken, isUserExists })
        )
})

export { registerUser, loginUser }