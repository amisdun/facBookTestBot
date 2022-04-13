import { WebHookError } from "../utils/index.js";
import { handleMessage, handlePostBack } from "../services/index.js";

export const handleWebHookEvent = async (body) => {
  const { object } = body;
  if (object === "page") {
    body.entry.forEach(async function (entry) {
      entry.messaging.forEach(async function (event) {
        const senderId = event.sender.id;
        if (event?.message) {
          await handleMessage(senderId, event.message);
        }
        if (event?.postback) {
          await handlePostBack(senderId, event.postback);
        }
      });
    });
    return "EVENT_RECEIVED";
  }
  throw new WebHookError("Not Found", 404);
};
