import { type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import CustomError from "../../../CustomError/CustomError.js";
import {
  type CustomRequest,
  type CustomJwtPayload,
} from "../../types/users/types";
import statusCodes from "../../utils/statusCode.js";

const auth = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.header("Authorization");

    if (!authorizationHeader) {
      throw new Error("Authorization header missing");
    }

    if (!authorizationHeader.startsWith("Bearer ")) {
      throw new Error("Missing bearer in Authorization header");
    }

    const token = authorizationHeader.replace(/^Bearer\s*/, "");

    const { id: maker } = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as CustomJwtPayload;

    req.maker = maker;

    next();
  } catch (error: unknown) {
    const tokenError = new CustomError(
      (error as Error).message,
      statusCodes.clientError.unauthorized,
      "Invalid token"
    );
    next(tokenError);
  }
};

export default auth;
