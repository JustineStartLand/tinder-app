import jwt from "jsonwebtoken";
import config from "../core/config";
import { Response } from "express";

export const issueJWT = (userId: string): string => {
  return jwt.sign({ userId }, config.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
};

export const saveJwtToCookie = (res: Response, jwt: string) => {
  res.cookie("jwt", jwt, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, // prevents XSS attacks
    sameSite: "strict", // prevents CSRF attacks
    secure: config.NODE_ENV === "production",
  });
};
