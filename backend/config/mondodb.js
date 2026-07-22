import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("Database connected");
        console.log("Connected DB:", mongoose.connection.name);

    } catch (error) {
        console.log("MongoDB Error:", error.message);
    }
};

export default connectDB;