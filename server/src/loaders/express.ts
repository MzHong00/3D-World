import express from "express";
import config from "../config";
import cors from "cors";
import helmet from "helmet";

import routes from "../api";

export default () => {
  const app = express();

  const corsOptions = {
    origin: "http://wslib.vercel.app",
    credentials: true,
  };

  app.use(cors());
  app.use(express.json());
  app.use(helmet());
  app.use("/api", routes);

  const server = app.listen(config.port, () => {
    console.log(`http://localhost:${config.port}`);
  });

  return server;
};
