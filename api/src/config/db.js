const mongoose = require("mongoose");

const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_PORT = process.env.DB_PORT;

const DB_URI =
  process.env.NODE_ENV === "development"
    ? `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`
    : `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@expenstracker.znmn0.mongodb.net/${DB_NAME}`;

mongoose.connect(DB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.log("ERROR in database connection!");
  throw err;
});

db.on("connected", function () {
  console.log("Connected to database!");
});

module.exports = db;
