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
  const { ime, email, lozinka, grad, telefon } = req.body;

  console.log("\n=== REGISTRACIJA NOTARA ===");
  console.log("Podaci primljeni:", { ime, email, grad, telefon });

  // Validacija
  if (!telefon) {
    return res.status(400).json({ error: "Broj telefona je obavezan" });
  }

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

    // Generiši jedinstveni verifikacioni kod (npr. NOT-XXXX)
    const verifikacioniKod = `NOT-${Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()}`;

    // Insert novog notara sa aktiviran = FALSE
    db.query(
      "INSERT INTO notari (ime, email, lozinka, gradovi, telefon, aktiviran) VALUES (?, ?, ?, ?, ?, FALSE)",
      [ime, email, lozinka, grad, telefon],
      (err, result) => {
        if (err) {
          console.error("❌ Greška pri dodavanju notara:", err);
          return res.status(500).json({ error: err.message });
        }

        const notarId = result.insertId;
        console.log("✅ Notar uspešno kreiran (NEAKTIVIRAN)! ID:", notarId);

        // Sačuvaj verifikacioni kod u tabeli
        db.query(
          "INSERT INTO verifikacioni_kodovi (notar_id, telefon, kod) VALUES (?, ?, ?)",
          [notarId, telefon, verifikacioniKod],
          (err) => {
            if (err) {
              console.error("❌ Greška pri čuvanju verifikacionog koda:", err);
              // Obriši notara ako kod nije sačuvan
              db.query("DELETE FROM notari WHERE id = ?", [notarId]);
              return res
                .status(500)
                .json({ error: "Greška pri generisanju koda" });
            }

            console.log(`✅ Verifikacioni kod generisan: ${verifikacioniKod}`);
            console.log(`📱 Admin treba da pošalje SMS na: ${telefon}`);
            console.log("==========================\n");

            res.status(201).json({
              message:
                "Registracija uspešna! Unesite aktivacioni kod koji ste dobili na telefon.",
              notarId: notarId,
              telefon: telefon,
              // U produkciji NE vraćati kod klijentu! Ovo je samo za demo
              // Admin bi trebao da pošalje SMS sa kodom
              _devKod: verifikacioniKod, // Samo za development
            });
          }
        );
      }
    );
  });
};

// Proveri status notara po email-u
export const proveriStatus = (req, res) => {
  const { email } = req.params;

  console.log("\n=== PROVERA STATUSA NOTARA ===");
  console.log("Email:", email);

  db.query(
    "SELECT id, ime, email, status, aktiviran FROM notari WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        console.error("❌ Greška pri proveri statusa:", err);
        return res.status(500).json({ error: "Greška u bazi" });
      }

      if (results.length === 0) {
        console.log("❌ Notar ne postoji");
        return res.json({ exists: false });
      }

      const notar = results[0];
      console.log("✅ Notar pronađen:", {
        id: notar.id,
        ime: notar.ime,
        status: notar.status,
        aktiviran: notar.aktiviran,
      });
      console.log("==========================\n");

      res.json({
        exists: true,
        id: notar.id,
        ime: notar.ime,
        email: notar.email,
        status: notar.status,
        aktiviran: notar.aktiviran,
      });
    }
  );
};

export const aktivirajNotar = (req, res) => {
  const { notarId, kod } = req.body;

  console.log("\n=== AKTIVACIJA NOTARA ===");
  console.log("Notar ID:", notarId);
  console.log("Kod primljen:", kod);

  // Proveri da li kod postoji i da li je za ovog notara
  db.query(
    "SELECT * FROM verifikacioni_kodovi WHERE notar_id = ? AND kod = ? AND iskoriscen = FALSE",
    [notarId, kod],
    (err, results) => {
      if (err) {
        console.error("❌ Greška pri proveri koda:", err);
        return res.status(500).json({ error: "Greška pri validaciji koda" });
      }

      if (results.length === 0) {
        console.log("❌ Neispravan ili iskorišćen kod!");
        return res.status(400).json({ error: "Neispravan aktivacioni kod" });
      }

      // Aktiviraj notara
      db.query(
        "UPDATE notari SET aktiviran = TRUE, status = 'activated' WHERE id = ?",
        [notarId],
        (err) => {
          if (err) {
            console.error("❌ Greška pri aktivaciji notara:", err);
            return res.status(500).json({ error: "Greška pri aktivaciji" });
          }

          // Označi kod kao iskorišćen
          db.query(
            "UPDATE verifikacioni_kodovi SET iskoriscen = TRUE WHERE notar_id = ?",
            [notarId],
            (err) => {
              if (err) {
                console.error("❌ Greška pri označavanju koda:", err);
              }

              console.log("✅ Notar uspešno aktiviran!");
              console.log("==========================\n");

              // Vrati podatke notara
              db.query(
                "SELECT id, ime, email, gradovi, telefon FROM notari WHERE id = ?",
                [notarId],
                (err, notarResults) => {
                  if (err || notarResults.length === 0) {
                    return res
                      .status(200)
                      .json({ message: "Nalog aktiviran!" });
                  }

                  res.status(200).json({
                    message: "Nalog uspešno aktiviran!",
                    notar: notarResults[0],
                  });
                }
              );
            }
          );
        }
      );
    }
  );
};
