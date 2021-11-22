import express, { Request, Response } from "express";
import cors from "cors";
import config from "./config/config";
import uploadRouter from "./routes/upload.routes";

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: `http://:${config.clientHostname}:${config.clientPort}`,
    methods: ["GET", "POST"],
  })
);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to this API!" });
});

app.use("/upload", uploadRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "This route does not exist!" });
});

app.listen(config.serverPort, () =>
  console.log(
    `Server is running on ${config.serverHostname}:${config.serverPort}`
  )
);
