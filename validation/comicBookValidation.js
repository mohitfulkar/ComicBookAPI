import Joi from "joi";

// Define the validation schema for comic books using Joi
export const comicBookValidationSchema = Joi.object({
  bookName: Joi.string().required(), // Name of the comic book (required)
  authorName: Joi.string().required(), // Author of the comic book (required)
  yearOfPublication: Joi.number()
    .integer() // Year must be an integer
    .min(1900) // Minimum year of publication
    .max(new Date().getFullYear()) // Maximum year of publication is the current year
    .required(), // Year of publication is required
  price: Joi.number().positive().required(), // Price must be a positive number (required)
  discount: Joi.number().min(0).max(100).optional(), // Optional discount percentage (0-100)
  numberOfPages: Joi.number()
    .integer() // Number of pages must be an integer
    .positive() // Must be a positive number
    .required(), // Number of pages is required
  condition: Joi.string()
    .valid("new", "used") // Condition must be either 'new' or 'used'
    .required(), // Condition is required
  description: Joi.string().optional(), // Optional description of the comic book
  // Note: No createdAt field in validation as it's handled by Mongoose
});
