require("dotenv").config();
const mongoose = require("mongoose");
const testRequest = require("supertest");
const app = require("../app");
const { User } = require("../models");
const { testUser, fakeUser } = require("./testUser");

const { DB_TEST_HOST } = process.env;

describe("userAuth test", () => {
  beforeAll(async () => {
    await mongoose
      .connect(DB_TEST_HOST)
      .then(() => console.log("DB has been connected"))
      .catch((err) => console.log(err));

    await User.deleteMany({});
  }, 10000);

  it("should registrate new user", async () => {
    const response = await testRequest(app)
      .post("/users/register")
      .send(testUser);

    expect(response.statusCode).toBe(201);

    expect(response.body.user.email).toBe(testUser.email);

    expect(response.body.user.subscription).toBe("starter");
  });

  it("shouldn't registrate the same user 2 times", async () => {
    const response = await testRequest(app)
      .post("/users/register")
      .send(testUser);

    expect(response.statusCode).toBe(409);
  });

  it("login user", async () => {
    const response = await testRequest(app).post("/users/login").send(testUser);

    expect(response.statusCode).toBe(200);

    expect(response.body.token).toMatch(
      /^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$/
    );

    expect(response.body).toHaveProperty("user");

    expect(response.body.user).toHaveProperty("email");

    expect(typeof response.body.user.email).toBe("string");

    expect(response.body.user).toHaveProperty("subscription");

    expect(typeof response.body.user.subscription).toBe("string");
  });

  it("shouldn't login unregistered user", async () => {
    const response = await testRequest(app).post("/users/login").send(fakeUser);

    expect(response.statusCode).toBe(401);
  });

  afterAll(async () => {
    await mongoose
      .disconnect()
      .then(() => console.log("DB has been disconnected"))
      .catch((err) => console.log(err));
  });
});
