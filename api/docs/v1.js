
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Expense Tracker API",
      version: "0.0.1",
      description:
        "This is the API docs to be used for developing the Expense Tracker front end app",
      contact: {
        name: "Chris John Mulingbayan",
        email: "chrisjohnmulingbayan@gmail.com",
      },
    },
  },

  apis: []
};

const specs = swaggerJsDoc(options);

module.exports = specs;

