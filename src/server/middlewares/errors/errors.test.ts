import { type Request, type Response, type NextFunction } from "express";
import type CustomError from "../../../CustomError/CustomError";
import statusCode from "../../utils/statusCode";
import { generalError } from "./errors";

const {
  serverError: { internalServer },
} = statusCode;

beforeEach(() => {
  jest.clearAllMocks();
});

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const req = {} as Request;
const next: NextFunction = jest.fn();

describe("Given a generalError middleware", () => {
  describe("When the error received is not a custom error", () => {
    test("Then it should call response 500 status code and 'Something went wrong' as a public message", () => {
      const error = new Error();
      const expectedPublicMessage = "Something went wrong";

      generalError(error as CustomError, req, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(internalServer);
      expect(res.json).toHaveBeenCalledWith({ error: expectedPublicMessage });
    });
  });
});
