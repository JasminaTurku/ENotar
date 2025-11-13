import "dotenv/config";
import db from "./models/db.js";

console.log("🔧 Ažuriranje notari tabele - dodavanje 'status' kolone...\n");

// Prvo proveri da li kolona postoji
db.query("SHOW COLUMNS FROM notari LIKE 'status'", (err, results) => {
  if (err) {
    console.error("❌ Greška pri proveri kolone:", err);
    process.exit(1);
  }

  if (results.length > 0) {
    console.log("ℹ️  Kolona 'status' već postoji");
    updateExistingRecords();
  } else {
    // Dodaj status kolonu
    db.query(
      `ALTER TABLE notari 
       ADD COLUMN status ENUM('pending', 'code_sent', 'activated', 'rejected') 
       DEFAULT 'pending' AFTER aktiviran`,
      (err, result) => {
        if (err) {
          console.error("❌ Greška pri dodavanju kolone:", err);
          process.exit(1);
        }
        console.log("✅ Kolona 'status' uspešno dodata");
        updateExistingRecords();
      }
    );
  }
});

// Ažuriraj postojeće zapise
function updateExistingRecords() {
  console.log("\n🔄 Ažuriranje postojećih notara...");

  // Postavi status za aktivirane notare
  db.query(
    "UPDATE notari SET status = 'activated' WHERE aktiviran = TRUE",
    (err, result) => {
      if (err) {
        console.error("❌ Greška pri ažuriranju aktiviranih:", err);
      } else {
        console.log(`✅ ${result.affectedRows} aktiviranih notara ažurirano`);
      }

      // Postavi status za neaktivirane notare koji imaju kod
      db.query(
        `UPDATE notari n
         INNER JOIN verifikacioni_kodovi v ON n.id = v.notar_id
         SET n.status = 'code_sent'
         WHERE n.aktiviran = FALSE AND v.iskoriscen = FALSE`,
        (err, result) => {
          if (err) {
            console.error("❌ Greška pri ažuriranju sa kodom:", err);
          } else {
            console.log(
              `✅ ${result.affectedRows} notara sa poslat kodom ažurirano`
            );
          }

          // Prikaži statistiku
          showStatistics();
        }
      );
    }
  );
}

function showStatistics() {
  console.log("\n📊 Statistika statusa notara:");

  db.query(
    "SELECT status, COUNT(*) as count FROM notari GROUP BY status",
    (err, results) => {
      if (err) {
        console.error("❌ Greška pri čitanju statistike:", err);
        process.exit(1);
      }

      const statusLabels = {
        pending: "⏳ Na čekanju",
        code_sent: "📧 Kod poslat",
        activated: "✅ Aktiviran",
        rejected: "❌ Odbijen",
      };

      console.table(
        results.map((row) => ({
          Status: statusLabels[row.status] || row.status,
          Broj: row.count,
        }))
      );

      console.log("\n🎉 Ažuriranje završeno!");
      process.exit(0);
    }
  );
}
