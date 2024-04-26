//@ts-ignore
import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const conenction = mongoose.conenction;
        conenction.on('connected', () => {
            console.log('MongoDB Connected Successfully!')
        })
        conenction.on('error',(err: string) => {
            console.log("MongoDB Connection Error "+err);
            process.exit();
        })
    } catch (error) {
        console.log("something went wrong");
    }
}
