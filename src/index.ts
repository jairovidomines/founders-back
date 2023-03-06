import "./loadEnvironment.js";
import connectDatabase from "./database/connectDatabase.js";
import mongoose from "mongoose";
import startServer from "./server/startServer.js";

mongoose.set("toJSON", {
  virtuals: true,
  transform(doc, ret) {
    delete ret._id;
    delete ret.__v;
  },
});

const mongoUrl = process.env.MONGODB_CONNECTION_URL!;
const port = process.env.PORT ?? 3000;

await connectDatabase(mongoUrl);
await startServer(+port);
