const Book = require("../models/books.model");
const asyncWrapper = require("../middleware/asyncWrapper");
const { SUCCESS, FAIL } = require("../models/books.model");

const getBooks = asyncWrapper(async (req, res) => {
  const books = await Book.find({}, { __v: false });
  res.status(200).json({
    status: SUCCESS,
    code: 200,
    count: books.length,
    data: {
      books,
    },
  });
});

const addBook = asyncWrapper(async (req, res, next) => {
  const { title, author, publishYear } = req.body;
  if (!title || !author || !publishYear) {
    return next({
      status: FAIL,
      statusCode: 400,
      message: "All fields are required",
    });
  }

  const newBook = new Book({
    title,
    author,
    publishYear,
    createdAt: Date.now(),
  });



  await newBook.save();
  res.status(201).json({
    status: SUCCESS,
    code: 201,
    message: "Book Created Successfully",
  });
});

const getOneBook = asyncWrapper(async (req, res, next) => {
  const book = await Book.findById(req.params.id, { __v: false });

  if (!book) {
    return next({
      status: FAIL,
      code: 404,
      message: "Book not found",
    });
  }

  return res.status(200).json({
    status: SUCCESS,
    code: 200,
    data: {
      book,
    },
  });
});

const updateOneBook = asyncWrapper(async (req, res, next) => {
  const { title, author, publishYear } = req.body;

  if (!title || !author || !publishYear) {
    return next({
      status: FAIL,
      statusCode: 400,
      message: "All fields are required",
    });
  }

  const book = await Book.findByIdAndUpdate(req.params.id, {
    $set: { ...req.body },
    updatedAt: new Date(),
  });

  if (!book) {
    return next({
      status: FAIL,
      code: 204,
      message: "No Conten",
    });
  }

  return res.status(200).json({
    status: SUCCESS,
    code: 201,
    message: "Book Updated Successfully"
  });
});

const deleteOneBook = asyncWrapper(async (req, res, next) => {
  const book = await Book.findByIdAndDelete(req.params.id);

  if (!book) {
    return next({
      status: FAIL,
      code: 204,
      message: "No Conten",
    });
  }

  return res.status(200).json({
    status: SUCCESS,
    code: 200,
    data: null,
    message: "Book Deleted Successfully",
  });
});

module.exports = {
  getBooks,
  addBook,
  getOneBook,
  updateOneBook,
  deleteOneBook,
};
