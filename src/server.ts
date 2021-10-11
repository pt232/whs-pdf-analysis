import express, { NextFunction, Request, Response } from "express";
import path from "path";
import cors from "cors";
import logger from "./config/logger";
import config from "./config/config";
import indexRouter from "./routes/index.routes";

const app = express();
const fileName = path.basename(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(express.json());
app.use(
  cors({
    origin: `http://:${config.server.hostname}:${config.server.port}`,
    allowedHeaders: ["Content-type"],
    methods: ["GET", "POST"],
  })
);
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(fileName, logger.formatMessageContent(req.method, req.url));

  res.on("finish", () => {
    logger.info(fileName, logger.formatMessageContent(req.method, req.url, res.statusCode));
  });

  next();
});

app.use("/", indexRouter);
app.use((req: Request, res: Response) => {
  res.status(404).render("404");
});

app.listen(config.server.port, () =>
  logger.info(fileName, `Server is running on ${config.server.hostname}:${config.server.port}`)
);
