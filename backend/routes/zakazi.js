import express from "express";
import { addZakazivanje } from "../controllers/zakaziController.js";

const router = express.Router();

router.post("/", addZakazivanje);

export default router;
