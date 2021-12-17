const express = require("express");
const cors = require("cors");
const config = require("./config/config");
const fileRouter = require("./routes/file.routes");

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: config.clientHostname,
    methods: ["GET", "POST"],
  })
);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to this API!" });
});

app.use("/api/file", fileRouter);

app.use((req, res) => {
  res.status(404).json({ message: "This route does not exist!" });
});

app.listen(config.serverPort, () =>
  console.log(`Server is running on ${config.serverHostname}:${config.serverPort}`)
);
