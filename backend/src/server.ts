import 'dotenv/config';
import { NODE_ENV, PORT } from "./api/constants/env";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import ApiRoutes from "./api/routes/api.routes";
import errorHandler from "./api/middleware/errorHandler";
import { testDb } from '../src/db/pool';

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api", ApiRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT} in ${NODE_ENV}`);
  try {
    await testDb();
    console.log("Connected to the database successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
});
