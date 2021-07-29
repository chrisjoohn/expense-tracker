const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    info: {
      title: "Expense Tracker API",
      version: "1.0.0",
      description:
        "This is the API docs to be used for developing the Expense Tracker front end app",
      contact: {
        name: "Developer",
        email: "chrisjohnmulingbayan@gmail.com",
      },
    },
  },
  apis: ["./routes/*.js"], // Path of files here should be like you are in root dir
};

const specs = swaggerJsDoc(options);

module.exports = specs;
