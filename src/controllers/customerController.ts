import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";
import Customer from "../models/customer";
import { BadRequestError, NotFoundError } from "../errors";

export const createCustomer = asyncHandler(
  async (req: Request, res: Response) => {
    const { username, email, phone, location, status, projects } = req.body;

    if (!username || !email || !phone || !status) {
      throw new BadRequestError(
        "Please provide username, email, phone, and status"
      );
    }

    const customer = await Customer.create({
      username,
      email,
      phone,
      location,
      status,
      projects,
    });

    res.status(StatusCodes.CREATED).json({ customer });
  }
);

export const getCustomer = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const customer = await Customer.findById(id).populate("projects");

  if (!customer) {
    throw new NotFoundError("Customer not found");
  }

  res.status(StatusCodes.OK).json({ customer });
});

export const getAllCustomers = asyncHandler(
  async (req: Request, res: Response) => {
    const customers = await Customer.find({}).populate("projects");

    if (!customers.length) {
      throw new NotFoundError("No customers found");
    }

    res.status(StatusCodes.OK).json({ customers });
  }
);

export const updateCustomer = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;

    const customer = await Customer.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!customer) {
      throw new NotFoundError("Customer not found");
    }

    res
      .status(StatusCodes.OK)
      .json({ message: "Customer updated successfully", customer });
  }
);

export const deleteCustomer = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const customer = await Customer.findByIdAndDelete(id);

    if (!customer) {
      throw new NotFoundError("Customer not found");
    }

    res
      .status(StatusCodes.OK)
      .json({ message: "Customer deleted successfully" });
  }
);
