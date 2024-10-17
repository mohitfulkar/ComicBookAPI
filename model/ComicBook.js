import mongoose from "mongoose";

// Define the schema for comic books
const comicBookSchema = new mongoose.Schema({
  bookName: { type: String, required: true }, // Name of the comic book
  authorName: { type: String, required: true }, // Author of the comic book
  yearOfPublication: {
    type: Number,
    required: true,
    min: 1900, // Minimum year allowed
    max: new Date().getFullYear(), // Maximum year is the current year
  },
  price: { type: Number, required: true, min: 0 }, // Price of the comic book (must be positive)
  discount: { type: Number, min: 0, max: 100, default: 0 }, // Discount percentage (optional)
  numberOfPages: { type: Number, required: true, min: 1 }, // Total number of pages in the comic book
  condition: { type: String, enum: ["new", "used"], required: true }, // Condition of the comic book
  description: { type: String, optional: true }, // Optional description of the comic book
  createdAt: { type: Date, default: Date.now }, // Timestamp for when the comic book is created
});

// Create the ComicBook model based on the defined schema
export const ComicBook = mongoose.model("ComicBook", comicBookSchema);
