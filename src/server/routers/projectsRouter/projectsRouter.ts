import { Router } from "express";
import {
  createProject,
  deleteProjects,
  getAllProjects,
  getProjectById,
  getUserProjects,
} from "../../controllers/projectsControllers/projectsControllers.js";
import auth from "../../middlewares/auth/auth.js";
import routes from "../routes.js";

const { projects } = routes.projects;
const { myProjects } = routes.myProjects;
const { deleteProject } = routes.deleteProject;
const { id } = routes.id;
const { create } = routes.create;

const projectsRouter = Router();

projectsRouter.get(projects, getAllProjects);
projectsRouter.get(myProjects, auth, getUserProjects);
projectsRouter.delete(`${deleteProject}${id}`, auth, deleteProjects);
projectsRouter.post(`${create}`, auth, createProject);
projectsRouter.get(`${id}`, getProjectById);

export default projectsRouter;
