import environment from "@utils/environment";
import mongoose from "mongoose";

let isDatabaseConnected = false;

const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (isDatabaseConnected) {
    console.log("Database is already connected");
    return true;
  }

  try {
    mongoose.connect(environment.MONGODB_URI);
    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB");
      isDatabaseConnected = true;
    });
    return true;
  } catch (error) {
    console.log("Disconnected from MongoDB", error);
    isDatabaseConnected = false;
    throw new Error(error.message || "Something went wrong");
  }
};

export default connectToDatabase;
