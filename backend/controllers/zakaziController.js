import db from "../models/db.js";

export const addZakazivanje = (req, res) => {
  const { gradjanin_id, notar_id, vrsta_overe, datum, vreme, status } =
    req.body;

  db.query(
    "INSERT INTO zakazi (gradjanin_id, notar_id, vrsta_overe, datum, vreme, status) VALUES (?, ?, ?, ?, ?, ?)",
    [gradjanin_id, notar_id, vrsta_overe, datum, vreme, status],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Termin zakazan", id: result.insertId });
    }
  );
};
