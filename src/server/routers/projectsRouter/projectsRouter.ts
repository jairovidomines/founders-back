import { Router } from "express";
import {
  deleteProjects,
  getAllProjects,
  getUserProjects,
} from "../../controllers/projectsControllers/projectsControllers.js";
import auth from "../../middlewares/auth/auth.js";
import routes from "../routes.js";

const { projects } = routes.projects;
const { myProjects } = routes.myProjects;
const { deleteProject } = routes.deleteProject;
const { id } = routes.id;

const projectsRouter = Router();

projectsRouter.get(projects, getAllProjects);
projectsRouter.get(myProjects, auth, getUserProjects);
projectsRouter.delete(`${deleteProject}${id}`, auth, deleteProjects);

export default projectsRouter;
