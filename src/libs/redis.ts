import Redis from "ioredis";
import { createClient } from "redis";

const redis = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT as unknown as number
    }
});

//const redis = new Redis({
//	host: process.env.REDIS_HOST,
//	port: process.env.REDIS_PORT as unknown as number,
//	username: process.env.REDIS_USERNAME,
//	password: process.env.REDIS_PASSWORD,
//});

export { redis };
