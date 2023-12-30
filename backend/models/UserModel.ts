import { Schema, model } from "mongoose";
import { IRegisterUser } from "../types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
interface IPayload {
    _id: string
    email: string
    username?: string
}

const userSchema = new Schema<IRegisterUser>({
    username: {
        type: String,
        required: [true, "Username required !!"]
    },
    email: {
        type: String,
        required: [true, "email required !!"]
    },
    password: {
        type: String,
        required: [true, "password required !!"],
        select: false
    },
    gender: {
        type: String,
        required: [true, "Gender required !!"]
    },
    hearingSource: {
        type: String,
        required: [true, "Hearing Source required !!"]
    },
    phone: {
        type: Number,
        required: [true, "Phone Number required !!"]
    },
    city: {
        type: String,
        required: [true, "city required !!"]
    },
    state: {
        type: String,
        required: [true, "Stae required !!"]
    }
}, {
    timestamps: true
})

// password hashing before saving the actual document
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return;
    const SALT = await bcrypt.genSalt(+process.env.SALT_ROUND!)
    this.password = await bcrypt.hash(this.password, SALT)
    next()
})

// function for comparing the password 
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    const isPassword = await bcrypt.compare(password, this.password)
    return isPassword;
}

// function for genrating the access_token 
userSchema.methods.generateAccessToken = function () {
    const payload: IPayload = {
        _id: this._id,
        email: this.email,
        username: this.username
    }
    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_TOKEN!)
    return accessToken;
}

// function for generating the refresh_token 
userSchema.methods.generateRefreshToken = function () {
    const payload: IPayload = {
        _id: this._id,
        email: this.email,
    }
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_TOKEN!)
    return refreshToken;
}

const UserModel = model<IRegisterUser>("Users", userSchema);

export default UserModel;