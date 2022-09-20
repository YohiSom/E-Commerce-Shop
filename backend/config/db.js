import mongoose from "mongoose";
import "dotenv/config";

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`MongoDb Connected: ${connection.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDb;
