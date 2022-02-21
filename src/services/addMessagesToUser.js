import { User, Message } from "../models/index.js";

export const addMessagesToUser = async (userId, message) => {
	const newMessage = await Message.create({ message });
	await User.findOneAndUpdate(
		{ user: userId },
		{
			$push: { messages: [newMessage?._id] },
		},
	);
};
