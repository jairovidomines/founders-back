import { type Request, type Response } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../../../database/models/Users/User";
import { loginUsersErrors } from "../../utils/errors";
import { type UserCredentials } from "./types";
import { loginUser } from "./userControllers";
import statusCodes from "../../utils/statusCode";

beforeEach(() => {
  jest.clearAllMocks();
});

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const req: Partial<
  Request<Record<string, unknown>, Record<string, unknown>, UserCredentials>
> = {};

const next = jest.fn();

describe("Given a loginUser controller", () => {
  const mockUser: UserCredentials = {
    username: "Jairo",
    password: "Jairo1020!",
  };

  describe("When it receives a request with username: 'Jairo', and password: 'Jairo1020!' and the user is not registered in the database", () => {
    test("Then it should call its next method with status code 401 and the message: 'Wrong credentials'", async () => {
      const expectedError = loginUsersErrors.userNotFound;
      req.body = mockUser;

      User.findOne = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue(undefined),
      }));

      await loginUser(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          UserCredentials
        >,
        res as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a request with username: 'Jairo', and password: 'Jairo1020!' and the user is registered but the password doesn't match", () => {
    test("Then it should call its next method with status code 401 and the message: 'Wrong credentials'", async () => {
      const expectedError = loginUsersErrors.wrongPassword;
      req.body = mockUser;

      User.findOne = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue({
          ...mockUser,
          _id: new mongoose.Types.ObjectId(),
        }),
      }));

      bcrypt.compare = jest.fn().mockResolvedValue(false);

      await loginUser(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          UserCredentials
        >,
        res as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a request with username 'Jairo', and password 'Jairo1020!' and the user is registered in the database", () => {
    test("Then it should call its status code 200 and its json method with a token", async () => {
      const expectedStatusCode = statusCodes.success.okCode;
      const mockToken = "1p2o3i4u5y6t";

      User.findOne = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue({
          ...mockUser,
          _id: new mongoose.Types.ObjectId(),
        }),
      }));

      bcrypt.compare = jest.fn().mockResolvedValue(true);
      jwt.sign = jest.fn().mockReturnValue(mockToken);

      await loginUser(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          UserCredentials
        >,
        res as Response,
        next
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });

  describe("When the database response with an error", () => {
    test("Then it should call its next method", async () => {
      const errorDatabase = new Error("error");

      User.findOne = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockRejectedValue(errorDatabase),
      }));

      await loginUser(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          UserCredentials
        >,
        res as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(errorDatabase);
    });
  });
});
