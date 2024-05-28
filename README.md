# Book Cover Fetcher

Book Cover Fetcher is a web application that allows users to manage their book notes and fetch book covers from the Open Library Covers API. Users can add, edit, and delete book entries, and search for book covers by entering a book title.

## Features

- Add new book notes.
- Edit existing book notes.
- Delete book notes.
- Search for a specific book cover by title using the Open Library Covers API.
- Display the book cover image alongside the book details.

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- EJS (Embedded JavaScript Templates)
- Axios
- Body-Parser

## Prerequisites

- Node.js and npm installed on your machine.
- PostgreSQL installed and a database set up.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/book-cover-fetcher.git
   cd book-cover-fetcher
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up the PostgreSQL database:

   - Create a PostgreSQL database named `books`.
   - Create a table `books` with the following schema:

     ```sql
     CREATE TABLE books (
       id SERIAL PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       author VARCHAR(255) NOT NULL,
       date_read DATE,
       rating INTEGER,
       description TEXT
     );
     ```

4. Configure the PostgreSQL connection in the `index.js` file:

   ```javascript
   const db = new pg.Client({
       user: "postgres",
       host: "localhost",
       database: "books",
       password: "ballislife",
       port: 5432,
   });
   ```

## Running the Application

1. Start the server:

   ```bash
   node index.js
   ```

2. Open your web browser and go to `http://localhost:3000`.

## Project Structure

- `index.js`: Main server file that handles routes and database connections.
- `views/add.ejs`: Template for adding and editing book notes.
- `views/index.ejs`: Template for displaying book notes and searching for book covers.
- `public/styles/main.css`: Stylesheet for the application.

## API Routes

- `GET /`: Home page displaying all book notes.
- `GET /edit/:bookId`: Page to edit a specific book note.
- `GET /new`: Page to create a new book note.
- `POST /submit`: Route to submit a new book note.
- `POST /edit/:bookId`: Route to update an existing book note.
- `POST /delete`: Route to delete a book note.
- `POST /search`: Route to search for a book cover by title.

## Example Usage

1. Add a new book note by clicking the "Add Book" button and filling out the form.
2. Edit an existing book note by clicking the "Edit Book" button next to a book entry.
3. Delete a book note by clicking the "Delete Book" button next to a book entry.
4. Search for a book cover by clicking the "Fetch Cover" button next to a book entry.

## Acknowledgments

- Open Library Covers API for providing book cover images.
- Bootstrap for styling the application.
```

This `README.md` file provides an overview of the project, installation instructions, usage examples, and other relevant information to help users get started with your Book Cover Fetcher application.
```
## Video Walkthrough

Here's a walkthrough of Book Notes!



https://github.com/jojoh45/Book-Notes/assets/111920942/1bb54cf8-e3f1-4666-a53a-4d414ecf0e5b




