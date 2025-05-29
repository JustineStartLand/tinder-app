import express from "express";
import { applyAppMiddlewares } from "./middlewares/app.middleware";
import config from "./core/config";
// import { connectDb } from "./db/db";

const initApp = () => {
  const app = express();
  applyAppMiddlewares(app);
  const PORT = config.PORT;
  app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
    // connectDb();
  });
};

initApp();
