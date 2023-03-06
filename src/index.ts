import "./loadEnvironment.js";
import connectDatabase from "./database/connectDatabase.js";
import mongoose from "mongoose";

mongoose.set("toJSON", {
  virtuals: true,
  transform(doc, ret) {
    delete ret._id;
    delete ret.__v;
  },
});

const mongoUrl = process.env.MONGODB_CONNECTION_URL!;

await connectDatabase(mongoUrl);
