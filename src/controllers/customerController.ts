import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";
import Customer from "../models/customer";
import { BadRequestError, NotFoundError } from "../errors";

export const createCustomer = asyncHandler(
  async (req: Request | any, res: Response) => {
    const { username, email, phone, location, status, projects } = req.body;
    const { userID } = req.user;
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
      createdBy: userID,
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
    const { status } = req.query;
    const query: any = {};

    if (status) {
      query.status = status;
    }

    const customers = await Customer.find(query).populate("projects");

    if (!customers.length) {
      throw new NotFoundError("No customers found");
    }

    res.status(StatusCodes.OK).json({ customers, count: customers.length });
  }
);

export const getAllMyCustomers = asyncHandler(
  async (req: Request | any, res: Response) => {
    const { userID } = req.user;
    const { status } = req.query;
    const query: any = { createdBy: userID };

    if (status) {
      query.status = status;
    }

    const customers = await Customer.find(query).populate("projects");

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
