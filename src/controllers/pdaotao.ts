import { Request, Response } from "express";
import { sendErrorResponse, sendSuccessResponse } from "@utils/response";
import { getDataExamList, getLinkDownLoad } from "@services/pdaotao";
import { redis } from "@libs/redis";
import { logger } from "@libs/winston";

export const examList = async (req: Request, res: Response) => {
	try {
		const data = await getDataExamList(req);
		// console.log(data)
		if (!data) {
			return sendErrorResponse(res, "Get exam list failed");
		}
		return sendSuccessResponse(
			res,
			"Get exam list successfully",
			data?.data,
			data.meta,
		);
	} catch (err: any) {
    logger.error(err.message);
		return sendErrorResponse(res, err.message);
	}
};

export const getExamDownloadLink = async (req: Request, res: Response) => {
	try {
		const { examId } = req.params;
		if (!examId) {
      logger.error('Invalid exam ID')
			return sendErrorResponse(res, "Invalid exam ID");
		}
		const cachedUrl = await redis.get(`cached:downloadFile:${examId}`);
		if (cachedUrl) {
			return sendSuccessResponse(
				res,
				"Retrieved exam download link successfully (cached)",
				{
					url: cachedUrl,
				},
			);
		}

		const url = await getLinkDownLoad(`EXAM_LIST_Detail/?ID=${examId}&lang=VN`);

		if (url) {
			await redis.set(`cached:downloadFile:${examId}`, url);
			return sendSuccessResponse(
				res,
				"Retrieved exam download link successfully",
				{
					url,
				},
			);
		}

		return sendErrorResponse(res, "Unable to retrieve exam download link");
	} catch (err: any) {
    logger.error(err.message);
		return sendErrorResponse(res, err.message);
	}
};
