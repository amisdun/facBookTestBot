import { Message } from "../models/index.js";

export const getMessageById = async (messageId) => {
	const message = await Message.findById(messageId);
	if (message && message?._id) {
		return message;
	}
	throw new Error("No Resource Available");
};
