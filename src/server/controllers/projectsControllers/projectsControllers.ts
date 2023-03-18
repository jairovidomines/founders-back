import { type NextFunction, type Request, type Response } from "express";
import mongoose from "mongoose";
import CustomError from "../../../CustomError/CustomError.js";
import Project, {
  type ProjectSchemaStructure,
} from "../../../database/models/Projects/Projects.js";
import { type CustomRequest } from "../../types/users/types.js";
import statusCodes from "../../utils/statusCode.js";

const {
  success: { okCode },
  clientError: { badRequest },
  serverError: { internalServer },
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
      badRequest,
      "Couldn't find projects"
    );

    next(customError);
  }
};

export const deleteProjects = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const project = await Project.findByIdAndDelete({
      _id: id,
      maker: req.maker,
    }).exec();

    res.status(okCode).json({ project });
  } catch (error) {
    const customError = new CustomError(
      "Internal server error",
      internalServer,
      "The project cannot be eliminated"
    );

    next(customError);
  }
};

export const createProject = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const project = req.body as ProjectSchemaStructure;

  const { id } = req;

  try {
    const newProject = await Project.create({
      ...project,
      maker: new mongoose.Types.ObjectId(id),
    });

    res.status(201).json({ ...newProject.toJSON() });
  } catch (error) {
    const customError = new CustomError(
      "Internal server error",
      internalServer,
      "The project cannot be created"
    );

    next(customError);
  }
};
