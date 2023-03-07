import { type Request, type Response, type NextFunction } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import statusCodes from "../../utils/statusCode.js";
import { generalError, notFoundError } from "./errors.js";

const {
  serverError: { internalServer },
} = statusCodes;

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
    test("Then it should call response with a status code 500 and 'Something went wrong' as a public message", () => {
      const error = new Error();
      const expectedPublicMessage = "Something went wrong";

      generalError(error as CustomError, req, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(internalServer);
      expect(res.json).toHaveBeenCalledWith({ error: expectedPublicMessage });
    });
  });
});

describe("Given a notFoundError middleware", () => {
  describe("When it receives a request", () => {
    test("Then it should call its next method with a status code 404 and 'Endpoint not found' as a message and public message", () => {
      const expectedNotFoundError = new CustomError(
        "Endpoint not found",
        404,
        "Endpoint not found"
      );

      notFoundError(req, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedNotFoundError);
    });
  });
});
