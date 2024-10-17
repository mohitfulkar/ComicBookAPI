import express from "express"; // Import the express library
const router = express.Router(); // Create an instance of the router for handling routes

import {
  addBook,
  updateComic,
  deleteBookById,
  getInventoryList,
  getComicBookById,
} from "../controller/bookController.js";

import { validateComicBook } from "../middlewares/validateComicBook.js";


router.post("/comics", validateComicBook, addBook); // Route to add a new comic book

router.put("/comics/:id", validateComicBook, updateComic); // Route to update an existing comic book by its ID

router.delete("/comics/:id", deleteBookById); // Route to delete a comic book by its ID

router.get("/comics", getInventoryList); // Route to get the inventory list with filter and sorting options of all comic books


router.get("/comics/:id", getComicBookById); // Route to get the details of a specific comic book by its ID

export default router; // Export the router to use in other parts of the application

