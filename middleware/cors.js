module.exports = (_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://books-store-api-8uzz.onrender.com");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization "
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, PUT, PATCH"
  );
  res.setHeader("Content-Type", "application/json");
  next();
};
