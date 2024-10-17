import { ComicBook } from "../model/ComicBook.js"; // Import the ComicBook model

const addBook = async (req, res) => {
  // Function to add a new comic book to the database

  try {
    const existingComic = await ComicBook.findOne({
      bookName: req.body.bookName,
      authorName: req.body.authorName,
    });

    if (existingComic) {
      // If it exists, respond with a conflict status
      return res.status(409).json({
        error: "Comic book already exists!",
        comic: existingComic,
      });
    }
    const newComic = new ComicBook(req.body); // Create a new comic book instance with the request body

    await newComic.save(); // Save the new comic book to the database
    res
      .status(201)
      .json({ message: "Comic book added successfully!", comic: newComic }); // Respond with success message and the added comic
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to add comic book", details: err.message }); // Handle errors and respond with failure message
  }
};

// Function to update an existing comic book by its ID
const updateComic = async (req, res) => {
  const { id } = req.params; // Get the ID from the request parameters
  const updateFields = req.body; // Get the updated fields from the request body

  try {
    // Find the comic book by ID and update it with the provided fields
    const updatedComic = await ComicBook.findByIdAndUpdate(id, updateFields, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation for the updated fields
    });

    // If no comic book is found, send a 404 response
    if (!updatedComic) {
      return res.status(404).json({ message: "Comic not found" });
    }

    // Send the updated comic back in the response
    res.status(200).json(updatedComic);
  } catch (err) {
    console.error("Error updating comic:", err); // Log the error for debugging
    res.status(500).json({ message: err.message }); // Respond with error message
  }
};

// Function to delete a comic book by its ID
const deleteBookById = async (req, res) => {
  const { id } = req.params; // Get the ID from the request parameters

  try {
    const deletedBook = await ComicBook.findByIdAndDelete(id); // Delete the comic book by ID

    // If no comic book is found, send a 404 response
    if (!deletedBook) {
      return res.status(404).json({ message: "Comic not found" });
    }

    // Respond with a success message
    return res.status(200).json({ message: "Comic deleted successfully" });
  } catch (err) {
    console.log("Error deleting the book", err); // Log the error for debugging
    return res.status(500).json({ message: err.message }); // Respond with error message
  }
};

// Function to retrieve the inventory list of comic books with pagination, filtering, and sorting
const getInventoryList = async (req, res) => {
  const {
    page = 1, // Default to the first page
    limit = 10, // Default to 10 items per page
    author, // Filter by author if provided
    year, // Filter by year if provided
    price, // Filter by price if provided
    condition, // Filter by condition if provided
    sortBy = "bookName", // Default sort by book name
    order = "asc", // Default order is ascending
  } = req.query;

  const filter = {}; // Initialize the filter object

  // Apply filters based on query parameters
  if (author) filter.author = author;
  if (year) filter.year = year;
  if (price) filter.price = price;
  if (condition) filter.condition = condition;

  // Determine sorting order
  const sortOrder = order === "desc" ? -1 : 1;
  const sortOptions = { [sortBy]: sortOrder }; // Set sorting options

  try {
    // Find comics with filters, sort, paginate, and limit results
    const comics = await ComicBook.find(filter)
      .sort(sortOptions)
      .skip((page - 1) * limit) // Skip records for pagination
      .limit(parseInt(limit)); // Limit the number of records returned

    // Get total count of comics for pagination
    const total = await ComicBook.countDocuments(filter);

    // Respond with total pages, current page, total items, and the list of comics
    res.status(200).json({
      totalPages: Math.ceil(total / limit), // Calculate total pages
      currentPage: page,
      totalItems: total,
      comics,
    });
  } catch (err) {
    console.error("Error fetching inventory", err); // Log the error for debugging
    res.status(500).json({ message: "Error retrieving inventory" }); // Respond with error message
  }
};

// Function to get the details of a specific comic book by its ID
const getComicBookById = async (req, res) => {
  const { id } = req.params; // Get the ID from the request parameters

  try {
    const comic = await ComicBook.findById(id); // Find the comic book by ID

    // If no comic book is found, send a 404 response
    if (!comic) {
      return res.status(404).json({ message: "Comic not found" });
    }

    // Respond with the comic book details
    res.status(200).json(comic);
  } catch (err) {
    console.error("Error fetching comic book by ID", err); // Log the error for debugging
    res.status(500).json({ message: "Error retrieving comic book" }); // Respond with error message
  }
};

// Export the functions to be used in routes
export {
  addBook,
  updateComic,
  deleteBookById,
  getInventoryList,
  getComicBookById,
};
