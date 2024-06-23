import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";

export interface UserDocument extends Document {
  username: string;
  email: string;
  avatar: string;
  password: string;
  resetToken: string;
  location: string;
  phone: string;
  status: string;
  role: string;
  generateToken(): string;
  comparePassword(password: string): Promise<boolean>;
  resetTokenExpires: Date;
}

export interface UserModel extends Model<UserDocument> {}

const UserSchema: Schema<UserDocument> = new mongoose.Schema<UserDocument>({
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
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
    select: false,
  },
  resetToken: {
    type: String,
  },
  resetTokenExpires: {
    type: Date,
  },
  role: {
    type: String,
    enum: ["admin", "agent"],
    default: "agent",
  },
  location: {
    type: String,
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
  /* status: {
    type: String,
    enum: ["active", "inactive"],
  }, */
});

UserSchema.pre<UserDocument>("save", async function (next) {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.generateToken = function (): string {
  const token = jwt.sign(
    { userID: this._id, name: this.name },
    process.env.JWT_SECRET as Secret,
    { expiresIn: process.env.EXPIRATION_DATE }
  );
  return token;
};

UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

const User: UserModel = mongoose.model<UserDocument, UserModel>(
  "User",
  UserSchema
);

export default User;
