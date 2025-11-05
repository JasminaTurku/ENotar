import db from "../models/db.js";

export const getGradjani = (req, res) => {
  db.query("SELECT * FROM gradjani", (err, results) => {
    if (err) {
      console.error("Greška pri dohvatanju građana:", err);
      return res.status(500).json({ error: "Greška u bazi" });
    }
    res.json(results);
  });
};

export const addGradjanin = (req, res) => {
  const { ime, email, lozinka } = req.body;
  db.query(
    "INSERT INTO gradjani (ime, email, lozinka) VALUES (?, ?, ?)",
    [ime, email, lozinka],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Građanin dodat", id: result.insertId });
    }
  );
};

export const searchGradjani = (req, res) => {
  const { ime } = req.query;

  if (!ime) {
    return res.status(400).json({ error: "Parametar 'ime' je obavezan" });
  }

  db.query(
    "SELECT * FROM gradjani WHERE ime LIKE ?",
    [`%${ime}%`],
    (err, results) => {
      if (err) {
        console.error("Greška pri pretrazi građana:", err);
        return res.status(500).json({ error: "Greška u bazi" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "Građanin nije pronađen" });
      }

      res.json(results[0]); // Vraćamo prvog građanina koji se poklapa
    }
  );
};
