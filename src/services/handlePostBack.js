import { handleApiRequest, addMessagesToUser } from "./index.js";
import { differenceInCalendarDays, setYear, getYear } from "date-fns";
import { User } from "../models/users.js";

export const handlePostBack = async (senderId, receivedPostback) => {
	const payload = receivedPostback.payload;
	if (payload === "yes") {
		const user = await User.findOne({ user: senderId });
		await addMessagesToUser(senderId, payload);
		handleApiRequest(senderId, {
			text: `There are ${differenceInCalendarDays(
				setYear(user.dateOfBirth, getYear(new Date())),
				new Date(),
			)} days left until your next birthday`,
		});
		return;
	}
	if (payload === "no") {
		await addMessagesToUser(senderId, payload);
		handleApiRequest(senderId, { text: "Goodbye!!!" });
		return;
	}
};
