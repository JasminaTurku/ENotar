import "dotenv/config";
import db from "./models/db.js";

// Funkcija za generisanje verifikacionog koda
function generateVerificationCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "NOT-";
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

// Lista notara koji nemaju kodove (ID-evi iz slike)
const notariIds = [1, 2, 3, 4, 5, 6, 7];

console.log("📋 Dodavanje verifikacionih kodova za postojeće notare...\n");

// Proveri koji notari već imaju kodove
db.query(
  "SELECT notar_id FROM verifikacioni_kodovi WHERE notar_id IN (?)",
  [notariIds],
  (err, existingCodes) => {
    if (err) {
      console.error("❌ Greška pri proveri postojećih kodova:", err);
      process.exit(1);
    }

    const existingIds = existingCodes.map((row) => row.notar_id);
    const notariWithoutCodes = notariIds.filter(
      (id) => !existingIds.includes(id)
    );

    if (notariWithoutCodes.length === 0) {
      console.log("✅ Svi notari već imaju kodove!");
      process.exit(0);
    }

    console.log(
      `🔍 Pronađeno ${notariWithoutCodes.length} notara bez kodova\n`
    );

    // Dodaj kodove za notare koji ih nemaju
    let processed = 0;

    notariWithoutCodes.forEach((notarId) => {
      // Prvo dohvati telefon notara
      db.query(
        "SELECT id, ime, telefon FROM notari WHERE id = ?",
        [notarId],
        (err, notarResults) => {
          if (err || notarResults.length === 0) {
            console.error(`❌ Greška pri dohvatanju notara ID ${notarId}`);
            processed++;
            checkIfDone();
            return;
          }

          const notar = notarResults[0];
          const kod = generateVerificationCode();

          // Dodaj kod u bazu
          db.query(
            `INSERT INTO verifikacioni_kodovi (notar_id, telefon, kod, kreiran_datum, iskoriscen) 
             VALUES (?, ?, ?, NOW(), FALSE)`,
            [notarId, notar.telefon, kod],
            (err, result) => {
              if (err) {
                console.error(
                  `❌ Greška pri dodavanju koda za ${notar.ime}:`,
                  err
                );
              } else {
                console.log(`✅ ${notar.ime} (ID: ${notarId})`);
                console.log(`   📞 Telefon: ${notar.telefon}`);
                console.log(`   🔑 Kod: ${kod}\n`);
              }

              processed++;
              checkIfDone();
            }
          );
        }
      );
    });

    function checkIfDone() {
      if (processed === notariWithoutCodes.length) {
        console.log("🎉 Svi kodovi su uspešno dodati!");
        process.exit(0);
      }
    }
  }
);
