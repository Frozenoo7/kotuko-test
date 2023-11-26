import * as Redis from "redis";

export const getCache = async (key: string) => {
  const redis = Redis.createClient();
  await redis.connect();

  const data = await redis.get(key);

  if (data) {
    return JSON.parse(data);
  }
};
