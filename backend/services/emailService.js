import pkg from "nodemailer";
const { createTransport } = pkg;
import "dotenv/config";

// Proveri da li je MOCK mode uključen
const MOCK_MODE =
  !process.env.EMAIL_USER ||
  process.env.EMAIL_USER === "your-email@gmail.com" ||
  !process.env.EMAIL_PASS ||
  process.env.EMAIL_PASS === "your-app-password";

// Kreira transporter za slanje emailova
const createTransporter = () => {
  if (MOCK_MODE) {
    console.log("📧 MOCK MODE: Email neće biti poslat (nema kredencijala)");
    // Kreiranje test transportera koji ne šalje stvarne emailove
    return createTransport({
      host: "smtp.ethereal.email", // Fake SMTP za testiranje
      port: 587,
      secure: false,
      auth: {
        user: "test@test.com",
        pass: "test",
      },
    });
  }

  return createTransport({
    service: "gmail", // Možeš koristiti 'outlook', 'yahoo', itd.
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Šalje verifikacioni kod notaru putem email-a
export const sendVerificationEmail = async (notarEmail, notarIme, kod) => {
  try {
    // MOCK MODE - samo loguj u konzolu
    if (MOCK_MODE) {
      console.log("\n" + "=".repeat(60));
      console.log("📧 MOCK EMAIL - NE ŠALJE SE STVARNI EMAIL");
      console.log("=".repeat(60));
      console.log(`📬 Primalac: ${notarEmail}`);
      console.log(`👤 Ime: ${notarIme}`);
      console.log(`🔑 Kod: ${kod}`);
      console.log("=".repeat(60) + "\n");

      return {
        success: true,
        messageId: "mock-" + Date.now(),
        mock: true,
      };
    }

    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM || "eNotar System <noreply@enotar.rs>",
      to: notarEmail,
      subject: "🔐 Vaš Aktivacioni Kod za eNotar Sistem",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border: 1px solid #e0e0e0;
            }
            .code-box {
              background: #fff;
              border: 2px dashed #667eea;
              padding: 20px;
              text-align: center;
              margin: 20px 0;
              border-radius: 8px;
            }
            .code {
              font-size: 32px;
              font-weight: bold;
              color: #667eea;
              letter-spacing: 3px;
              font-family: 'Courier New', monospace;
            }
            .footer {
              background: #34495e;
              color: white;
              padding: 20px;
              text-align: center;
              font-size: 12px;
              border-radius: 0 0 10px 10px;
            }
            .button {
              display: inline-block;
              background: #667eea;
              color: white;
              padding: 12px 30px;
              text-decoration: none;
              border-radius: 5px;
              margin-top: 15px;
            }
            .warning {
              background: #fff3cd;
              border-left: 4px solid #ffc107;
              padding: 12px;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🔐 eNotar Sistem</h1>
            <p>Aktivacija Vašeg Notarskog Naloga</p>
          </div>
          
          <div class="content">
            <h2>Poštovani/a ${notarIme},</h2>
            
            <p>Dobrodošli u <strong>eNotar</strong> sistem! Administrator je odobrio Vašu registraciju.</p>
            
            <p>Vaš aktivacioni kod je:</p>
            
            <div class="code-box">
              <div class="code">${kod}</div>
            </div>
            
            <p><strong>Kako da aktivirate nalog:</strong></p>
            <ol>
              <li>Prijavite se na eNotar sistem sa Vašim email-om i lozinkom</li>
              <li>Kada se pojavi prozor za aktivaciju, unesite gornji kod</li>
              <li>Kliknite na "Aktiviraj nalog"</li>
            </ol>
            
            <div class="warning">
              <strong>⚠️ Važno:</strong>
              <ul style="margin: 5px 0; padding-left: 20px;">
                <li>Ovaj kod je validan samo jednom</li>
                <li>Ne delite ovaj kod ni sa kim</li>
                <li>Ako niste zatražili aktivaciju, kontaktirajte administratora</li>
              </ul>
            </div>
            
            <p>Ako imate pitanja, slobodno nas kontaktirajte.</p>
            
            <p>Srdačan pozdrav,<br><strong>eNotar Tim</strong></p>
          </div>
          
          <div class="footer">
            <p>© 2025 eNotar - Sistem za Zakazivanje Notara</p>
            <p>Ova poruka je automatski generisana, molimo ne odgovarajte direktno na nju.</p>
          </div>
        </body>
        </html>
      `,
      text: `
Poštovani/a ${notarIme},

Dobrodošli u eNotar sistem! Administrator je odobrio Vašu registraciju.

VAŠ AKTIVACIONI KOD: ${kod}

Kako da aktivirate nalog:
1. Prijavite se na eNotar sistem sa Vašim email-om i lozinkom
2. Kada se pojavi prozor za aktivaciju, unesite gornji kod
3. Kliknite na "Aktiviraj nalog"

VAŽNO:
- Ovaj kod je validan samo jednom
- Ne delite ovaj kod ni sa kim
- Ako niste zatražili aktivaciju, kontaktirajte administratora

Srdačan pozdrav,
eNotar Tim

---
© 2025 eNotar - Sistem za Zakazivanje Notara
Ova poruka je automatski generisana.
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("📧 Email poslat:", info.messageId);
    console.log("✅ Primalac:", notarEmail);
    console.log("🔑 Kod:", kod);

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("❌ Greška pri slanju email-a:", error);
    throw error;
  }
};

// Test funkcija za proveru email konfiguracije
export const testEmailConnection = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log("✅ Email server je spreman za slanje poruka");
    return true;
  } catch (error) {
    console.error("❌ Email server greška:", error);
    return false;
  }
};
