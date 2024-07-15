import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";
import Payment from "../models/payment";
import { BadRequestError, NotFoundError } from "../errors";

export const createPayment = asyncHandler(
  async (req: Request | any, res: Response) => {
    const { date, sale, status, amount } = req.body;
    const { userID } = req.user;
    if (!date || !sale || !status || !amount) {
      throw new BadRequestError(
        "Please provide date, sale, status, and amount"
      );
    }

    const payment = await Payment.create({
      date,
      sale,
      status,
      amount,
      createdBy: userID,
    });

    res.status(StatusCodes.CREATED).json({ payment });
  }
);

export const getPayment = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payment = await Payment.findById(id).populate("sale");

  if (!payment) {
    throw new NotFoundError("Payment not found");
  }

  res.status(StatusCodes.OK).json({ payment });
});
export const getAllPayments = asyncHandler(
  async (req: Request, res: Response) => {
    const { status } = req.query;
    const query: any = {};
    if (status) {
      query.status = status;
    }
    const payments = await Payment.find(query).populate("sale");
    if (!payments.length) {
      throw new NotFoundError("No payments found");
    }
    res.status(StatusCodes.OK).json({ payments });
  }
);

export const getAllMyPayments = asyncHandler(
  async (req: Request | any, res: Response) => {
    const { userID } = req.user;
    const { status } = req.query;
    const query: any = { createdBy: userID };
    if (status) {
      query.status = status;
    }
    const payments = await Payment.find(query).populate("sale");
    if (!payments.length) {
      throw new NotFoundError("No payments found");
    }
    res.status(StatusCodes.OK).json({ payments });
  }
);

export const updatePayment = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;

    const payment = await Payment.findByIdAndUpdate(id, updates, { new: true });

    if (!payment) {
      throw new NotFoundError("Payment not found");
    }

    res
      .status(StatusCodes.OK)
      .json({ message: "Payment updated successfully", payment });
  }
);
export const deletePayment = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const payment = await Payment.findByIdAndDelete(id);

    if (!payment) {
      throw new NotFoundError("Payment not found");
    }

    res
      .status(StatusCodes.OK)
      .json({ message: "Payment deleted successfully" });
  }
);
