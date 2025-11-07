import express from "express";
import {
  addZakazivanje,
  getZakazivanjaByNotar,
  getZakazivanjaByGradjanin,
  updateZakazivanje,
  oznaciNotifikacijuProcitanom,
  prihvatiIzmenu,
  deleteZakazivanje,
} from "../controllers/zakaziController.js";

const router = express.Router();

router.post("/", addZakazivanje);
router.get("/notar/:notar_id", getZakazivanjaByNotar);
router.get("/gradjanin/:gradjanin_id", getZakazivanjaByGradjanin);
router.put("/:id", updateZakazivanje);
router.patch("/:id/procitano", oznaciNotifikacijuProcitanom);
router.patch("/:id/prihvati", prihvatiIzmenu);
router.delete("/:id", deleteZakazivanje);

export default router;
