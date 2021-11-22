import dotenv from "dotenv";

dotenv.config();

const SERVER_HOST = process.env.SERVER_HOST || "localhost";
const SERVER_PORT = process.env.PORT || 5000;
const CLIENT_HOST = process.env.CLIENT_HOST || "localhost";
const CLIENT_PORT = process.env.CLIENT_PORT || 3000;

export default {
  serverHostname: SERVER_HOST,
  serverPort: SERVER_PORT,
  clientHostname: CLIENT_HOST,
  clientPort: CLIENT_PORT,
};
