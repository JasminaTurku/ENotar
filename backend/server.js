import express from "express";
import cors from "cors";
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

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
  console.log("✅ Uspostavljena konekcija sa MySQL bazom!");
});

app.get("/", (req, res) => {
  res.send("e-Notar backend radi!");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server radi na portu ${PORT}`));

// app.post("/api/zakazi", (req, res) => {
//   const { gradjanin_id, notar_id, vrsta_overe, datum, vreme } = req.body;
//   const sql =
//     "INSERT INTO zakazivanja (gradjanin_id, notar_id, vrsta_overe, datum, vreme) VALUES (?, ?, ?, ?, ?)";
//   db.query(sql, [gradjanin_id, notar_id, vrsta_overe, datum, vreme], (err) => {
//     if (err)
//       return res.status(500).json({ success: false, message: err.message });
//     res.json({ success: true, message: "✅ Termin uspešno zakazan!" });
//   });
// });

// // 🔹 Ruta za prikaz zakazivanja (npr. notar vidi sve svoje)
// app.get("/api/zakazivanja/:notar_id", (req, res) => {
//   const sql = "SELECT * FROM zakazivanja WHERE notar_id = ?";
//   db.query(sql, [req.params.notar_id], (err, results) => {
//     if (err)
//       return res.status(500).json({ success: false, message: err.message });
//     res.json(results);
//   });
// });

// app.listen(5000, () => console.log("🚀 Server radi na portu 5000"));
