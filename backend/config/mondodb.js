import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on("connected", () =>
        console.log("Database connected")
    );

    await mongoose.connect(process.env.MONGODB_URI);


    console.log("Connected DB:", mongoose.connection.name);
};

export default connectDB;