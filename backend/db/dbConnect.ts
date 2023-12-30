import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.DB_URI!)
        console.log("DB Connected !!!", connectionInstance.connection.host);
    } catch (error) {
        console.log("DB Connection error !!!");
    }
}

export default dbConnect;