import express from "express";
import { authRouter } from "./auth";
import { userRouter } from "./user";
import { developerRouter } from "./developer";
import { programRouter } from "./program";
import { projectRouter } from "./project";
import { customerRouter } from "./customer";
import { saleRouter } from "./sale";
import { paymentRouter } from "./payment";
import { appointmentRouter } from "./appointment";
import { authentification } from "../middleware/authentification";
import { isAdmin } from "../middleware/isAdmin";

export const router = express.Router();

router.use("/api/v1/auth", authRouter);
router.use("/api/v1/user", authentification, isAdmin, userRouter);
router.use("/api/v1/developer", authentification, developerRouter);
router.use("/api/v1/program", authentification, programRouter);
router.use("/api/v1/project", authentification, projectRouter);
router.use("/api/v1/customer", authentification, customerRouter);
router.use("/api/v1/sale", authentification, saleRouter);
router.use("/api/v1/payment", authentification, paymentRouter);
router.use("/api/v1/appointment", authentification, appointmentRouter);
