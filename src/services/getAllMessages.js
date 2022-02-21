import { Message } from "../models/index.js";

export const getAllMessages = async () => {
	const messages = await Message.find({});
	return messages;
};
