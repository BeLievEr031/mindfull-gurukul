import createError from 'http-errors';
import asyncHandler from 'express-async-handler'
import { INext, IReq, IRes } from '../types'
import { ApiResponse } from '../utils'
import { regitserUserService } from '../services';

const registerUser = asyncHandler(async (req: IReq, res: IRes, next: INext) => {
    const userForRegister = req.user;
    if (!userForRegister) {
        next(createError(404, "User required for registeration !!"))
    }
    const newUser = await regitserUserService(userForRegister!)
    res.status(200).json(new ApiResponse(200, "User register successfully", newUser))
})



export { registerUser }