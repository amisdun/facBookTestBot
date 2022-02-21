import mongoose from "mongoose";
const { Schema, Types } = mongoose;

const UserSchema = new Schema({
	user: {
		type: String,
		required: true,
	},
	userName: {
		type: String,
	},
	dateOfBirth: {
		type: Date,
	},
	messages: [
		{
			type: Types.ObjectId,
			ref: "Message",
		},
	],
});

const User = mongoose.model("User", UserSchema);

export { User };
