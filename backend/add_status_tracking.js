import db from "./models/db.js";

console.log("🔄 Ažuriram tip kolone 'status' u tabeli 'zakazivanja'...\n");

// Prvo proveri trenutne statuse
db.query("SELECT DISTINCT status FROM zakazivanja", (err, currentStatuses) => {
  if (!err) {
    console.log("📊 Trenutni statusi u bazi:");
    currentStatuses.forEach((row) => console.log(`  - "${row.status}"`));
  }

  // Prvo ažuriraj sve "zakazano" statuse u "na čekanju"
  console.log("\n🔄 Ažuriram postojeće 'zakazano' statuse u 'na čekanju'...");

  db.query(
    "UPDATE zakazivanja SET status = 'na čekanju' WHERE status = 'zakazano'",
    (err, result) => {
      if (err) {
        console.error("❌ Greška pri ažuriranju starih statusa:", err);
      } else {
        console.log(`✅ Ažurirano ${result.affectedRows} redova`);
      }

      // Promeni tip kolone u ENUM sa svim potrebnim statusima
      const alterQuery = `
    ALTER TABLE zakazivanja 
    MODIFY COLUMN status ENUM(
      'na čekanju',
      'zakazano',
      'prijava_primljena', 
      'u_obradi',
      'potreban_dolazak',
      'zavrseno',
      'otkazano'
    ) DEFAULT 'na čekanju'
  `;

      db.query(alterQuery, (err, result) => {
        if (err) {
          console.error("❌ Greška pri ažuriranju:", err);
          process.exit(1);
        }

        console.log("\n✅ Status kolona uspešno ažurirana!");
        console.log("\n📋 Dostupni statusi:");
        console.log("  1. na čekanju - Zahtev je poslat, čeka obradu");
        console.log("  2. prijava_primljena - Notar je video prijavu");
        console.log("  3. u_obradi - Notar radi na overi");
        console.log("  4. potreban_dolazak - Građanin treba da dođe do notara");
        console.log("  5. zavrseno - Overa je završena");
        console.log("  6. otkazano - Zahtev je otkazan");

        console.log("\n🔍 Proveravam novu strukturu...");

        db.query("DESCRIBE zakazivanja", (err, results) => {
          if (err) {
            console.error("❌ Greška:", err);
            process.exit(1);
          }

          const statusColumn = results.find((col) => col.Field === "status");
          console.log("\n✅ Nova struktura 'status' kolone:");
          console.log("Tip:", statusColumn.Type);
          console.log("Default:", statusColumn.Default);

          process.exit(0);
        });
      });
    }
  );
});
