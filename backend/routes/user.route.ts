import express from "express"
import { validateRegisterUser } from "../middlewares";
import { registerUser } from "../controllers";

const userRouter = express.Router();

userRouter.route("/register").post(validateRegisterUser, registerUser)


export default userRouter;