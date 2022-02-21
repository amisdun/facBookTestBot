import request from "request";
import { config } from "dotenv";
import url from "../config/urls.js";
config();

export const handleApiRequest = (senderPsid, response) => {
	const requestBody = {
		recipient: {
			id: senderPsid,
		},
		message: response,
	};
	request(
		{
			uri: url.face_book_url,
			qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
			method: "POST",
			json: requestBody,
		},
		(err, _res, _body) => {
			if (!err) {
				console.log("Message sent!");
			} else {
				console.error("Unable to send message:" + err);
			}
		},
	);
};
