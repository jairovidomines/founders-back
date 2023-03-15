import { type JwtPayload } from "jsonwebtoken";
import { type Request } from "express";

export interface CustomJwtPayload extends JwtPayload {
  username: string;
  id: string;
}

export interface CustomRequest extends Request {
  maker: string;
}
