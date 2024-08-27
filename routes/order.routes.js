import { Router } from "express";
import fetchOrder from "../controllers/order.controller";

const router = Router()

router.route("/orderData").post(fetchOrder)

export default router 