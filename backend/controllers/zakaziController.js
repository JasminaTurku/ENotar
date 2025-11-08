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
      z.otkazivanje_notifikacija,
      z.otkazao_korisnik,
      g.ime as gradjanin_ime,
      g.email as gradjanin_email,
      g.jmbg as gradjanin_jmbg
    FROM zakazivanja z
    LEFT JOIN gradjani g ON z.gradjanin_id = g.id
    WHERE z.notar_id = ?
      AND NOT (z.otkazivanje_notifikacija = TRUE AND z.otkazao_korisnik = 'notar')
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
      z.izmena_notifikacija,
      z.otkazivanje_notifikacija,
      z.otkazao_korisnik,
      n.ime as notar_ime,
      n.email as notar_email,
      n.gradovi as notar_grad
    FROM zakazivanja z
    LEFT JOIN notari n ON z.notar_id = n.id
    WHERE z.gradjanin_id = ?
      AND NOT (z.otkazivanje_notifikacija = TRUE AND z.otkazao_korisnik = 'gradjanin')
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

export const updateZakazivanje = (req, res) => {
  const { id } = req.params;
  const { datum, vreme } = req.body;

  console.log("\n=== AŽURIRANJE ZAKAZIVANJA ===");
  console.log("Zakazivanje ID:", id);
  console.log("Novi podaci:", { datum, vreme });

  // Postavi izmena_notifikacija na TRUE kada notar izmeni termin
  const query =
    "UPDATE zakazivanja SET datum = ?, vreme = ?, izmena_notifikacija = TRUE WHERE id = ?";

  db.query(query, [datum, vreme, id], (err, result) => {
    if (err) {
      console.error("❌ Greška pri ažuriranju zakazivanja:", err);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      console.log("⚠️ Zakazivanje nije pronađeno");
      return res.status(404).json({ error: "Zakazivanje nije pronađeno" });
    }
    console.log("✅ Zakazivanje uspešno ažurirano, notifikacija postavljena");
    console.log("==============================\n");
    res.json({ message: "Termin uspešno ažuriran" });
  });
};

export const oznaciNotifikacijuProcitanom = (req, res) => {
  const { id } = req.params;

  console.log("\n=== OZNAČAVANJE NOTIFIKACIJE KAO PROČITANE ===");
  console.log("Zakazivanje ID:", id);

  const query =
    "UPDATE zakazivanja SET izmena_notifikacija = FALSE WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("❌ Greška pri označavanju notifikacije:", err);
      return res.status(500).json({ error: err.message });
    }
    console.log("✅ Notifikacija označena kao pročitana");
    console.log("==============================\n");
    res.json({ message: "Notifikacija pročitana" });
  });
};

export const prihvatiIzmenu = (req, res) => {
  const { id } = req.params;

  console.log("\n=== PRIHVATANJE IZMENJENOG TERMINA ===");
  console.log("Zakazivanje ID:", id);

  // Postavi izmena_notifikacija na FALSE i potvrdi status
  const query =
    "UPDATE zakazivanja SET izmena_notifikacija = FALSE, status = 'zakazano' WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("❌ Greška pri prihvatanju izmene:", err);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      console.log("⚠️ Zakazivanje nije pronađeno");
      return res.status(404).json({ error: "Zakazivanje nije pronađeno" });
    }
    console.log("✅ Građanin je prihvatio izmenjeni termin");
    console.log("==============================\n");
    res.json({ message: "Izmena prihvaćena" });
  });
};

export const deleteZakazivanje = (req, res) => {
  const { id } = req.params;
  const { otkazao } = req.body; // 'notar' ili 'gradjanin'

  console.log("\n=== OTKAZIVANJE TERMINA ===");
  console.log("Zakazivanje ID:", id);
  console.log("Otkazao:", otkazao);

  // Postavi notifikaciju o otkazivanju
  // Termin ostaje u bazi dok druga strana ne potvrdi
  const query = `
    UPDATE zakazivanja 
    SET otkazivanje_notifikacija = TRUE, 
        otkazao_korisnik = ? 
    WHERE id = ?
  `;

  db.query(query, [otkazao, id], (err, result) => {
    if (err) {
      console.error("❌ Greška pri otkazivanju termina:", err);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      console.log("⚠️ Zakazivanje nije pronađeno");
      return res.status(404).json({ error: "Zakazivanje nije pronađeno" });
    }
    console.log(
      `✅ ${
        otkazao === "notar" ? "Notar" : "Građanin"
      } je otkazao termin, notifikacija poslata`
    );
    console.log("==============================\n");
    res.json({ message: "Termin otkazan, druga strana će biti obaveštena" });
  });
};

export const potvrdiBrisanje = (req, res) => {
  const { id } = req.params;

  console.log("\n=== POTVRĐIVANJE I BRISANJE TERMINA ===");
  console.log("Zakazivanje ID:", id);

  // Sada stvarno obriši termin nakon što je korisnik video notifikaciju
  const query = "DELETE FROM zakazivanja WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("❌ Greška pri brisanju termina:", err);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      console.log("⚠️ Zakazivanje nije pronađeno");
      return res.status(404).json({ error: "Zakazivanje nije pronađeno" });
    }
    console.log("✅ Termin uspešno obrisan iz baze");
    console.log("==============================\n");
    res.json({ message: "Termin obrisan" });
  });
};
