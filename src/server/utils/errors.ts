import CustomError from "../../CustomError/CustomError";
import statusCodes from "./statusCode";

const {
  clientError: { unauthorized },
} = statusCodes;

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
