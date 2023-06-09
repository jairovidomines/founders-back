import { type NextFunction, type Request, type Response } from "express";
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
  const filterByMonthlyUsers = {
    newbies: "0-25.000",
    beginners: "25.000-50.000",
    intermediate: "50.000-75.000",
    professional: "75.000-100.000",
    experts: "100.000-150.000",
    nextLevel: "+200.000",
  };

  try {
    let projects;

    if (!req.query) {
      projects = await Project.find().exec();
      res.status(okCode).json({ projects });
    }

    if (
      req.query.monthlyUsers === filterByMonthlyUsers.newbies ||
      req.query.monthlyUsers === filterByMonthlyUsers.beginners ||
      req.query.monthlyUsers === filterByMonthlyUsers.intermediate ||
      req.query.monthlyUsers === filterByMonthlyUsers.professional ||
      req.query.monthlyUsers === filterByMonthlyUsers.experts ||
      req.query.monthlyUsers === filterByMonthlyUsers.nextLevel
    ) {
      projects = await Project.find({
        monthlyUsers: req.query.monthlyUsers,
      }).exec();
    } else {
      projects = await Project.find().exec();
    }

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

  try {
    const newProject = await Project.create({
      ...project,
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

export const getProjectById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const project = await Project.findById({
      _id: id,
    }).exec();

    res.status(okCode).json({ project });
  } catch (error) {
    const customError = new CustomError(
      "Internal server error",
      internalServer,
      "Not possible to find the project"
    );

    next(customError);
  }
};
