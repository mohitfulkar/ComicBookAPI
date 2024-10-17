import dotenv from "dotenv"; // Import the dotenv package to load environment variables
import mongoose from "mongoose"; // Import mongoose for MongoDB interactions
dotenv.config(); // Load environment variables from .env file

// Log the MongoDB URL for debugging purposes
console.log("MongoDB URL:", process.env.MONGODB_URL);

const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the URL from environment variables
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`); // Log successful connection message
  } catch (err) {
    // If there is an error, log the error message
    console.error(`Error: ${err.message}`);
    process.exit(1); // Exit the process with a failure code
  }
};

// Export the connectDB function for use in other parts of the application
export { connectDB };
