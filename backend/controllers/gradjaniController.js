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
  const { ime, email, lozinka, jmbg } = req.body;

  console.log("\n=== REGISTRACIJA GRAĐANINA ===");
  console.log("Podaci primljeni:", { ime, email, jmbg });

  // Provera da li JMBG već postoji
  db.query("SELECT * FROM gradjani WHERE jmbg = ?", [jmbg], (err, existing) => {
    if (err) {
      console.error("Greška pri proveri JMBG-a:", err);
      return res.status(500).json({ error: err.message });
    }

    if (existing.length > 0) {
      console.log("❌ JMBG već postoji u bazi");
      return res.status(400).json({ error: "JMBG već postoji" });
    }

    // Provera da li email već postoji
    db.query(
      "SELECT * FROM gradjani WHERE email = ?",
      [email],
      (err, existingEmail) => {
        if (err) {
          console.error("Greška pri proveri email-a:", err);
          return res.status(500).json({ error: err.message });
        }

        if (existingEmail.length > 0) {
          console.log("❌ Email već postoji u bazi");
          return res.status(400).json({ error: "Email već postoji" });
        }

        // Insert novog građanina
        db.query(
          "INSERT INTO gradjani (ime, email, lozinka, jmbg) VALUES (?, ?, ?, ?)",
          [ime, email, lozinka, jmbg],
          (err, result) => {
            if (err) {
              console.error("❌ Greška pri dodavanju građanina:", err);
              return res.status(500).json({ error: err.message });
            }
            console.log("✅ Građanin uspešno dodat! ID:", result.insertId);
            console.log("================================\n");
            res.status(201).json({
              message: "Građanin uspešno registrovan",
              id: result.insertId,
            });
          }
        );
      }
    );
  });
};

export const searchGradjani = (req, res) => {
  const { ime, jmbg, email } = req.query;

  // Pretraga po email-u (za login)
  if (email) {
    console.log(`\n=== PRETRAGA GRAĐANINA PO EMAIL-U ===`);
    console.log(`Email primljen: "${email}"`);

    db.query(
      "SELECT * FROM gradjani WHERE email = ?",
      [email],
      (err, results) => {
        if (err) {
          console.error("Greška pri pretrazi građana po email-u:", err);
          return res.status(500).json({ error: "Greška u bazi" });
        }

        if (results.length === 0) {
          console.log(`❌ Građanin nije pronađen sa email: ${email}`);
          return res.status(404).json({ error: "Građanin nije pronađen" });
        }

        console.log(`✅ Građanin pronađen:`, results[0]);
        res.json(results[0]);
      }
    );
    return;
  }

  // Pretraga po JMBG-u (prioritet)
  if (jmbg) {
    console.log(`\n=== PRETRAGA GRAĐANINA ===`);
    console.log(`JMBG primljen: "${jmbg}"`);
    console.log(`Tip podatka: ${typeof jmbg}`);
    console.log(`Dužina: ${jmbg.length}`);

    db.query("SELECT * FROM gradjani", (err, allResults) => {
      if (!err) {
        console.log(`\nSvi građani u bazi:`);
        allResults.forEach((g) => {
          console.log(
            `- ID: ${g.id}, Ime: ${g.ime}, JMBG: "${
              g.jmbg
            }" (tip: ${typeof g.jmbg})`
          );
        });
      }

      // Sada poredimo
      db.query(
        "SELECT * FROM gradjani WHERE CAST(jmbg AS CHAR) = ?",
        [String(jmbg)],
        (err, results) => {
          if (err) {
            console.error("Greška pri pretrazi građana po JMBG-u:", err);
            return res.status(500).json({ error: "Greška u bazi" });
          }

          if (results.length === 0) {
            console.log(`\n❌ Građanin NIJE pronađen sa JMBG: ${jmbg}\n`);
            return res.status(404).json({ error: "Građanin nije pronađen" });
          }

          console.log(`\n✅ Građanin pronađen:`, results[0]);
          console.log(`===========================\n`);
          res.json(results[0]);
        }
      );
    });
    return;
  }

  // Pretraga po imenu (alternativa)
  if (ime) {
    db.query(
      "SELECT * FROM gradjani WHERE ime LIKE ?",
      [`%${ime}%`],
      (err, results) => {
        if (err) {
          console.error("Greška pri pretrazi građana po imenu:", err);
          return res.status(500).json({ error: "Greška u bazi" });
        }

        if (results.length === 0) {
          return res.status(404).json({ error: "Građanin nije pronađen" });
        }

        res.json(results[0]);
      }
    );
    return;
  }

  return res
    .status(400)
    .json({ error: "Parametar 'ime' ili 'jmbg' je obavezan" });
};
