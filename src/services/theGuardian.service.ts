import * as dotenv from "dotenv";
import axios from "axios";
import { Request, Response } from "express";

import { AppDataSource } from "configs/database";
import { InvalidSearchEntity, ValidSearchEntity } from "entities/index";
import { setCache, getCache } from "redis/index";
import { ISectionResponse } from "types/response";
import { sectionNameValidation } from "validation/sectionName";

dotenv.config();

const getGuardianApisBySection = async (req: Request, res: Response) => {
  const { searchSection } = req.query;
  if (typeof searchSection === "string") {
    const isValidSearch = sectionNameValidation(searchSection);

    if (!isValidSearch) {
      await AppDataSource.getRepository(InvalidSearchEntity).save({
        searchText: searchSection,
      });
      res.status(400).json({
        status: 400,
        message: "Invalid search section",
      });
    }

    const data = await getCache(searchSection);
    if (data) {
      return res.json(transformToRssFeed(data));
    }
  }

  const guardianApiKey = process.env.GUARDIAN_API_KEY;
  const guardianUrl = `https://content.guardianapis.com/sections?q=${searchSection}&api-key=${guardianApiKey}`;

  try {
    const response = await axios.get(guardianUrl);

    const data: ISectionResponse = response.data.response.results[0];

    if (typeof searchSection === "string") {
      await Promise.all([
        await AppDataSource.getRepository(ValidSearchEntity).save({
          searchText: searchSection,
        }),
        await setCache(searchSection, data),
      ]);
    }

    res.json(transformToRssFeed(data));
  } catch (error) {
    console.log(error);
  }
};

const transformToRssFeed = (data: ISectionResponse) => {
  let rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>${data.webTitle}</title>
      <link>${data.webTitle}</link>
      <description>${data.webTitle}</description>
`;

  data.editions.forEach((section) => {
    rssFeed += `
      <item>
        <title>${section.webTitle}</title>
        <link>${section.webUrl}</link>
        <description>${section.webTitle} Section</description>
      </item>
  `;
  });

  rssFeed += `
      </channel>
    </rss>
  `;

  return rssFeed;
};

export { getGuardianApisBySection };
