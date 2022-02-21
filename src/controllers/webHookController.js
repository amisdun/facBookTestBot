import { verifyWebhook, handleWebHookEvent } from "../services/index.js";
import { errorResponse, successResponse } from "../utils/index.js";

class WebHookController {
	async verifyWebhook(req, res) {
		try {
			const token = req.query["hub.verify_token"];
			const challenge = req.query["hub.challenge"];
			const response = verifyWebhook(token, challenge);
			return successResponse(res, response);
		} catch (error) {
			return errorResponse(res, { error: error.message }, error.statusCode);
		}
	}
	async getWebHookResponse(req, res) {
		try {
			const response = await handleWebHookEvent(req.body);
			return successResponse(res, response);
		} catch (error) {
			return errorResponse(res, { error: error.message }, error.statusCode);
		}
	}
}

export const webHook = new WebHookController();
