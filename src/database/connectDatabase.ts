import mongoose from "mongoose";
import createDebug from "debug";

const debug = createDebug("founders:database");

const connectDatabase = async (mongoUrl: string) => {
  mongoose.set("strictQuery", false);

  mongoose.set("toJSON", {
    virtuals: true,
    transform(doc, ret) {
      delete ret._id;
      delete ret.__v;
    },
  });

  try {
    await mongoose.connect(mongoUrl);
    debug("Succesfull connection");
  } catch (error: unknown) {
    debug("Impossible connect to database", (error as Error).message);
  }
};

export default connectDatabase;
