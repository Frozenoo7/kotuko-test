import * as dotenv from "dotenv";
import express from "express";

import { AppDataSource } from "database/database";

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.APP_PORT || 3000;

// establish database connection
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

app.listen(PORT, async () => {
  console.log(`listning on port ${PORT}`);
});
