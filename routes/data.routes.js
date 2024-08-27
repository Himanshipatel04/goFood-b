import { Router } from "express";
import fetchData from "../controllers/items.controller";

const router = Router()


router.route("/getdata").get(fetchData)

export default router