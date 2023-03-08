import request from "supertest";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectDatabase from "../../database/connectDatabase.js";
import User from "../../database/models/User.js";
import statusCodes from "../../server/utils/statusCode.js";
import { app } from "../../server/app.js";
import { type UserCredentials } from "../../server/controllers/usersControllers/types.js";

const { success } = statusCodes;

let mongodbServer: MongoMemoryServer;

beforeAll(async () => {
  mongodbServer = await MongoMemoryServer.create();
  const mongodbServerUrl = mongodbServer.getUri();

  await connectDatabase(mongodbServerUrl);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongodbServer.stop();
});

afterEach(async () => {
  await User.deleteMany();
});

describe("Given a POST '/users/login' endpoint", () => {
  describe("When it receives a request with username: 'Jairo', and password: 'Jairo1020!'", () => {
    test("Then it should respond with a status code 200 and with an object on its body with property 'token'", async () => {
      const loginUrl = "/users/login";
      const mockUser: UserCredentials = {
        username: "Jairo",
        password: "Jairo1020!",
      };

      jwt.sign = jest.fn().mockImplementation(() => ({
        token: "1p2o3i4u5y",
      }));

      const expectedStatus = success.okCode;
      const hashedPassword = await bcrypt.hash(mockUser.password, 8);

      await User.create({
        ...mockUser,
        password: hashedPassword,
        email: "jvidomines@gmail.com",
      });

      const response = await request(app)
        .post(loginUrl)
        .send(mockUser)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("token");
    });
  });
});
