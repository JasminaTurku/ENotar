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

  // Kreiraj tabelu admini
  console.log("\n📋 Kreiranje tabele admini...");
  const createAdminTableQuery = `
    CREATE TABLE IF NOT EXISTS admini (
      id INT AUTO_INCREMENT PRIMARY KEY,
      korisnicko_ime VARCHAR(50) NOT NULL UNIQUE,
      lozinka VARCHAR(255) NOT NULL,
      email VARCHAR(100),
      kreiran_datum TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.query(createAdminTableQuery, (err) => {
    if (err) {
      console.error("❌ Greška pri kreiranju tabele:", err);
      db.end();
      process.exit(1);
    }

    console.log("✅ Tabela 'admini' kreirana/postojala");

    // Dodaj default admin nalog (korisnicko_ime: admin, lozinka: admin123)
    console.log("\n📋 Dodavanje default admin naloga...");
    const insertAdminQuery = `
      INSERT INTO admini (korisnicko_ime, lozinka, email)
      VALUES ('admin', 'admin123', 'admin@enotar.rs')
      ON DUPLICATE KEY UPDATE korisnicko_ime = korisnicko_ime
    `;

    db.query(insertAdminQuery, (err) => {
      if (err) {
        console.error("❌ Greška pri dodavanju admin naloga:", err);
      } else {
        console.log("✅ Default admin nalog kreiran");
        console.log("   Korisničko ime: admin");
        console.log("   Lozinka: admin123");
      }

      // Prikaz strukture tabele
      console.log("\n📊 Struktura tabele admini:");
      db.query("DESCRIBE admini", (err, results) => {
        if (!err) console.table(results);

        console.log("\n✅ Admin setup završen!");
        db.end();
        process.exit(0);
      });
    });
  });
});
