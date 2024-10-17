// Error handling middleware for Express
export const errorHandler = (err, req, res, next) => {
  // Log the error stack trace to the console for debugging
  console.error(err.stack);

  // Send a JSON response with the error status and message
  res.status(err.status || 500).json({
    status: "error", // Indicate that an error occurred
    message: err.message || "Internal Server Error", // Provide the error message or a default message
  });
};
