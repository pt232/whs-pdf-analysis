import dotenv from "dotenv";

dotenv.config();

const HOSTNAME = process.env.HOST || "localhost";
const PORT = process.env.PORT || 5000;
const SERVER = {
  hostname: HOSTNAME,
  port: PORT,
};

export default {
  server: SERVER,
};
