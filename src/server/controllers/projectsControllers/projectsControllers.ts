import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import Project from "../../../database/models/Projects/Projects.js";
import { type CustomRequest } from "../../types/users/types.js";
import statusCodes from "../../utils/statusCode.js";

const {
  success: { okCode },
  clientError: { badRequest },
} = statusCodes;

export const getAllProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projects = await Project.find().exec();

    res.status(okCode).json({ projects });
  } catch (error) {
    const customError = new CustomError(
      "Bad request",
      badRequest,
      "Couldn't find projects"
    );

    next(customError);
  }
};

export const getUserProjects = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const projects = await Project.find({ maker: req.maker }).exec();

    res.status(okCode).json({ projects });
  } catch (error) {
    const customError = new CustomError(
      "Bad request",
      statusCodes.clientError.badRequest,
      "Couldn't find projects"
    );

    next(customError);
  }
};
