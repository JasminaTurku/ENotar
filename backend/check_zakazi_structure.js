import db from "./models/db.js";

console.log("🔍 Proveravam strukturu 'zakazivanja' tabele...\n");

db.query("DESCRIBE zakazivanja", (err, results) => {
  if (err) {
    console.error("❌ Greška:", err);
    process.exit(1);
  }

  console.log("📊 Struktura tabele 'zakazivanja':");
  console.table(results);

  // Proveri da li postoji 'status' kolona
  const statusColumn = results.find((col) => col.Field === "status");

  if (statusColumn) {
    console.log("\n✅ Kolona 'status' već postoji!");
    console.log("Tip:", statusColumn.Type);
    console.log("Default:", statusColumn.Default);
  } else {
    console.log("\n❌ Kolona 'status' NE postoji! Treba je dodati.");
  }

  process.exit(0);
});
