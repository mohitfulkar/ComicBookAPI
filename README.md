# Comic Book Management API

## Overview

This API allows you to manage comic book data, including adding, updating, retrieving, and deleting comic books from a MongoDB database. It is built using Node.js, Express, and Mongoose.

## Features

- Add new comic books
- Update existing comic book details
- Delete comic books by ID
- Retrieve a list of comic books with filtering and pagination
- Fetch a specific comic book by its ID
- Input validation using Joi

## Technologies Used

- **Node.js**: JavaScript runtime for building scalable network applications
- **Express**: Web framework for Node.js
- **Mongoose**: ODM for MongoDB and Node.js
- **Joi**: Validation library for JavaScript objects
- **MongoDB**: NoSQL database for storing comic book data

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or cloud instance)
- Postman (for testing the API)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mohitfulkar/ComicBookAPI.git

   ```

2. Install node dependies

   ```bash
   npm install

   ```

3. Create a .env file in the root directory and add your MongoDB connection string
   MONGODB_URL
   PORT=3000
4. Start the server
    ```bash 
    npm start


### Example requests

1. POST /api/comics
   Content-Type: application/json

{
"bookName": "The Amazing Spider-Man",
"authorName": "Stan Lee",
"yearOfPublication": 1962,
"price": 15.99,
"discount": 10,
"numberOfPages": 32,
"condition": "new",
"description": "A superhero comic book featuring Spider-Man."
}

2. GET /api/comics/:id

3. PUT /api/comics/:id
   Content-Type: application/json

{
"price": 12.99
}

4. DELETE /api/comics/:id

### Error Handling

1. The API responds with appropriate error messages and status codes. For example:
2. 400 Bad Request for validation errors
3. 404 Not Found if a comic book is not found
4. 500 Internal Server Error for server-related issues

### Testing the API

You can use Postman to test the API endpoints. Import the provided Postman collection for quick access to the endpoints.
