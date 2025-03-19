import mongoose from "mongoose";

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return;
    }
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/getmeachai");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error.message);
    }
};

export default connectDB;