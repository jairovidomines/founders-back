import { Schema, model } from "mongoose";

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  website: {
    type: String,
    required: true,
    unique: true,
  },
  twitter: {
    type: String,
    required: true,
    unique: true,
  },
  platforms: {
    type: String,
    required: true,
    unique: true,
  },
  monthlyUsers: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  maker: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Project = model("Project", projectSchema, "projects");

export default Project;
