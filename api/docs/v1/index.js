const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
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
    servers: [
      { url: "http://localhost:8080/api/v1", description: "Base server" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js", "./docs/v1/*.yaml"], // Path of files here should be like you are in root dir
};

const specs = swaggerJsDoc(options);

module.exports = specs;
