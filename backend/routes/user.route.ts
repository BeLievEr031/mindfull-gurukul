import express from "express"
import { validateRegisterUser, validateLoginUser } from "../middlewares";
import { loginUser, registerUser } from "../controllers";

const userRouter = express.Router();

userRouter.route("/register").post(validateRegisterUser, registerUser)
userRouter.route("/login").post(validateLoginUser, loginUser)

export default userRouter;