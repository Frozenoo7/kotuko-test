import * as dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, async () => {
  console.log(`listning on port ${PORT}`);
});
