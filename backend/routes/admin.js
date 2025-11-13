import express from "express";
import {
  loginAdmin,
  getNeaktiviraniNotari,
  getSviNotari,
  posaljiKod,
} from "../controllers/adminController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/neaktivirani-notari", verifyToken, getNeaktiviraniNotari);
router.get("/svi-notari", verifyToken, getSviNotari);
router.post("/posalji-kod/:notarId", verifyToken, posaljiKod);

export default router;
