process.env.TEST_ENV = "enabled";
process.env.API_PORT = 8081;
process.env.DB_NAME = "expense_tracker_db_test";
process.env.SENDGRID_API_KEY = "";

const chaiHttp = require("chai-http");
const chai = require("chai");
const server = require("../../server");

chai.use(chaiHttp);

module.exports = {
  server,
  chai,
};
