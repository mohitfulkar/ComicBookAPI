import express from "express"; // Import Express framework for building web applications
import bodyParser from "body-parser"; // Import body-parser middleware to parse incoming request bodies
import { connectDB } from "./db.js"; // Import the connectDB function to connect to MongoDB
import bookRoutes from "./routes/bookRoutes.js"; // Import book-related routes
import { errorHandler } from "./middlewares/errorHandler.js"; // Import error handling middleware

const app = express(); // Create an instance of an Express application


app.use(bodyParser.json()); // Middleware to parse JSON request bodies

connectDB(); // Connect to the MongoDB database

app.use("/api", bookRoutes); // Define API routes for the application

app.use(errorHandler); // Use the error handler middleware to catch errors

const PORT = process.env.PORT || 3000; // Set the port for the server to listen on


// Start the server and log a message indicating the running port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
