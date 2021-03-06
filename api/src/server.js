const express = require("express");
const cors = require("cors");

const routes = require("./routes");
const passport = require("./config/passport");

// for Swagger docs
const v1Docs = require("./docs/v1");

const swaggerUi = require("swagger-ui-express");

const app = express();

const envFilePath =
  process.env.NODE_ENV === "development" ? ".env" : ".env.prod";

require("dotenv").config({ path: envFilePath });
require("./config/db");

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use("/api/v1", routes);

app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(v1Docs));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}...`));

module.exports = app; // To be used for unit testing
