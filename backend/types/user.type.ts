import { Document } from "mongoose"
interface IRegisterUser extends Document {
    username: string
    email: string
    phone: number
    gender: "Male" | "Female" | "Other"
    password: string
    hearingSource: "LinkedIn" | "Friends" | "Job Portal" | "Others"
    city: string
    state: string
    refreshToken: string
    comparePassword: (password: string) => boolean;
    generateAccessToken: () => string;
    generateRefreshToken: () => string;
}

interface IUser extends IRegisterUser {
    username: string
}

interface ILoginUser {
    email: string
    password: string
}


export { IRegisterUser, ILoginUser, IUser };