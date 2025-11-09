import "dotenv/config";
import db from "./models/db.js";

// Podaci notara sa slike - dodajem telefone
const notariData = [
  { id: 1, telefon: "0601234567" }, // Marko Marković
  { id: 2, telefon: "0611234567" }, // Jovana Jovanović
  { id: 3, telefon: "0621234567" }, // Nikola Nikolić
  { id: 4, telefon: "0631234567" }, // Ana Anić
  { id: 5, telefon: "0641234567" }, // Petar Perić
  { id: 6, telefon: "0651234567" }, // Janko Jankovic
  { id: 7, telefon: "0661234567" }, // Nemanja Nemanjic
];

console.log("📞 Ažuriranje telefona za postojeće notare...\n");

let processed = 0;

notariData.forEach((notar) => {
  db.query(
    "UPDATE notari SET telefon = ? WHERE id = ?",
    [notar.telefon, notar.id],
    (err, result) => {
      if (err) {
        console.error(`❌ Greška pri ažuriranju notara ID ${notar.id}:`, err);
      } else {
        console.log(
          `✅ Ažuriran notar ID ${notar.id} - Telefon: ${notar.telefon}`
        );
      }

      processed++;

      if (processed === notariData.length) {
        console.log("\n🎉 Svi telefoni su ažurirani!");
        process.exit(0);
      }
    }
  );
});
