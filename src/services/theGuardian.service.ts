import * as dotenv from "dotenv";
import axios from "axios";
import { Request, Response } from "express";

dotenv.config();

const getGuardianApisBySection = async (req: Request, res: Response) => {
  const { searchSection } = req.query;

  const guardianApiKey = process.env.GUARDIAN_API_KEY;
  const guardianUrl = `https://content.guardianapis.com/sections?q=${searchSection}&api-key=${guardianApiKey}`;

  try {
    const response = await axios.get(guardianUrl);

    res.json(response.data.response.results);
  } catch (error) {
    console.log(error);
  }
};

export { getGuardianApisBySection };
