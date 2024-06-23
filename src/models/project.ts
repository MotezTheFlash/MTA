import mongoose, { Document, Model, Schema } from "mongoose";
export interface ProjectDocument extends Document {
  projectName: string;
  price: number;
  photo: string;
  type: string;
  details: string;
  status: string;
  program: mongoose.Types.ObjectId;
}

export interface ProjectModel extends Model<ProjectDocument> {}

const ProjectSchema: Schema<ProjectDocument> = new Schema<ProjectDocument>({
  projectName: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 50,
  },
  photo: {
    type: String,
  },
  type: {
    type: String,
  },
  details: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, "Please provide price"],
  },
  status: {
    type: String,
    enum: ["active", "inactive", "blocked", "deleted"],
  },
  program: { type: Schema.Types.ObjectId, ref: "Program" },
});

const Project: ProjectModel = mongoose.model<ProjectDocument, ProjectModel>(
  "Project",
  ProjectSchema
);

export default Project;
