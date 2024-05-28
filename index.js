import bodyParser from "body-parser";
import express from "express";
import pg from "pg";
import axios from "axios";

const app = express();
const port = 3000;
//const API_URL = "https://openlibrary.org/search.json?title="

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


//Connect to the databse
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "books",
    password: "ballislife",
    port: 5432,
});

db.connect();

// This shows how the data is being stored in the database
let entry = [{
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    date_read: '2022-6-23',
    rating: 5,
    description: "This book was great and it taught me how to create good habits and how they can create compounding success"
}];

// To get the book data from the api
async function fetchBookData(title) {
    const response = await axios.get(`https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`);
    const data = response.data;
    //console.log(data);
    return data.docs[0];
};


// Function to get the specific book cover
function getCoverUrl(coverId, size = 'S') {
    return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
};


// Route to get the home page
app.get("/", async (req, res) => {

    try {
        const result = await db.query("SELECT id, title, author, TO_CHAR(date_read, 'YYYY-MM-DD') as date_read, rating, description FROM books ORDER by id ASC");
        const entry = result.rows;
        //console.log("-------------------------------");
        //console.log(entry);

        res.render("index.ejs", {
            books: entry,
        });
    } catch(err) {
        console.log(err);
    }
});


// Route to render the edit book note page for a specific book note
app.get("/edit/:bookId", async (req, res) => {
    const bookId = req.params.bookId;

    try {
        const result = await db.query("SELECT * FROM books WHERE id = $1",[bookId]);
        entry = result.rows[0];
        //console.log(entry);
        res.render("add.ejs", { books : entry , heading: "Edit Book Note", submit: "Update Book Note"});
    } catch(err) {
        console.log(err);
        res.render("/");
    }
});


// Route to render the create a book note page
app.get("/new", (req,res) => {
    res.render("add.ejs", { heading: "New Book Note", submit: "Create Book Note"});
})


// Route to submit a new book note
app.post("/submit", async (req, res) => {
    const updatedTitle = req.body["title"];
    const updatedAuthor = req.body["author"];
    const updatedDateRead = req.body["date_read"];
    const updatedRating = req.body["rating"];
    const updatedDesc = req.body["description"];

    try {
        await db.query("INSERT INTO books (title, author, date_read, rating, description) VALUES  ($1, $2, $3, $4, $5)", [updatedTitle, updatedAuthor, updatedDateRead, updatedRating, updatedDesc]);
        res.redirect("/");
    }catch (err) {
        console.log(err);
    }
});



// Route to handle editing a book note
app.post("/edit/:bookId", async (req, res) => {
    const bookId = req.params.bookId;
    const updatedTitle = req.body["title"];
    const updatedAuthor = req.body["author"];
    const updatedDateRead = req.body["date_read"];
    const updatedRating = req.body["rating"];
    const updatedDesc = req.body["description"];

    try {
        await db.query("UPDATE books SET title = $1, author = $2, date_read = $3, rating = $4, description = $5 WHERE id = $6",
        [updatedTitle, updatedAuthor, updatedDateRead, updatedRating, updatedDesc, bookId]);
        res.redirect("/");
    } catch (err) {
        console.log(err);
    }
});

// Route to delete a book note
app.post("/delete", async (req, res) => {
    const id = req.body.deleteBookId;
    //console.log(id);

    try {
        await db.query("DELETE FROM books WHERE id = $1", [id]);
        res.redirect("/");
    }catch (err) {
        console.log(err);
    }
});

// Route to search for a book cover
app.post("/search", async (req, res) => {
    const title = req.body.searchTitle;

    try {
        // Fetch book data from Open Library API
        const bookData = await fetchBookData(title);
        let coverUrl = null;

        if (bookData && bookData.cover_i) {
            coverUrl = getCoverUrl(bookData.cover_i);
        }

        // Fetch the books data from the database
        const result = await db.query("SELECT id, title, author, TO_CHAR(date_read, 'YYYY-MM-DD') as date_read, rating, description FROM books ORDER by id ASC");
        const books = result.rows;

        // Render the index.ejs file with books data and the cover URL
        res.render("index.ejs", {
            books: books,
            coverUrl: coverUrl,
            searchedTitle: title,
        });
    } catch (err) {
        console.log(err);
        res.redirect("/");
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});