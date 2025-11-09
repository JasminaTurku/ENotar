import db from "../models/db.js";
import jwt from "jsonwebtoken";

// Admin login
export const loginAdmin = (req, res) => {
  const { korisnicko_ime, lozinka } = req.body;

  console.log("\n=== ADMIN LOGIN ===");
  console.log("Korisničko ime:", korisnicko_ime);

  db.query(
    "SELECT * FROM admini WHERE korisnicko_ime = ?",
    [korisnicko_ime],
    (err, results) => {
      if (err) {
        console.error("❌ Greška pri login-u:", err);
        return res.status(500).json({ error: "Greška u bazi" });
      }

      if (results.length === 0) {
        console.log("❌ Admin nije pronađen");
        return res.status(404).json({ error: "Pogrešno korisničko ime" });
      }

      const admin = results[0];

      // U produkciji ovde bi trebalo koristiti bcrypt
      if (admin.lozinka !== lozinka) {
        console.log("❌ Pogrešna lozinka");
        return res.status(401).json({ error: "Pogrešna lozinka" });
      }

      console.log("✅ Admin uspešno prijavljen");

      // Generiši JWT token
      const token = jwt.sign(
        { id: admin.id, korisnicko_ime: admin.korisnicko_ime, type: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      console.log("✅ Token generisan");
      console.log("====================\n");

      // Ne šalji lozinku klijentu
      const { lozinka: _, ...adminData } = admin;
      res.json({ admin: adminData, token, type: "admin" });
    }
  );
};

// Dobavi sve neaktivirane notare sa kodovima
export const getNeaktiviraniNotari = (req, res) => {
  console.log("\n=== ADMIN: Preuzimanje neaktiviranih notara ===");

  const query = `
    SELECT 
      n.id,
      n.ime,
      n.email,
      n.gradovi,
      n.telefon,
      n.aktiviran,
      v.kod,
      v.kreiran_datum,
      v.iskoriscen
    FROM notari n
    LEFT JOIN verifikacioni_kodovi v ON n.id = v.notar_id
    WHERE n.aktiviran = FALSE
    ORDER BY v.kreiran_datum DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Greška pri preuzimanju notara:", err);
      return res.status(500).json({ error: "Greška u bazi" });
    }

    console.log(`✅ Pronađeno ${results.length} neaktiviranih notara`);
    console.log("===============================================\n");
    res.json(results);
  });
};

// Dobavi sve notare (aktivirane i neaktivirane)
export const getSviNotari = (req, res) => {
  console.log("\n=== ADMIN: Preuzimanje svih notara ===");

  const query = `
    SELECT 
      n.id,
      n.ime,
      n.email,
      n.gradovi,
      n.telefon,
      n.aktiviran,
      v.kod,
      v.kreiran_datum,
      v.iskoriscen
    FROM notari n
    LEFT JOIN verifikacioni_kodovi v ON n.id = v.notar_id
    ORDER BY n.aktiviran ASC, v.kreiran_datum DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Greška pri preuzimanju notara:", err);
      return res.status(500).json({ error: "Greška u bazi" });
    }

    console.log(`✅ Pronađeno ukupno ${results.length} notara`);
    console.log("======================================\n");
    res.json(results);
  });
};
