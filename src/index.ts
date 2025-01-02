import serverless from "serverless-http";
import app from "./app";
import { redis } from "@libs/redis";
import { logger } from "@libs/winston";

const handler = serverless(app);
module.exports.handler = async (event: any, context: any) => {
	redis
		.connect()
		.then(() => {
			logger.info("Connected to Redis");
		})
		.catch((err) => {
			logger.error(err.message);
		});
	// you can do other things here
	const result = await handler(event, context);
	// and here
	return result;
};

