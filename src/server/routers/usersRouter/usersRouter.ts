import { validate } from "express-validation";
import { Router } from "express";
import { loginUser } from "../../controllers/usersControllers/userControllers.js";
import routes from "../routes.js";
import loginUserSchema from "../../../schemas/userSchemas.js";

const { login } = routes.users;

const usersRouter = Router();

usersRouter.post(
  login,
  validate(loginUserSchema, {}, { abortEarly: false }),
  loginUser
);

export default usersRouter;
