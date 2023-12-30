import { Schema, model } from "mongoose";
import { IRegisterUser } from "../types";

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

userSchema.pre("save", function () {
})

const UserModel = model<IRegisterUser>("Users", userSchema);

export default UserModel;