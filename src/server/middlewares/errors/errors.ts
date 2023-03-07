import "../../../loadEnvironment.js";
import createDebug from "debug";
import { type Request, type Response, type NextFunction } from "express";
import type CustomError from "../../../CustomError/CustomError.js";
import statusCode from "../../utils/statusCode";

const debug = createDebug("founders:server:middlewares:errors");

const {
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
