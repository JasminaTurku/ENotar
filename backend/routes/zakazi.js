import express from "express";
import {
  addZakazivanje,
  getZakazivanjaByNotar,
  getZakazivanjaByGradjanin,
  updateZakazivanje,
  updateStatus,
  oznaciNotifikacijuProcitanom,
  prihvatiIzmenu,
  deleteZakazivanje,
  potvrdiBrisanje,
} from "../controllers/zakaziController.js";

const router = express.Router();

router.post("/", addZakazivanje);
router.get("/notar/:notar_id", getZakazivanjaByNotar);
router.get("/gradjanin/:gradjanin_id", getZakazivanjaByGradjanin);
router.put("/:id", updateZakazivanje);
router.patch("/:id/status", updateStatus);
router.patch("/:id/procitano", oznaciNotifikacijuProcitanom);
router.patch("/:id/prihvati", prihvatiIzmenu);
router.delete("/:id", deleteZakazivanje);
router.delete("/:id/potvrdi", potvrdiBrisanje);

export default router;
