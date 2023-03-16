import { type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import Project from "../../../database/models/Projects/Projects.js";
import {
  type ProjectsData,
  type ProjectData,
} from "../../types/projects/types";
import { type CustomRequest } from "../../types/users/types.js";
import statusCodes from "../../utils/statusCode";
import {
  deleteProjects,
  getAllProjects,
  getUserProjects,
} from "./projectsControllers";

const mockProjectAndroid: ProjectData = {
  name: "Anyone",
  website: "www.anyone.com",
  twitter: "@anyone",
  platforms: "Android",
  monthlyUsers: "1000",
  avatar: "avatar.webp",
  shortDescription: "This is a short description",
  description: "This is a description",
  id: "",
  maker: "",
};

const mockProjectIos: ProjectData = {
  name: "Anyone",
  website: "www.anyone.com",
  twitter: "@anyone",
  platforms: "IOS",
  monthlyUsers: "1000",
  avatar: "avatar.webp",
  shortDescription: "This is a short description",
  description: "This is a description",
  id: "",
  maker: "",
};

const mockProjectsList: ProjectsData = [mockProjectAndroid, mockProjectIos];

beforeEach(() => jest.resetAllMocks());

describe("Given a getProjects controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call its status code 200", async () => {
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(mockProjectsList),
      };

      const req: Partial<Request> = {};
      const next = jest.fn();
      const expectedStatusCode = statusCodes.success.okCode;

      Project.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue(mockProjectsList),
      }));

      await getAllProjects(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });

  describe("When it receives a bad request", () => {
    test("Then it should call its next method", async () => {
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue({}),
      };

      const req: Partial<Request> = {};
      const next = jest.fn();

      const expectedError = new CustomError(
        "Bad request",
        statusCodes.clientError.badRequest,
        "Couldn't find projects"
      );

      req.body = {};

      Project.find = jest.fn().mockReturnValue(undefined);

      await getAllProjects(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given a getUserProjects controller", () => {
  describe("When it receives a response", () => {
    test("then it should call its status code 200", async () => {
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(mockProjectsList),
      };

      const req: Partial<Request> = {};
      const next = jest.fn();
      const expectedStatusCode = statusCodes.success.okCode;
      req.params = { maker: "1029384756" };

      Project.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue({ maker: "0192837465" }),
      }));

      await getUserProjects(req as CustomRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });

  describe("When it receives a bad request", () => {
    test("Then it should call its next function", async () => {
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue({}),
      };
      const req: Partial<Request> = {};
      const next = jest.fn();

      const expectedError = new CustomError(
        "Bad request",
        statusCodes.clientError.notFound,
        "Couldn't find projects"
      );

      req.body = {};

      Project.find = jest.fn().mockReturnValue(undefined);

      await getUserProjects(req as CustomRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given a deleteProjects controller", () => {
  describe("When it receives a request to delete a projects user", () => {
    test("Then it should call its status code 200", async () => {
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(mockProjectAndroid.id),
      };
      const req: Partial<CustomRequest> = {
        params: { id: `${mockProjectAndroid.id}` },
      };
      const next = jest.fn();
      const expectedStatus = statusCodes.success.okCode;

      Project.findByIdAndDelete = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockReturnValue(mockProjectAndroid),
      }));

      await deleteProjects(req as CustomRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("When it receives a  bad request ", () => {
    test("Then it should call its next function", async () => {
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue({}),
      };
      const req: Partial<CustomRequest> = {};
      const next = jest.fn();

      req.params = {};

      const expectedError = new CustomError(
        "Internal server error",
        statusCodes.serverError.internalServer,
        "The project cannot be eliminated"
      );

      Project.findByIdAndDelete = jest.fn().mockReturnValue(undefined);

      await deleteProjects(req as CustomRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
