import {  Response } from "express";

export const sendSuccessResponse = (
	res: Response,
	message: string,
	data: any,
	meta?: object,
) => {
	const response: any = {
		success: true,
		message,
		response: {
      data,
    }
	};

	if (meta) {
		response.meta = meta;
	}

	res.status(200).json(response);
};

//  errror
export const sendErrorResponse = (
	res: Response,
	message: string,
	error: any = null,
) => {
	res.status(500).json({
		success: false,
		message,
		error,
	});
};

export const sendNotFoundResponse = (res: Response, message: string) => {
	res.status(404).json({
		success: false,
		message,
		data: null,
	});
};

export const sendBadRequestResponse = (res: Response, message: string) => {
	res.status(400).json({
		success: false,
		message,
		data: null,
	});
};
