import mongoose, { Document, Model, Schema } from "mongoose";
export interface PaymentDocument extends Document {
  date: Date;
  sale: mongoose.Types.ObjectId;
  status: string;
  amount: number;
  createdBy: mongoose.Types.ObjectId;
}

export interface PaymentModel extends Model<PaymentDocument> {}

const PaymentSchema: Schema<PaymentDocument> = new Schema<PaymentDocument>(
  {
    status: {
      type: String,
      enum: ["paied", "pending", "canceled"],
      default: "pending",
    },
    amount: {
      type: Number,
      required: true,
    },
    date: { type: Date, required: true },
    sale: { type: Schema.Types.ObjectId, ref: "Sale", required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Payment: PaymentModel = mongoose.model<PaymentDocument, PaymentModel>(
  "Payment",
  PaymentSchema
);

export default Payment;
