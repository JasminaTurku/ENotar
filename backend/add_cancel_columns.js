import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Greška pri konekciji na bazu:", err);
    process.exit(1);
  }
  console.log("✅ Konekcija sa bazom uspostavljena!");

  // Dodaj kolone
  const sql = `
    ALTER TABLE zakazivanja 
    ADD COLUMN otkazivanje_notifikacija BOOLEAN DEFAULT FALSE,
    ADD COLUMN otkazao_korisnik VARCHAR(20)
  `;

  db.query(sql, (err, result) => {
    if (err) {
      // Proveravamo da li kolone već postoje
      if (err.code === "ER_DUP_FIELDNAME") {
        console.log("⚠️ Kolone već postoje!");
      } else {
        console.error("❌ Greška pri dodavanju kolona:", err);
        db.end();
        process.exit(1);
      }
    } else {
      console.log("✅ Kolone uspešno dodate!");
    }

    // Prikaz strukture tabele
    db.query("DESCRIBE zakazivanja", (err, results) => {
      if (err) {
        console.error("❌ Greška pri pregledu tabele:", err);
      } else {
        console.log("\n📋 Struktura tabele zakazivanja:");
        console.table(results);
      }
      db.end();
      process.exit(0);
    });
  });
});
