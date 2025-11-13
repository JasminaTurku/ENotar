import db from "../models/db.js";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../services/emailService.js";

// Funkcija za generisanje verifikacionog koda
function generateVerificationCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "NOT-";
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

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

// Pošalji verifikacioni kod notaru putem email-a
export const posaljiKod = async (req, res) => {
  const { notarId } = req.params;

  console.log("\n=== ADMIN: Slanje verifikacionog koda ===");
  console.log("Notar ID:", notarId);

  try {
    // Prvo proveri da li notar postoji
    db.query(
      "SELECT id, ime, email, telefon, aktiviran, status FROM notari WHERE id = ?",
      [notarId],
      async (err, results) => {
        if (err) {
          console.error("❌ Greška pri preuzimanju notara:", err);
          return res.status(500).json({ error: "Greška u bazi" });
        }

        if (results.length === 0) {
          console.log("❌ Notar nije pronađen");
          return res.status(404).json({ error: "Notar nije pronađen" });
        }

        const notar = results[0];

        if (notar.aktiviran) {
          console.log("❌ Notar je već aktiviran");
          return res.status(400).json({ error: "Notar je već aktiviran" });
        }

        // Generiši novi kod
        const kod = generateVerificationCode();
        console.log("🔑 Generisan kod:", kod);

        // Proveri da li već postoji kod za ovog notara
        db.query(
          "SELECT id FROM verifikacioni_kodovi WHERE notar_id = ? AND iskoriscen = FALSE",
          [notarId],
          async (err, existingCodes) => {
            if (err) {
              console.error("❌ Greška pri proveri postojećih kodova:", err);
              return res.status(500).json({ error: "Greška u bazi" });
            }

            if (existingCodes.length > 0) {
              // Ažuriraj postojeći kod
              db.query(
                "UPDATE verifikacioni_kodovi SET kod = ?, kreiran_datum = NOW() WHERE id = ?",
                [kod, existingCodes[0].id],
                async (err) => {
                  if (err) {
                    console.error("❌ Greška pri ažuriranju koda:", err);
                    return res.status(500).json({ error: "Greška u bazi" });
                  }

                  // Pošalji email
                  await sendEmailAndRespond(
                    notar.email,
                    notar.ime,
                    kod,
                    notarId,
                    res
                  );
                }
              );
            } else {
              // Kreiraj novi kod
              db.query(
                "INSERT INTO verifikacioni_kodovi (notar_id, telefon, kod, kreiran_datum, iskoriscen) VALUES (?, ?, ?, NOW(), FALSE)",
                [notarId, notar.telefon, kod],
                async (err) => {
                  if (err) {
                    console.error("❌ Greška pri kreiranju koda:", err);
                    return res.status(500).json({ error: "Greška u bazi" });
                  }

                  // Pošalji email
                  await sendEmailAndRespond(
                    notar.email,
                    notar.ime,
                    kod,
                    notarId,
                    res
                  );
                }
              );
            }
          }
        );
      }
    );
  } catch (error) {
    console.error("❌ Greška:", error);
    res.status(500).json({ error: "Došlo je do greške" });
  }
};

// Pomoćna funkcija za slanje email-a i odgovor
async function sendEmailAndRespond(email, ime, kod, notarId, res) {
  try {
    // Pošalji email
    await sendVerificationEmail(email, ime, kod);

    // Ažuriraj status notara
    db.query(
      "UPDATE notari SET status = 'code_sent' WHERE id = ?",
      [notarId],
      (err) => {
        if (err) {
          console.error("❌ Greška pri ažuriranju statusa:", err);
        } else {
          console.log("✅ Status notara ažuriran na 'code_sent'");
        }
      }
    );

    console.log("✅ Email uspešno poslat");
    console.log("=========================================\n");

    res.json({
      success: true,
      message: `Verifikacioni kod je poslat na email: ${email}`,
      kod: kod, // Za development - u production ukloni ovo
    });
  } catch (emailError) {
    console.error("❌ Greška pri slanju email-a:", emailError);
    res.status(500).json({
      error:
        "Kod je generisan ali email nije mogao biti poslat. Proverite email konfiguraciju.",
      kod: kod, // Daj admin-u kod da može ručno poslati
    });
  }
}
