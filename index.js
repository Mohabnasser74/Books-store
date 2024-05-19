const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const booksRouter = require("./router/books.route.js");
const customCors = require("./middleware/cors.js");
const { ERROR } = require("./models/books.model");

const app = express();

app.get("/", (_, res) => {
  res.json({
    status: "success",
    code: 200,
    data: null,
    message: "Welcome to my API",
  });
});

// UEE MIDDLEWARE:_
app.use(customCors);
app.use(express.json());
app.use("/books", booksRouter);

// global error handler
app.use((error, req, res, next) => {
  res.status(error.code || 500).json({
    status: error.status || ERROR,
    message: error.message,
    code: error.code || 500,
    data: null,
  });
});

// global middleware for not found router
app.all("*", (_, res) => {
  res.status(404).json({
    status: ERROR,
    code: 404,
    data: null,
    message: "Page not found",
  });
});

// DB
async function main() {
  await mongoose.connect(process.env.URI_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 10, // Example pool size
  });
  console.log("mongoose was started");
  app.listen(process.env.PORT, () => {
    console.log(`App is listening to port: ${process.env.PORT}`);
  });
}

main().catch((err) => console.log(err));
