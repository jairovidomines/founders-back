import CustomError from "../../CustomError/CustomError";
import statusCode from "./statusCode";

const {
  clientError: { unauthorized },
} = statusCode;

export const loginUsersErrors = {
  userNotFound: new CustomError(
    "Username not found",
    unauthorized,
    "Wrong credentials"
  ),

  wrongPassword: new CustomError(
    "Wrong password",
    unauthorized,
    "Wrong credentials"
  ),
};
