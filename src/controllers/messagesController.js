import {
  getAllMessages,
  getUsersMessages,
  getMessageById,
} from "../services/index.js";
import { errorResponse, successResponse } from "../utils/index.js";

class MessagesController {
  async getAllMessages(req, res) {
    try {
      const messages = await getAllMessages();
      return successResponse(res, { data: messages });
    } catch (error) {
      return errorResponse(res, { error: error.message });
    }
  }
  async getSummary(req, res) {
    try {
      const summary = await getUsersMessages();
      return successResponse(res, { data: summary });
    } catch (error) {
      return errorResponse(res, { error: error.message });
    }
  }

  async getMessageById(req, res) {
    try {
      const message = await getMessageById(req.params.id);
      return successResponse(res, { data: message });
    } catch (error) {
      return errorResponse(res, { error: error.message });
    }
  }
}

export const message = new MessagesController();
