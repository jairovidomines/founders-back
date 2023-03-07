import "../../../loadEnvironment.js";
import createDebug from "debug";
import { type Request, type Response, type NextFunction } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import statusCode from "../../utils/statusCode.js";

const debug = createDebug("founders:server:middlewares:errors");

const {
  clientError: { notFound },
  serverError: { internalServer },
} = statusCode;

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode || internalServer;
  const publicMessage = error.publicMessage || "Something went wrong";

  res.status(statusCode).json({ error: publicMessage });
};

export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new CustomError(
    "Endpoint not found",
    notFound,
    "Endpoint not found"
  );
  next(error);
};
