import { type NextFunction, type Response, type Request } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import CustomError from "../../../CustomError/CustomError";
import { type CustomRequest } from "../../types/users/types.js";
import statusCodes from "../../utils/statusCode";
import auth from "./auth";

const req: Partial<Request> = {};
const next: NextFunction = jest.fn();
const res: Partial<Response> = {};

describe("Given an auth middleware", () => {
  describe("When it receives a request without an authorization header", () => {
    test("Then it should invoke next with an status code 401 and the message: 'Missing token'", () => {
      const req: Partial<CustomRequest> = {
        header: jest.fn().mockReturnValue(undefined),
      };

      const expectedStatus = statusCodes.clientError.unauthorized;
      const expectedError = new CustomError(
        "Authorization header missing",
        expectedStatus,
        "Missing token"
      );

      jwt.verify = jest.fn().mockReturnValueOnce({});

      auth(req as CustomRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a request without an authorization header that begins with 'Bearer'", () => {
    test("Then it should invoke next with an status code 401 and the message: 'Missing bearer in Authorization header'", () => {
      const req: Partial<CustomRequest> = {
        header: jest.fn().mockReturnValue("102938"),
      };

      const expectedStatus = statusCodes.clientError.unauthorized;
      const expectedError = new CustomError(
        "Missing bearer in Authorization header",
        expectedStatus,
        "Missing token"
      );

      jwt.verify = jest.fn().mockReturnValueOnce({});

      auth(req as CustomRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a request with an authorization header 'Bearer 23rr23r.213rfr23.2334rr23'", () => {
    test("Then it should add the maker property, the token to the request, and invoke next", () => {
      const req: Partial<Request> = {};
      req.header = jest
        .fn()
        .mockReturnValueOnce("Bearer 23rr23r.213rfr23.2334rr23");

      const maker = new mongoose.Types.ObjectId();

      jwt.verify = jest.fn().mockReturnValueOnce({ sub: maker });

      auth(req as CustomRequest, res as Response, next);

      expect(next).toHaveBeenCalled();
      expect(req).toHaveProperty("maker", maker);
    });
  });

  describe("When it receives a request with an undefined token", () => {
    test("Then it should add the maker property, the token to the request, and invoke next", () => {
      const req: Partial<Request> = {};

      const maker = new mongoose.Types.ObjectId();
      jwt.verify = jest.fn().mockReturnValueOnce({ sub: maker });

      auth(req as CustomRequest, res as Response, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
