import { Router } from "express";
import { loginHandler } from "../controller/loginHandler";
import { registerHandler } from "../controller/registerHandler";

const router = Router();

router.post("/login", loginHandler);
router.post("/register", registerHandler);

export default router;
