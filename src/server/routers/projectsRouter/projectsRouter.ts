import { Router } from "express";
import { getProjects } from "../../controllers/projectsControllers/projectsControllers.js";
import routes from "../routes.js";

const { projects } = routes.projects;

const projectsRouter = Router();

projectsRouter.get(projects, getProjects);

export default projectsRouter;
