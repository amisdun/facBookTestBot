import { User } from "../models/index.js";

export const userExists = async (userId) => {
  const user = await User.findOne({ user: userId });
  if (user && user?._id) {
    return true;
  }
  return false;
};
