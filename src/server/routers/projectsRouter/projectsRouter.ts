import { Router } from "express";
import {
  getAllProjects,
  getUserProjects,
} from "../../controllers/projectsControllers/projectsControllers.js";
import routes from "../routes.js";

const { projects } = routes.projects;
const { myProjects } = routes.myProjects;

const projectsRouter = Router();

projectsRouter.get(projects, getAllProjects);
projectsRouter.get(myProjects, getUserProjects);

export default projectsRouter;
