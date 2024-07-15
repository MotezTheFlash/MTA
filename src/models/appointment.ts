import mongoose, { Document, Model, Schema } from "mongoose";
export interface AppointmentDocument extends Document {
  date: Date;
  customer: mongoose.Types.ObjectId;
  decision: string;
  notes: string;
  createdBy: mongoose.Types.ObjectId;
}

export interface AppointmentModel extends Model<AppointmentDocument> {}

const AppointmentSchema: Schema<AppointmentDocument> =
  new Schema<AppointmentDocument>(
    {
      decision: {
        type: String,
      },
      notes: {
        type: String,
      },
      date: { type: Date, required: true },
      customer: { type: Schema.Types.ObjectId, ref: "Customer" },
      createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
  );

const Appointment: AppointmentModel = mongoose.model<
  AppointmentDocument,
  AppointmentModel
>("Appointment", AppointmentSchema);

export default Appointment;
