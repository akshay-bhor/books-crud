const express = require("express");
const { addNewBook, getAllBooks, getBook, updateBook, deleteBook } = require("../controllers/bookController");
const { bookIdValidator, bookInputValidator } = require("../middlewares/bookValidator");
const router = express.Router();

router.post("/book", bookInputValidator, addNewBook);

router.get("/books", getAllBooks);

router.get("/book/:bookId", bookIdValidator, getBook);

router.patch("/book/:bookId", bookIdValidator, updateBook);

router.delete("/book/:bookId", bookIdValidator, deleteBook);

module.exports = router;
