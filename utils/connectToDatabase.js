import environment from "@utils/environment";
import mongoose from "mongoose";

const connectToDatabase = async () => {
  // Setting strictQuery to true for backward compatibility
  mongoose.set("strictQuery", true);

  // Check if the connection is already established
  if (mongoose.connection.readyState === 1) {
    console.log("Database is already connected");
    return true;
  }

  try {
    // Connect to the database with options
    await mongoose.connect(environment.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    });

    // Event listener for successful connection
    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });

    return true;
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    throw new Error(error.message || "Something went wrong");
  }
};

// Event listener for connection errors
mongoose.connection.on("error", (err) => {
  console.log("MongoDB connection error:", err);
  throw new Error("MongoDB connection error: " + err.message);
});

export default connectToDatabase;
