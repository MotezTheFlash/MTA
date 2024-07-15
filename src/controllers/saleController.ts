import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";
import Sale from "../models/sale";
import { BadRequestError, NotFoundError } from "../errors";

export const createSale = asyncHandler(
  async (req: Request | any, res: Response) => {
    const { date, commission, VAT, project, customer, status } = req.body;
    if (!date || !commission || !VAT || !project || !customer || !status) {
      throw new BadRequestError(
        "Please provide date, commission, VAT, project, customer, and status"
      );
    }
    const { userID } = req.user;
    const sale = await Sale.create({
      date,
      commission,
      VAT,
      project,
      customer,
      status,
      createdBy: userID,
    });

    res.status(StatusCodes.CREATED).json({ sale });
  }
);

export const getSale = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const sale = await Sale.findById(id).populate("project customer");

  if (!sale) {
    throw new NotFoundError("Sale not found");
  }

  res.status(StatusCodes.OK).json({ sale });
});

export const getAllSales = asyncHandler(async (req: Request, res: Response) => {
  const { status } = req.query;
  const query: any = {};

  if (status) {
    query.status = status;
  }

  const sales = await Sale.find(query).populate("project customer");

  if (!sales.length) {
    throw new NotFoundError("No sales found");
  }

  res.status(StatusCodes.OK).json({ sales });
});

export const getAllMySales = asyncHandler(
  async (req: Request | any, res: Response) => {
    const { userID } = req.user;
    const { status } = req.query;
    const query: any = { createdBy: userID };

    if (status) {
      query.status = status;
    }

    const sales = await Sale.find(query).populate("project customer");

    if (!sales.length) {
      throw new NotFoundError("No sales found");
    }

    res.status(StatusCodes.OK).json({ sales });
  }
);

export const updateSale = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;

  const sale = await Sale.findByIdAndUpdate(id, updates, { new: true });

  if (!sale) {
    throw new NotFoundError("Sale not found");
  }

  res
    .status(StatusCodes.OK)
    .json({ message: "Sale updated successfully", sale });
});

export const deleteSale = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const sale = await Sale.findByIdAndDelete(id);

  if (!sale) {
    throw new NotFoundError("Sale not found");
  }

  res.status(StatusCodes.OK).json({ message: "Sale deleted successfully" });
});
