import express from "express";
import {
  loginAdmin,
  getNeaktiviraniNotari,
  getSviNotari,
} from "../controllers/adminController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/neaktivirani-notari", verifyToken, getNeaktiviraniNotari);
router.get("/svi-notari", verifyToken, getSviNotari);

export default router;
