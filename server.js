import express from "express";
import cors from "cors";  // Import the cors module
import connectDb from "./config/dbConnection.js";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import {
  errorHandler,
  notFound,
  uncaughtException,
} from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import { consoleLogger } from "./utils/logger.js";
import { CORS_OPTIONS } from "./constants/apiConstants.js";
import './utils/cronJobs.js'

uncaughtException();

dotenv.config();
connectDb();
const app = express();

app.use(express.json());
app.use(cors(CORS_OPTIONS));
app.use(cookieParser());

routes(app);

app.use(notFound);
app.use(errorHandler);
const port = process.env.PORT || 5000;

const server = app.listen(
  port,
  consoleLogger.info(`Server running in mode on port http://localhost:${port}`)
);

export { app, server };
