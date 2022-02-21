import { config } from "dotenv";
import { WebHookError } from "../utils/index.js";
config();

export const verifyWebhook = (token, challenge, mode) => {
	if (token !== process.env.FACEBOOK_VERIFY_CODE) {
		throw new WebHookError("Invalid Token", 403);
	}
	return challenge;
};
