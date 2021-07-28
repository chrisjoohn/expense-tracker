const express = require("express");
const cors = require("cors");

const routes = require("./routes");
const passport = require("./config/passport");

const app = express();

require("./config/db");

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use("/api/v1", routes);

const PORT = process.env.API_PORT || 8080;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}...`));
