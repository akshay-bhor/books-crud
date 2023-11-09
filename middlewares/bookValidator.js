const { check, validationResult } = require("express-validator");
const Books = require("../models/books");

const bookIdValidator = async (req, res, next) => {
    try {
        const bookId = req.params.bookId;

        const bookExists = await Books.findOne({ _id: bookId })

        if(!bookExists) {
            const err = new Error("Not Found")
            err.statusCode = 404;
            throw err
        }

        next()
    } catch (err) {
        next(err);
    }
}

const bookInputValidator = async (req, res, next) => {
    try {
    
        await check("title")
          .exists()
          .trim()
          .isString()
          .isLength({ min: 1 })
          .withMessage("Minimum title length is 1!")
          .run(req);

        await check("author")
          .exists()
          .trim()
          .isString()
          .isLength({ min: 1})
          .withMessage("Minimum author name length is 1!")
          .run(req);

        await check("author")
          .exists()
          .trim()
          .isString()
          .isLength({ min: 10 })
          .withMessage("Minimum summary length is 10!")
          .run(req);
    
    
        const errs = validationResult(req);
        if (!errs.isEmpty()) {
          const err = new Error("Validation Error!");
          err.statusCode = 400;
          err.data = errs.array();
          throw err;
        }
    
        next()
    
      } catch (err) {
        next(err);
      }
}

module.exports = {
    bookIdValidator, bookInputValidator
}