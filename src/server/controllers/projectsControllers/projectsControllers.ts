import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError";
import Project from "../../../database/models/Projects/Projects";
import statusCodes from "../../utils/statusCode";

const {
  success: { okCode },
  clientError: { badRequest },
} = statusCodes;

export const getProjects = async (
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
