import mongoose, { Document, Model, Schema } from "mongoose";
export interface ProgramDocument extends Document {
  programName: string;
  totalAmount: number;
  photo: string;
  type: string;
  details: string;
  status: string;
  developer: mongoose.Types.ObjectId;
}

export interface ProgramModel extends Model<ProgramDocument> {}

const ProgramSchema: Schema<ProgramDocument> = new Schema<ProgramDocument>({
  programName: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 50,
  },
  photo: {
    type: String,
    default: "test.jpg",
  },
  type: {
    type: String,
  },
  details: {
    type: String,
  },
  totalAmount: {
    required: [true, "Please provide amount"],
    type: Number,
  },
  status: {
    required: [true, "Please provide status"],
    type: String,
    enum: ["active", "inactive", "blocked", "deleted"],
  },
  developer: {
    type: Schema.Types.ObjectId,
    ref: "Developer",
    required: [true, "You must assign a developer to the program"],
  },
});

const Program: ProgramModel = mongoose.model<ProgramDocument, ProgramModel>(
  "Program",
  ProgramSchema
);

export default Program;
