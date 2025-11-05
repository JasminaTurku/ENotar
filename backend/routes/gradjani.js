import express from "express";
import {
  getGradjani,
  addGradjanin,
  searchGradjani,
} from "../controllers/gradjaniController.js";
const router = express.Router();

router.get("/", getGradjani);
router.get("/search", searchGradjani);
router.post("/", addGradjanin);

export default router;
