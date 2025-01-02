import express, { Express } from "express";
import "dotenv/config";
import cors from "cors";
import routes from "./routes";
import errorHandler from "@middlewares/error-handler";
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

//app.listen(port, () => {
//	redis
//		.connect()
//		.then(() => {
//			logger.info("Connected to Redis");
//		})
//		.catch((err) => {
//			logger.error(err.message);
//		});
//	logger.info(`Server is running on port ${port}`);
//});
//

app.get("/", async function (req, res) {
	const cachedExamList = await redis.get("cached:examList:frequency");
	res.json({ message: "Hello World", cachedExamList });
});

export default app;

//const handler = ServerlessHttp(app);
//module.exports.handler = async (event: any, context: any) => {
//	redis
//		.connect()
//		.then(() => {
//			logger.info("Connected to Redis");
//		})
//		.catch((err) => {
//			logger.error(err.message);
//		});
//	// you can do other things here
//	const result = await handler(event, context);
//	// and here
//	return result;
//};
//export default app;
