import * as Redis from "redis";

export const setCache = async (key: string, data: any) => {
  const redis = Redis.createClient();
  await redis.connect();

  redis.setEx(key, 600, JSON.stringify(data));
};
