import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import connectDatabase from "../../../database/connectDatabase.js";
import { app } from "../../app.js";
import statusCodes from "../../utils/statusCode.js";
import Project from "../../../database/models/Projects/Projects.js";

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
  await Project.deleteMany();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Given a GET '/projects' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a status code 200", async () => {
      const expectedStatus = success.okCode;
      const projectsUrl = "/projects";

      await request(app).get(projectsUrl).expect(expectedStatus);
    });
  });
});
