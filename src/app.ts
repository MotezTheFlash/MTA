import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();
import { router } from "./routes/index";

require("dotenv").config();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
app.use(express.json());

app.use(router);
app.all("*", (req: Request, res: Response) => {
  return res.send("This route is not defined");
});

const connectDB = (url: string) => {
  return mongoose.connect(url);
};
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL as string).then(() => {
      console.log("db connected");
    });
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
