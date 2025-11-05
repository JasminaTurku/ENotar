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
    return;
  }
  console.log("✅ Konekcija sa bazom uspostavljena!");
});

export default db;
