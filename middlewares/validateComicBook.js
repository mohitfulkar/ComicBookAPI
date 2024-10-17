import { comicBookValidationSchema } from "../validation/comicBookValidation.js";

// Middleware to validate comic book data in requests
export const validateComicBook = (req, res, next) => {
  // Validate the request body against the defined Joi schema
  const { error } = comicBookValidationSchema.validate(req.body);

  // If validation fails, send a 400 Bad Request response
  if (error) {
    return res.status(400).json({
      status: "error", // Indicate that an error occurred
      message: error.details[0].message, // Provide a meaningful error message
    });
  }

  // If validation passes, proceed to the next middleware/route handler
  next();
};
