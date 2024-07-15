import mongoose, { Document, Model, Schema } from "mongoose";
export interface CustomerDocument extends Document {
  username: string;
  avatar: string;
  email: string;
  location: string;
  phone: string;
  status: string;
  projects: mongoose.Types.ObjectId[];
  createdBy: mongoose.Types.ObjectId;
}
export interface CustomerModel extends Model<CustomerDocument> {}

const CustomerSchema: Schema<CustomerDocument> = new Schema<CustomerDocument>({
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
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
});

const Customer: CustomerModel = mongoose.model<CustomerDocument, CustomerModel>(
  "Customer",
  CustomerSchema
);

export default Customer;
