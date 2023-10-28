// const request = require("supertest");
// const app = require("../app");

// describe("login controller", () => {
//   it("should return a 200 status and a token", async () => {
//     const response = await request(app)
//       .post("/users/login")
//       .send({ email: "test.qwerty@gmail.com", password: "testqwerty" });

//     expect(response.status).toBe(200);

//     expect(response.body).toHaveProperty("token");
//   });

//   it("should return a user object with email and subscription", async () => {
//     const response = await request(app)
//       .post("/users/login")
//       .send({ email: "test.qwerty@gmail.com", password: "testqwerty" });

//     expect(response.body).toHaveProperty("user");

//     expect(response.body.user).toHaveProperty("email");

//     expect(typeof response.body.user.email).toBe("string");

//     expect(response.body.user).toHaveProperty("subscription");

//     expect(typeof response.body.user.subscription).toBe("string");
//   });
// });
