import { Router } from "express";
import {
  getAllProjects,
  getUserProjects,
} from "../../controllers/projectsControllers/projectsControllers.js";
import auth from "../../middlewares/auth/auth.js";
import routes from "../routes.js";

const { projects } = routes.projects;
const { myProjects } = routes.myProjects;

const projectsRouter = Router();

projectsRouter.get(projects, getAllProjects);
projectsRouter.get(myProjects, auth, getUserProjects);

export default projectsRouter;
