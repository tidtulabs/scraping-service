import express, { Express } from "express";
import "dotenv/config";
import cors from "cors";
import routes from "./routes";
import serverless from "serverless-http";
import errorHandler from "@middlewares/error-handler";
import { logger } from "@libs/winston";
import { redis } from "@libs/redis";

const app: Express = express();
//const port = process.env.PORT || 3000;

app.use(
	cors({
		origin: process.env.CLIENT,
		optionsSuccessStatus: 200,
	}),
);

app.use(express.json());
app.use("/api/v1", routes);

app.use(errorHandler);

app.use("/", (req, res) => {
	res.send("Welcome to the API");
});

const handler = serverless(app);
module.exports.handler = async (event: any, context: any) => {
	redis
		.connect()
		.then(() => {
			logger.info("Redis is connected");
		})
		.catch((err) => {
			logger.error(err);
		});
	// you can do other things here
	const result = await handler(event, context);
	// and here
	return result;
};

//app.listen(port, async () => {
//	redis
//		.connect()
//		.then(() => {
//			logger.info("Redis is connected");
//		})
//		.catch((err) => {
//			logger.error(err);
//		});
//
//	logger.info(`Server is running on port ${port}`);
//});
