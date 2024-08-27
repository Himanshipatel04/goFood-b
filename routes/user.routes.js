import { Router } from "express";
import { body } from "express-validator";
import { createUser, login } from "../controllers/user.controller";

const router = Router();

router
  .route("/createUser")
  .post(
    body("email").isEmail(),
    body("password","Short password!").isLength({ min: 6 }),
    createUser
  );

router.route("/login").post(login)

export default router;
