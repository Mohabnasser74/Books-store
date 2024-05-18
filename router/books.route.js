const express = require("express");
const {
  getBooks,
  addBook,
  getOneBook,
  updateOneBook,
  deleteOneBook,
} = require("../controllers/books.controllers");

const booksRouter = express.Router();

booksRouter.route("/").get(getBooks).post(addBook);

booksRouter
.route("/:id")
.get(getOneBook)
.put(updateOneBook)
.delete(deleteOneBook);

module.exports = booksRouter;
