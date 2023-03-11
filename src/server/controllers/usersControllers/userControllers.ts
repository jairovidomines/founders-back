import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { type UserCredentials } from "./types.js";
import { loginUsersErrors } from "../../utils/errors.js";
import { type CustomJwtPayload } from "../../types/users/types.js";
import User from "../../../database/models/Users/User.js";
import statusCodes from "../../utils/statusCode.js";

const {
  success: { okCode },
} = statusCodes;

export const loginUser = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    UserCredentials
  >,
  res: Response,
  next: NextFunction
) => {
  const { password, username } = req.body;

  try {
    const user = await User.findOne({ username }).exec();
    if (!user) {
      next(loginUsersErrors.userNotFound);
      return;
    }

    if (!(await bcrypt.compare(password, user.password))) {
      next(loginUsersErrors.wrongPassword);
      return;
    }

    const jwtPayload: CustomJwtPayload = {
      id: user._id.toString(),
      username,
    };

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!, {
      expiresIn: "3d",
    });
    res.status(okCode).json({ token });
  } catch (error: unknown) {
    next(error);
  }
};
