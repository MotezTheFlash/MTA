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
router.use("/api/v1/users", authentification, isAdmin, userRouter);
router.use("/api/v1/developers", authentification, developerRouter);
router.use("/api/v1/programs", authentification, programRouter);
router.use("/api/v1/projects", authentification, projectRouter);
router.use("/api/v1/customers", authentification, customerRouter);
router.use("/api/v1/sales", authentification, saleRouter);
router.use("/api/v1/payments", authentification, paymentRouter);
router.use("/api/v1/appointments", authentification, appointmentRouter);
