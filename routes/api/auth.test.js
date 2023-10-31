const mongoose = require("mongoose");
const app = require("../../app");
const request = require("supertest");

const { DB_HOST_TEST, PORT = 3000 } = process.env;

describe("Authentication API", () => {
  let server = null;

  beforeAll(async () => {
    await mongoose.connect(DB_HOST_TEST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    server.close();
  });

  describe("Signup", () => {
    it("should sign up a user", async () => {
      const userCredentials = {
        email: "test@example.com",
        password: "testPassword",
      };

      const { statusCode, body } = await request(server)
        .post("/api/auth/signup")
        .send(userCredentials);

      expect(statusCode).toBe(201);

      const { user } = body;
      expect(user).toHaveProperty("email");
      expect(user).toHaveProperty("subscription");
      expect(user).toHaveProperty("avatar");

      expect(typeof user.email).toBe("string");
      expect(typeof user.subscription).toBe("string");
      expect(typeof user.avatar).toBe("string");
    });
  });

  describe("Signin", () => {
    it("should sign in a user", async () => {
      const userCredentials = {
        email: "test@example.com",
        password: "testPassword",
      };

      const { statusCode, body } = await request(server)
        .post("/api/auth/signin")
        .send(userCredentials);

      expect(statusCode).toBe(200);

      const { token, user } = body;
      expect(token).toBeTruthy();
      expect(user).toHaveProperty("email");
      expect(user).toHaveProperty("subscription");

      expect(typeof token).toBe("string");
      expect(typeof user.email).toBe("string");
      expect(typeof user.subscription).toBe("string");
    });

    it("should return 401 for incorrect credentials", async () => {
      const invalidCredentials = {
        email: "nonexistent@example.com",
        password: "wrongPassword",
      };

      const response = await request(server)
        .post("/api/auth/signin")
        .send(invalidCredentials);

      expect(response.status).toBe(401);
    });
  });
});
