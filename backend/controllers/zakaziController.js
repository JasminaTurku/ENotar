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

export const getZakazivanjaByNotar = (req, res) => {
  const { notar_id } = req.params;

  console.log("\n=== PREUZIMANJE ZAKAZIVANJA ZA NOTARA ===");
  console.log("Notar ID:", notar_id);

  const query = `
    SELECT 
      z.id,
      z.gradjanin_id,
      z.vrsta_overe,
      z.datum,
      z.vreme,
      z.status,
      z.dokument,
      g.ime as gradjanin_ime,
      g.email as gradjanin_email,
      g.jmbg as gradjanin_jmbg
    FROM zakazivanja z
    LEFT JOIN gradjani g ON z.gradjanin_id = g.id
    WHERE z.notar_id = ?
    ORDER BY z.datum DESC, z.vreme DESC
  `;

  db.query(query, [notar_id], (err, results) => {
    if (err) {
      console.error("❌ Greška pri preuzimanju zakazivanja:", err);
      return res.status(500).json({ error: err.message });
    }
    console.log(
      `✅ Pronađeno ${results.length} zakazivanja za notara ID ${notar_id}`
    );
    console.log("==============================\n");
    res.json(results);
  });
};

export const getZakazivanjaByGradjanin = (req, res) => {
  const { gradjanin_id } = req.params;

  console.log("\n=== PREUZIMANJE ZAKAZIVANJA ZA GRAĐANINA ===");
  console.log("Građanin ID:", gradjanin_id);

  const query = `
    SELECT 
      z.id,
      z.notar_id,
      z.vrsta_overe,
      z.datum,
      z.vreme,
      z.status,
      z.dokument,
      n.ime as notar_ime,
      n.email as notar_email,
      n.gradovi as notar_grad
    FROM zakazivanja z
    LEFT JOIN notari n ON z.notar_id = n.id
    WHERE z.gradjanin_id = ?
    ORDER BY z.datum DESC, z.vreme DESC
  `;

  db.query(query, [gradjanin_id], (err, results) => {
    if (err) {
      console.error("❌ Greška pri preuzimanju zakazivanja:", err);
      return res.status(500).json({ error: err.message });
    }
    console.log(
      `✅ Pronađeno ${results.length} zakazivanja za građanina ID ${gradjanin_id}`
    );
    console.log("==============================\n");
    res.json(results);
  });
};
