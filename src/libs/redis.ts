import Redis from "ioredis";
import { createClient } from "redis";

//const redis = createClient({
//    username: process.env.REDIS_USERNAME,
//    password: process.env.REDIS_PASSWORD,
//    socket: {
//        host: process.env.REDIS_HOST,
//        port: process.env.REDIS_PORT as unknown as number
//    }
//});
const redis = createClient ({
  url : "rediss://default:AVdnAAIjcDE5ZWEyNTk3M2RhMGY0NmM0YTAxMGE5NmZkNmQ2MWYzYnAxMA@tight-parakeet-22375.upstash.io:6379"
});


//const redis = new Redis({
//	host: process.env.REDIS_HOST,
//	port: process.env.REDIS_PORT as unknown as number,
//	username: process.env.REDIS_USERNAME,
//	password: process.env.REDIS_PASSWORD,
//});

export { redis };
