import db from "../models/db.js";

export const getNotari = (req, res) => {
  db.query("SELECT * FROM notari", (err, results) => {
    if (err) {
      console.error("Greška pri dohvatanju notara:", err);
      return res.status(500).json({ error: "Greška u bazi" });
    }
    res.json(results);
  });
};

export const searchNotari = (req, res) => {
  const { ime } = req.query;

  if (!ime) {
    return res.status(400).json({ error: "Parametar 'ime' je obavezan" });
  }

  db.query(
    "SELECT * FROM notari WHERE ime LIKE ?",
    [`%${ime}%`],
    (err, results) => {
      if (err) {
        console.error("Greška pri pretrazi notara:", err);
        return res.status(500).json({ error: "Greška u bazi" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "Notar nije pronađen" });
      }

      res.json(results[0]); // Vraćamo prvog notara koji se poklapa
    }
  );
};

export const addNotar = (req, res) => {
  const { ime, email, lozinka } = req.body;
  db.query(
    "INSERT INTO notari (ime, email, lozinka) VALUES (?, ?, ?)",
    [ime, email, lozinka],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Notar dodat", id: result.insertId });
    }
  );
};
