import "dotenv/config";
import {
  sendVerificationEmail,
  testEmailConnection,
} from "./services/emailService.js";

console.log("📧 Testiranje Gmail konfiguracije...\n");
console.log("Email:", process.env.EMAIL_USER);
console.log("Pass length:", process.env.EMAIL_PASS?.length, "karaktera");
console.log("Pass:", process.env.EMAIL_PASS);
console.log("");

// Test konekcije
testEmailConnection()
  .then(async (isConnected) => {
    if (isConnected) {
      console.log("\n✅ Gmail server je spreman!\n");

      // Test slanja
      console.log("📤 Pokušavam poslati test email...");
      try {
        await sendVerificationEmail(
          "jasmina.turku00@gmail.com",
          "Test Notar",
          "NOT-TEST99"
        );
        console.log("\n✅ Email poslat! Proveri inbox.");
      } catch (error) {
        console.error("\n❌ Greška pri slanju:", error.message);
        console.error("Stack:", error.stack);
      }
    } else {
      console.error("\n❌ Ne mogu se konektovati na Gmail.");
    }

    process.exit(0);
  })
  .catch((err) => {
    console.error("\n❌ Neočekivana greška:", err);
    process.exit(1);
  });
