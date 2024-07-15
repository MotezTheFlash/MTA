import mongoose, { Document, Model, Schema } from "mongoose";
export interface SaleDocument extends Document {
  date: Date;
  reference: number;
  customer: mongoose.Types.ObjectId;
  commission: number;
  VAT: number;
  project: mongoose.Types.ObjectId;
  status: string;
  createdBy: mongoose.Types.ObjectId;
}

export interface SaleModel extends Model<SaleDocument> {}

const SaleSchema: Schema<SaleDocument> = new Schema<SaleDocument>(
  {
    reference: {
      type: Number,
      default: function () {
        return Math.floor(100000 + Math.random() * 900000);
      },
    },
    status: {
      type: String,
      enum: ["in progress", "completed , canceled"],
    },
    commission: { type: Number },
    VAT: { type: Number },
    date: { type: Date },
    customer: { type: Schema.Types.ObjectId, ref: "Customer" },
    project: { type: Schema.Types.ObjectId, ref: "Project" },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

SaleSchema.pre<SaleDocument>("save", async function (next) {
  if (!this.date) {
    this.date = new Date();
  }
  next();
});
const Sale: SaleModel = mongoose.model<SaleDocument, SaleModel>(
  "Sale",
  SaleSchema
);

export default Sale;
