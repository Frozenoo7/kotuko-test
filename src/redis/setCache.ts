import * as Redis from "redis";

import { ISectionResponse } from "types/response";

export const setCache = async (key: string, data: ISectionResponse) => {
  const redis = Redis.createClient();
  await redis.connect();

  redis.setEx(key, 600, JSON.stringify(data));
};
