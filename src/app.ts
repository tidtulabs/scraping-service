import express, { Express } from "express";
import "dotenv/config";
import cors from "cors";
import routes from "./routes";
import errorHandler from "@middlewares/error-handler";
import { redis } from "@libs/redis";
import { logger } from "@libs/winston";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(
	cors({
		origin: process.env.CLIENT,
		optionsSuccessStatus: 200,
	}),
);

app.use(express.json());
app.use("/api/v1", routes);

app.use(errorHandler);

app.listen(port, () => {
	redis
		.connect()
		.then(() => {
			logger.info("Connected to Redis");
		})
		.catch((err) => {
			logger.error(err.message);
		});
	logger.info(`Server is running on port ${port}`);
});
