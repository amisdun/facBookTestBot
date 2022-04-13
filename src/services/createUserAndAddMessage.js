import { User, Message } from "../models/index.js";

export const createUserAndAddMessage = async (userDetails, message) => {
  const user = new User({ ...userDetails });
  const newMessage = await Message.create({ message });
  user.messages.push(newMessage);
  await user.save();
};
