import express from "express";
import {
  addZakazivanje,
  getZakazivanjaByNotar,
  getZakazivanjaByGradjanin,
} from "../controllers/zakaziController.js";

const router = express.Router();

router.post("/", addZakazivanje);
router.get("/notar/:notar_id", getZakazivanjaByNotar);
router.get("/gradjanin/:gradjanin_id", getZakazivanjaByGradjanin);

export default router;
