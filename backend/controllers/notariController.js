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
  const { ime, email } = req.query;

  // Pretraga po email-u (za login)
  if (email) {
    console.log(`\n=== PRETRAGA NOTARA PO EMAIL-U ===`);
    console.log(`Email primljen: "${email}"`);

    db.query(
      "SELECT * FROM notari WHERE email = ?",
      [email],
      (err, results) => {
        if (err) {
          console.error("Greška pri pretrazi notara po email-u:", err);
          return res.status(500).json({ error: "Greška u bazi" });
        }

        if (results.length === 0) {
          console.log(`❌ Notar nije pronađen sa email: ${email}`);
          return res.status(404).json({ error: "Notar nije pronađen" });
        }

        console.log(`✅ Notar pronađen:`, results[0]);
        res.json(results[0]);
      }
    );
    return;
  }

  // Pretraga po imenu
  if (!ime) {
    return res
      .status(400)
      .json({ error: "Parametar 'ime' ili 'email' je obavezan" });
  }

  // Pretraga po punom imenu
  db.query(
    "SELECT * FROM notari WHERE ime = ? OR ime LIKE ?",
    [ime, `%${ime}%`],
    (err, results) => {
      if (err) {
        console.error("Greška pri pretrazi notara:", err);
        return res.status(500).json({ error: "Greška u bazi" });
      }

      if (results.length === 0) {
        console.log(`Notar nije pronađen sa imenom: ${ime}`);
        return res.status(404).json({ error: "Notar nije pronađen" });
      }

      console.log(`Notar pronađen:`, results[0]);
      res.json(results[0]); // Vraćamo prvog notara koji se poklapa
    }
  );
};

export const addNotar = (req, res) => {
  const { ime, email, lozinka, grad } = req.body;

  console.log("\n=== REGISTRACIJA NOTARA ===");
  console.log("Podaci primljeni:", { ime, email, grad });

  // Provera da li email već postoji
  db.query("SELECT * FROM notari WHERE email = ?", [email], (err, existing) => {
    if (err) {
      console.error("Greška pri proveri email-a:", err);
      return res.status(500).json({ error: err.message });
    }

    if (existing.length > 0) {
      console.log("❌ Email već postoji u bazi");
      return res.status(400).json({ error: "Email već postoji" });
    }

    // Insert novog notara (kolona u bazi je 'gradovi' ne 'grad')
    db.query(
      "INSERT INTO notari (ime, email, lozinka, gradovi) VALUES (?, ?, ?, ?)",
      [ime, email, lozinka, grad],
      (err, result) => {
        if (err) {
          console.error("❌ Greška pri dodavanju notara:", err);
          return res.status(500).json({ error: err.message });
        }
        console.log("✅ Notar uspešno dodat! ID:", result.insertId);
        console.log("==========================\n");
        res
          .status(201)
          .json({ message: "Notar uspešno registrovan", id: result.insertId });
      }
    );
  });
};
