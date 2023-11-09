const Books = require("../models/books")

const getAllBooks = async (req, res, next) => {
    try {
        let books = await Books.find({}).lean();

        res.status(200).json(books)

    } catch(err) {
        next(err)
    }
}

const addNewBook = async (req, res, next) => {
    try {
        const title = req.body.title;
        const author = req.body.author;
        const summary = req.body.summary

        await Books.create({
            title,
            author,
            summary
        })

        res.status(201).json({ message: "Book added successfully" })
    } catch(err) {
        next(err)
    }
}

const getBook = async (req, res, next) => {
    try {
        const bookId = req.params.bookId;

        const book = await Books.findOne({ _id: bookId })

        res.status(200).json(book)
    } catch(err) {
        next(err)
    }
}

const updateBook = async (req, res, next) => {
    try {
        const bookId = req.params.bookId;
        const title = req.body.title;
        const author = req.body.author;
        const summary = req.body.summary

        const updateSchema = {}
        if(title) updateSchema.title = title
        if(author) updateSchema.author = author
        if(summary) updateSchema.summary = summary

        await Books.updateOne({ _id: bookId }, updateSchema)

        res.status(200).json({ message: "Book updated successfully" })
    } catch(err) {
        next(err)
    }
}

const deleteBook = async (req, res, next) => {
    try {
        const bookId = req.params.bookId;

        await Books.deleteOne({ _id: bookId })

        res.status(200).json({ message: "Book deleted successfully" })
    } catch(err) {
        next(err)
    }
}

module.exports = {
    getAllBooks, addNewBook, getBook, updateBook, deleteBook
}