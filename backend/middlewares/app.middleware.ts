import express from "express";
import cors from "cors";
import { Express } from "express";
// import path from "path";

export const applyAppMiddlewares = (app: Express) => {
  //   const __dirname = path.resolve();
  app.use(express.json({ limit: "5mb" }));
  app.use(express.urlencoded({ extended: true, limit: "5mb" }));
  app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["PUT", "GET", "POST", "DELETE"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  app.use((req, res, next) => {
    console.log(`Method: ${req.method}`);
    console.log(`Params: ${req.params}`);
    console.log(`Url: ${req.originalUrl}`);
    next();
  });
};
