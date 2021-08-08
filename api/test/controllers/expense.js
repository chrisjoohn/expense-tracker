const { server, chai } = require("./setup");
const { expect } = chai;

const ExpenseModel = require("../../models/expense");
const UserModel = require("../../models/user");

const BASE_URL = "/api/v1/expense";

describe("Expense Controller Tests", () => {
  const expenseDetails = {
    title: "Something",
    amount: 10,
  };

  describe("Public Endpoint Tests", () => {
    before(async () => {
      await ExpenseModel.deleteMany({});
    });

    it("[EXPENSE] Should not be able to create expense without a token", async () => {
      const res = await chai
        .request(server)
        .post(BASE_URL + "/")
        .send(expenseDetails);
      expect(res).to.have.status(401);
    });

    it("[EXPENSE] Should not be able to get expenses without a token", async () => {
      const res = await chai.request(server).get(BASE_URL + "/");
      expect(res).to.have.status(401);
    });
  });

  describe("Private Endpoint Tests", () => {
    let ACCESS_TOKEN = ""; // to be used for requesting to API
    let USER_ID = ""; // to be used for querying expenses
    let EXPENSE_ID = ""; // to be used for querying expenses

    const userDetails = {
      firstName: "Test",
      lastName: "User",
      email: "test@email.com",
      password: "p@ssw0rd!",
    };

    before(async () => {
      await UserModel.deleteMany({});
      await new UserModel({ ...userDetails, status: "verified" }).save();
      const res = await chai
        .request(server)
        .post("/api/v1/auth/login")
        .send({ email: userDetails.email, password: userDetails.password });

      const { token, _id } = res.body;
      ACCESS_TOKEN = token;
      USER_ID = _id;
    });

    after(async () => {
      await UserModel.deleteMany({});
    });

    const createExpense = (payload = expenseDetails) => {
      return chai
        .request(server)
        .post(BASE_URL + "/")
        .set("Authorization", "Bearer " + ACCESS_TOKEN)
        .send(payload);
    };

    it("[EXPENSE] Should be able to create expense", async () => {
      const res = await createExpense();
      const { title, amount } = res.body;

      expect(res).to.have.status(200);
      expect(title).to.be.eq(expenseDetails.title);
      expect(amount).to.be.eq(expenseDetails.amount);
      expect(res.body).to.have.property("dateCreated");
      expect(res.body).to.have.property("dateUpdated");

      let createdExpenses = await ExpenseModel.find({
        userId: USER_ID,
      }).exec();

      expect(createdExpenses).to.be.an("array");
      expect(createdExpenses.length).to.be.equal(1);

      // Create another expense;
      await createExpense({ title: "Another expense", amount: 1 });
      createdExpenses = await ExpenseModel.find({
        userId: USER_ID,
      }).exec();

      expect(createdExpenses).to.be.an("array");
      expect(createdExpenses.length).to.be.equal(2);
    });

    it("[EXPENSE] Should not be able to create expense if has missing fields", async () => {
      const res = await createExpense({ amount: null, title: "" });
      expect(res).to.have.status(400);
      expect(res).to.not.haveOwnProperty("title");
      expect(res).to.not.haveOwnProperty("amount");
    });

    it("[EXPENSE] Should be able to GET ALL created expenses", async () => {
      const res = await chai
        .request(server)
        .get(BASE_URL + "/")
        .set("Authorization", "Bearer " + ACCESS_TOKEN);

      const { body: response } = res;

      expect(res).to.have.status(200);
      expect(response).to.be.an("array");
      expect(response.length).to.be.eq(2);
    });

    /**
     * TODO
     * Add test case for Getting all expenses with sorted date
     */

    it("[EXPENSE] Should be able to GET SPECIFIC expense using ID", async () => {
      const createdExpense = await ExpenseModel.findOne({
        userId: USER_ID,
        title: expenseDetails.title,
      });

      const { _id } = createdExpense;
      EXPENSE_ID = _id;

      const res = await chai
        .request(server)
        .get(BASE_URL + `/${_id}`)
        .set("Authorization", `Bearer ${ACCESS_TOKEN}`);

      expect(res).to.have.status(200);
      const {
        body: { title, amount },
      } = res;

      expect(title).to.be.equal(expenseDetails.title);
      expect(amount).to.be.equal(expenseDetails.amount);
    });

    it("[EXPENSE] Should be able to UPDATE SPECIFIC expense using ID", async () => {
      const updatedExpenseDetail = {
        title: "Updated Expense Title",
        amount: 100,
      };

      const res = await chai
        .request(server)
        .patch(BASE_URL + `/${EXPENSE_ID}`)
        .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
        .send(updatedExpenseDetail);

      expect(res).to.have.status(200);
      const {
        body: { title, amount, dateCreated, dateUpdated },
      } = res;

      expect(title).to.be.equal(updatedExpenseDetail.title);
      expect(amount).to.be.equal(updatedExpenseDetail.amount);
      expect(dateCreated).to.not.be.equal(dateUpdated);
    });

    it("[EXPENSE] Should be able to DELETE SPECIFIC expense using ID", async () => {
      const res = await chai
        .request(server)
        .delete(BASE_URL + `/${EXPENSE_ID}`)
        .set("Authorization", `Bearer ${ACCESS_TOKEN}`);

      expect(res).to.have.status(200);

      const deletedExpense = await ExpenseModel.findById(EXPENSE_ID);

      console.log(deletedExpense);
      expect(deletedExpense).to.be.null;
    });
  });
});
