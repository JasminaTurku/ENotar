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

  // Dodaj kolone u notari tabelu
  console.log("\n📋 Dodavanje kolona u tabelu notari...");

  // Dodaj telefon kolonu
  db.query("ALTER TABLE notari ADD COLUMN telefon VARCHAR(20)", (err) => {
    if (err && err.code !== "ER_DUP_FIELDNAME") {
      console.error("❌ Greška pri dodavanju telefon kolone:", err.message);
    } else if (err && err.code === "ER_DUP_FIELDNAME") {
      console.log("✅ Kolona 'telefon' već postoji");
    } else {
      console.log("✅ Kolona 'telefon' uspešno dodata");
    }

    // Dodaj aktiviran kolonu
    db.query(
      "ALTER TABLE notari ADD COLUMN aktiviran BOOLEAN DEFAULT FALSE",
      (err) => {
        if (err && err.code !== "ER_DUP_FIELDNAME") {
          console.error(
            "❌ Greška pri dodavanju aktiviran kolone:",
            err.message
          );
        } else if (err && err.code === "ER_DUP_FIELDNAME") {
          console.log("✅ Kolona 'aktiviran' već postoji");
        } else {
          console.log("✅ Kolona 'aktiviran' uspešno dodata");
        }

        // Kreiraj tabelu verifikacioni_kodovi
        console.log("\n📋 Kreiranje tabele verifikacioni_kodovi...");
        const createTableQuery = `
        CREATE TABLE IF NOT EXISTS verifikacioni_kodovi (
          id INT AUTO_INCREMENT PRIMARY KEY,
          notar_id INT,
          telefon VARCHAR(20) NOT NULL,
          kod VARCHAR(10) NOT NULL UNIQUE,
          kreiran_datum TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          iskoriscen BOOLEAN DEFAULT FALSE,
          FOREIGN KEY (notar_id) REFERENCES notari(id) ON DELETE CASCADE
        )
      `;

        db.query(createTableQuery, (err) => {
          if (err) {
            console.error("❌ Greška pri kreiranju tabele:", err);
          } else {
            console.log("✅ Tabela 'verifikacioni_kodovi' kreirana/postojala");
          }

          // Prikaz strukture tabela
          console.log("\n📊 Struktura tabele notari:");
          db.query("DESCRIBE notari", (err, results) => {
            if (!err) console.table(results);

            console.log("\n📊 Struktura tabele verifikacioni_kodovi:");
            db.query("DESCRIBE verifikacioni_kodovi", (err, results) => {
              if (!err) console.table(results);

              console.log("\n✅ Sve izmene uspešno primenjene!");
              db.end();
              process.exit(0);
            });
          });
        });
      }
    );
  });
});
