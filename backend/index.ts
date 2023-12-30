import app from "./app";
import dbConnect from "./db/dbConnect";

dbConnect().then(() => {
    const PORT = process.env.PORT || 5100;
    app.listen(PORT, () => {
        console.log("Connected to server at PORT", PORT);
    })
}).catch((error) => {
    console.log(error);
    process.exit(1)
})