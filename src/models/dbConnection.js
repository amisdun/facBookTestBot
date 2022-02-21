import mongoose from "mongoose";
import { config } from "dotenv";
config();
class MongooseConnection {
	constructor(db_url) {
		this.db_url = db_url;
	}

	connection() {
		try {
			mongoose.connect(this.db_url, (error) => {
				if (error) return new Error("Failed to connect to Database");
				console.log("Database connected..");
			});
		} catch (error) {
			console.log(error);
		}
	}
}

const dbConnection = new MongooseConnection(process.env.MONGODB_URI);

export { dbConnection };
