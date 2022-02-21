export const successResponse = (res, data, code = 200) => {
	res.status(code).send(data);
};

export const errorResponse = (res, error, code = 500) => {
	res.status(code).send(error);
};
