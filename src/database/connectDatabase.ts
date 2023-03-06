import mongoose from "mongoose";
import createDebug from "debug";

const debug = createDebug("users:database");

const connectDatabase = async (mongoUrl: string) => {
  mongoose.set("strictQuery", false);

  try {
    await mongoose.connect(mongoUrl);
    debug("Succesfull connection");
  } catch (error: unknown) {
    debug("Impossible connect to database", (error as Error).message);
  }
};

export default connectDatabase;
