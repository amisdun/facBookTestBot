import {
	createUserAndAddMessage,
	addMessagesToUser,
	handleApiRequest,
} from "./index.js";
import { userExists } from "./userExists.js";
import { isValid, parse, parseISO } from "date-fns";
import { User } from "../models/index.js";

export const handleMessage = async (senderId, message) => {
	if (message.text) {
		if (message?.text.toLowerCase() === "hi") {
			const user = await userExists(senderId);
			if (!user) {
				await createUserAndAddMessage({ user: senderId }, message.text);
			} else {
				await addMessagesToUser(senderId, message.text);
			}
			handleApiRequest(senderId, { text: "What is your First Name?" });
			return;
		}
		const existingUser = await User.findOne({ user: senderId });
		if (
			!isValid(parse(message.text.toString(), "yyyy-MM-dd", new Date())) &&
			typeof message.text !== "number"
		) {
			await User.findOneAndUpdate(
				{ user: senderId },
				{ userName: message.text },
			);
			await addMessagesToUser(senderId, message.text);
			handleApiRequest(senderId, {
				text: "What is your date of birth? Please Provide in this format YYYY-MM-DD",
			});
			return;
		}
		if (
			isValid(parse(message.text.toString(), "yyyy-MM-dd", new Date())) &&
			existingUser?.userName
		) {
			await addMessagesToUser(senderId, message.text);
			await User.findOneAndUpdate(
				{ user: senderId },
				{ dateOfBirth: parseISO(message.text.toString()) },
			);
			handleApiRequest(senderId, {
				attachment: {
					type: "template",
					payload: {
						template_type: "button",
						text: "Do you want to know how many days to your birthday?",
						buttons: [
							{
								type: "postback",
								title: "Yes",
								payload: "yes",
							},
							{
								type: "postback",
								title: "No",
								payload: "no",
							},
						],
					},
				},
			});
		}
	}
};
