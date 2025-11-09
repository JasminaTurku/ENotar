import express from "express";
import {
  getNotari,
  addNotar,
  searchNotari,
  aktivirajNotar,
} from "../controllers/notariController.js";
const router = express.Router();

router.get("/", getNotari);
router.get("/search", searchNotari);
router.post("/", addNotar);
router.post("/aktiviraj", aktivirajNotar);

export default router;
