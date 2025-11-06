import db from "../models/db.js";

export const addZakazivanje = (req, res) => {
  const {
    gradjanin_id,
    notar_id,
    vrsta_overe,
    datum,
    vreme,
    status,
    dokument,
  } = req.body;

  console.log("\n=== KREIRANJE ZAKAZIVANJA ===");
  console.log("Podaci primljeni:", {
    gradjanin_id,
    notar_id,
    vrsta_overe,
    datum,
    vreme,
    status,
    dokument: dokument
      ? `${dokument.substring(0, 50)}... (${dokument.length} chars)`
      : null,
  });

  db.query(
    "INSERT INTO zakazivanja (gradjanin_id, notar_id, vrsta_overe, datum, vreme, status, dokument) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [gradjanin_id, notar_id, vrsta_overe, datum, vreme, status, dokument],
    (err, result) => {
      if (err) {
        console.error("❌ Greška pri kreiranju zakazivanja:", err);
        return res.status(500).json({ error: err.message });
      }
      console.log("✅ Termin uspešno zakazan! ID:", result.insertId);
      console.log("==============================\n");
      res.status(201).json({ message: "Termin zakazan", id: result.insertId });
    }
  );
};
