import express from "express";
import {
  getNotari,
  addNotar,
  searchNotari,
} from "../controllers/notariController.js";
const router = express.Router();

router.get("/", getNotari);
router.get("/search", searchNotari);
router.post("/", addNotar);

export default router;
