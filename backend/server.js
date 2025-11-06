import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import gradjaniRoute from "./routes/gradjani.js";
import notariRoute from "./routes/notari.js";
import zakaziRoute from "./routes/zakazi.js";
import db from "./models/db.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" })); // Povećan limit za Base64 dokumente
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Rute
app.use("/api/gradjani", gradjaniRoute);
app.use("/api/notari", notariRoute);
app.use("/api/zakazi", zakaziRoute);
app.use("/api/zakazivanje", zakaziRoute); // Alternativna ruta za kompatibilnost

// Test ruta
app.get("/", (req, res) => {
  res.send("✅ e-Notar backend radi!");
});

// Pokretanje servera
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server radi na portu ${PORT}`));
