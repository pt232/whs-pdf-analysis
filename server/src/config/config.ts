import dotenv from "dotenv";

dotenv.config();

const SERVER_HOST = process.env.SERVER_HOST || "http://localhost";
const SERVER_PORT = process.env.PORT || 5000;
const CLIENT_HOST = process.env.CLIENT_HOST || "http://localhost:3000";

export default {
  serverHostname: SERVER_HOST,
  serverPort: SERVER_PORT,
  clientHostname: CLIENT_HOST,
};
