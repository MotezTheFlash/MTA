import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";
import Appointment from "../models/appointment";
import { BadRequestError, NotFoundError } from "../errors";

export const createAppointment = asyncHandler(
  async (req: Request, res: Response) => {
    const { date, customer, decision, notes } = req.body;
    if (!date || !customer) {
      throw new BadRequestError("Please provide date and customer");
    }

    const appointment = await Appointment.create({
      date,
      customer,
      decision,
      notes,
    });

    res.status(StatusCodes.CREATED).json({ appointment });
  }
);

export const getAppointment = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const appointment = await Appointment.findById(id).populate("customer");

    if (!appointment) {
      throw new NotFoundError("Appointment not found");
    }

    res.status(StatusCodes.OK).json({ appointment });
  }
);

export const getAllAppointments = asyncHandler(
  async (req: Request, res: Response) => {
    const appointments = await Appointment.find({}).populate("customer");

    if (!appointments.length) {
      throw new NotFoundError("No appointments found");
    }

    res.status(StatusCodes.OK).json({ appointments });
  }
);

export const updateAppointment = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;

    const appointment = await Appointment.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!appointment) {
      throw new NotFoundError("Appointment not found");
    }

    res
      .status(StatusCodes.OK)
      .json({ message: "Appointment updated successfully", appointment });
  }
);

export const deleteAppointment = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const appointment = await Appointment.findByIdAndDelete(id);

    if (!appointment) {
      throw new NotFoundError("Appointment not found");
    }

    res
      .status(StatusCodes.OK)
      .json({ message: "Appointment deleted successfully" });
  }
);
