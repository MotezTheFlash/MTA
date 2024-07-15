import mongoose, { Document, Model, Schema } from "mongoose";
export interface DeveloperDocument extends Document {
  username: string;
  avatar: string;
  email: string;
  location: string;
  phone: string;
  status: string;
  createdBy: mongoose.Types.ObjectId;
}

export interface DeveloperModel extends Model<DeveloperDocument> {}

const DeveloperSchema: Schema<DeveloperDocument> =
  new Schema<DeveloperDocument>({
    username: {
      type: String,
      required: [true, "Please provide name"],
      minlength: 3,
      maxlength: 50,
    },
    avatar: {
      type: String,
      default: function () {
        return `https://ui-avatars.com/api/?name=${this.username}&background=random&size=200`;
      },
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "email invalid",
      ],
      unique: true,
    },
    phone: {
      required: true,
      type: String,
      unique: true,
      match: [
        /^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?)[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
        "phone number invalid",
      ],
    },
    location: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  });

const Developer: DeveloperModel = mongoose.model<
  DeveloperDocument,
  DeveloperModel
>("Developer", DeveloperSchema);

export default Developer;
