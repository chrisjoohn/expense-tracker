process.env.TEST_ENV = "enabled";
process.env.API_PORT = 8081;
process.env.DB_NAME = "expense_tracker_db_test";
process.env.SENDGRID_API_KEY = "";

const chaiHttp = require("chai-http");
const chai = require("chai");
const { expect, assert, should } = chai;
const server = require("../../server");

const UserModel = require("../../models/user");
const VerifyCodeModel = require("../../models/verifyCode");

const BASE_URL = "/api/v1/auth";

chai.use(chaiHttp);

const API = {
  post: (url, payload, cb) =>
    chai.request(server).post(url).send(payload).end(cb),
  get: (url, cb) => chai.request(server).get(url).end(cb),
};

describe("Auth Controller Unit Tests", () => {
  const userDetails = {
    firstName: "Test",
    lastName: "User",
    email: "test@email.com",
    password: "p@ssw0rd!",
  };

  describe("Public Endpoint Tests", () => {
    before(async () => {
      await UserModel.deleteMany({});
      await VerifyCodeModel.deleteMany({});
    });

    after(async () => {
      await UserModel.deleteMany({});
      await VerifyCodeModel.deleteMany({});
    });

    it("[REGISTER] User should be able to register", (done) => {
      API.post(BASE_URL + "/register", userDetails, (err, res) => {
        expect(err).to.be.null;
        const { _id, firstName, lastName, email, status } = res.body;

        expect(res).to.have.status(200);

        expect(res.body).to.not.have.property("password");
        expect(status).to.be.equal("pending");
        expect(firstName).to.be.equal(userDetails.firstName);
        expect(lastName).to.be.equal(userDetails.lastName);
        expect(email).to.be.equal(userDetails.email);

        // New verification code should be created for newly registered users
        VerifyCodeModel.findOne({ userId: _id }, (err, verifyCode) => {
          expect(err).to.be.null;
          expect(verifyCode).has.property("dateCreated");
          expect(verifyCode).has.property("userId");
          expect(verifyCode).has.property("code");

          done();
        });
      });
    });

    it("[REGISTER] Should not be able to register user with same email", (done) => {
      API.post(BASE_URL + "/register", userDetails, (err, res) => {
        expect(res).to.have.status(400);
        done();
      });
    });

    it("[REGISTER] User should NOT be able to login with incomplete fields", (done) => {
      API.post(
        BASE_URL + "/register",
        { firstName: "", lastName: "", email: "", password: "" },
        (err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.haveOwnProperty("errors");

          /*
           * TODO
           * - Add meaningful res.body
           */

          done();
        }
      );
    });

    it("[LOGIN] User should be able to login", (done) => {
      const payload = {
        email: userDetails.email,
        password: userDetails.password,
      };

      API.post(BASE_URL + "/login", payload, (err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("id");
        expect(res.body).to.have.property("token");

        done();
      });
    });

    it("[LOGIN] User should not be able to login if has invalid credentials", (done) => {
      const payload = {
        email: userDetails.email,
        password: "wrong_password",
      };

      API.post(BASE_URL + "/login", payload, (err, res) => {
        expect(res.body).to.not.haveOwnProperty("token");
        expect(res.body).to.not.haveOwnProperty("id");
        expect(res).to.have.status(401);

        done();
      });
    });

    it("[VERIFICATION-EMAIL] User should be able to re-send verification email", (done) => {
      API.post(
        BASE_URL + "/resend-verify-email",
        { email: userDetails.email },
        (err, res) => {
          expect(res).has.status(200);
          done();
        }
      );
    });

    it("[VERIFICATION-EMAIL] Should be able to verify user from verification link", async () => {
      const { _id: userId } = await UserModel.findOne({
        email: userDetails.email,
      }).exec();

      const { code: verifyCode } = await VerifyCodeModel.findOne({ userId });

      API.get(BASE_URL + `/${userId}/${verifyCode}`, async (err, res) => {
        expect(res).has.statu(200);
        const { status } = await UserModel.findById(userId);
        expect(status).to.be.equal("verified");
      });
    });

    it("[ME] Should not be able to get user details if token is not existing", (done) => {
      API.get(BASE_URL + "/me", (err, res) => {
        expect(res).has.status(401);
        done();
      });
    });
  });

  describe("Private Endpoint Tests", () => {
    let ACCESS_TOKEN = "";

    before(async () => {
      await UserModel.deleteMany({});
      await new UserModel({ ...userDetails, status: "verified" }).save();

      const res = await chai
        .request(server)
        .post(BASE_URL + "/login")
        .send({
          email: userDetails.email,
          password: userDetails.password,
        });

      ACCESS_TOKEN = res.body.token;
    });

    it("[ME] Should be able to get user details", async () => {
      chai
        .request(server)
        .get(BASE_URL + "/me")
        .set("Authorization", "Bearer " + ACCESS_TOKEN)
        .end((err, res) => {
          expect(res).has.status(200);
          expect(res.body).does.not.have.property("password");

          const { firstName, lastName, email, status } = res.body;

          expect(firstName).to.be.equal(userDetails.firstName);
          expect(lastName).to.be.equal(userDetails.lastName);
          expect(email).to.be.equal(userDetails.email);
          expect(status).to.be.equal("verified");
        });
    });
  });
});
