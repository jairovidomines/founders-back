import { type JwtPayload } from "jsonwebtoken";
import { type Request } from "express";

export interface CustomJwtPayload extends JwtPayload {
  username: string;
  sub: string;
}

export interface CustomRequest extends Request {
  maker: string;
}
