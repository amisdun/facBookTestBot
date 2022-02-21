import { User } from "../models/index.js";

export const getUsersMessages = async () => {
	const usersMessages = await User.find({})
		.select("-dateOfBirth -_id")
		.populate("messages");
	return usersMessages;
};
