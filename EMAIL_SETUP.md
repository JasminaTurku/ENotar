# Email Konfiguracija za eNotar Sistem

## Šta je Novo?

Sada admin **ne mora ručno** da poziva notare i diktira kodove! 🎉

Kad admin klikne **"📧 Pošalji Kod"** dugme u Admin Panelu:

1. Sistem automatski generiše verifikacioni kod
2. Šalje **profesionalni email** notaru sa kodom
3. Notar dobija lepše oblikovanu poruku sa instrukcijama
4. Admin dobija potvrdu da je email poslat

---

## Gmail Setup (BESPLATNO)

### Korak 1: Kreiraj Gmail Nalog

- Koristi postojeći Gmail ili kreiraj novi za sistem
- Preporuka: `enotar.system@gmail.com` ili sličan

### Korak 2: Omogući 2-Factor Authentication

1. Idi na https://myaccount.google.com/security
2. Klikni na "2-Step Verification"
3. Prati korake za aktivaciju

### Korak 3: Kreiraj App Password

1. Idi na https://myaccount.google.com/apppasswords
2. Izaberi "Mail" i "Other (Custom name)"
3. Unesi naziv: "eNotar System"
4. Klikni "Generate"
5. **Kopiraj 16-karakterni kod** (npr: `abcd efgh ijkl mnop`)

### Korak 4: Ažuriraj .env Fajl

Otvori `backend/.env` i ažuriraj:

```env
# Email Configuration
EMAIL_USER=enotar.system@gmail.com
EMAIL_PASS=abcdefghijklmnop  # App Password bez razmaka
EMAIL_FROM=eNotar System <noreply@enotar.rs>
```

⚠️ **VAŽNO**:

- Ne koristi svoju ličnu Gmail lozinku!
- Koristi samo **App Password** generisan u Koraku 3
- Bez razmaka između karaktera

---

## Outlook/Hotmail Setup (BESPLATNO)

### Korak 1: Kreiraj Outlook Nalog

- Idi na https://outlook.com
- Kreiraj novi nalog (npr: `enotar.system@outlook.com`)

### Korak 2: Ažuriraj emailService.js

Promeni u `backend/services/emailService.js`:

```javascript
const transporter = nodemailer.createTransporter({
  service: "outlook", // Promenjeno sa 'gmail'
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

### Korak 3: Ažuriraj .env Fajl

```env
# Email Configuration
EMAIL_USER=enotar.system@outlook.com
EMAIL_PASS=tvoja_outlook_lozinka
EMAIL_FROM=eNotar System <noreply@enotar.rs>
```

---

## Test Email Konfiguracije

Kreiraj fajl `backend/test_email.js`:

```javascript
import "dotenv/config";
import {
  sendVerificationEmail,
  testEmailConnection,
} from "./services/emailService.js";

console.log("📧 Testiranje email konfiguracije...\n");

// Test 1: Proveri konekciju
testEmailConnection().then(async (isConnected) => {
  if (isConnected) {
    console.log("\n✅ Email server je spreman!\n");

    // Test 2: Pošalji test email
    console.log("📤 Slanje test email-a...");
    try {
      await sendVerificationEmail(
        "tvoj-email@gmail.com", // Promeni na svoj email
        "Test Notar",
        "NOT-TEST123"
      );
      console.log("\n✅ Test email poslat! Proveri svoj inbox.");
    } catch (error) {
      console.error("\n❌ Greška pri slanju:", error.message);
    }
  } else {
    console.error(
      "\n❌ Email server nije dostupan. Proveri .env konfiguraciju."
    );
  }

  process.exit(0);
});
```

Pokreni test:

```bash
cd backend
node test_email.js
```

---

## Kako Radi Novi Sistem?

### 1. Notar se registruje

- Unosi sve podatke + **email adresu**
- Status: `pending`
- Čeka admin odobrenje

### 2. Admin pregleda notara u panelu

- Vidi sve neaktivirane notare
- Ima dugme **"📧 Pošalji Kod"** pored svakog

### 3. Admin klikne "Pošalji Kod"

- Sistem generiše jedinstveni kod (npr: `NOT-A1B2C3`)
- Šalje profesionalni email notaru
- Status se menja na `code_sent`

### 4. Notar prima email

- Dobija lepše formatiran email sa:
  - Velikim boldovanim kodom
  - Jasnim instrukcijama
  - Upozorenjima o sigurnosti

### 5. Notar aktivira nalog

- Prijavljuje se na sistem
- Modal se otvara automatski
- Unosi kod iz email-a
- Status se menja na `activated` ✅

---

## Email Šablon - Kako Izgleda?

Notar dobija:

```
🔐 eNotar Sistem
Aktivacija Vašeg Notarskog Naloga

Poštovani/a [Ime Notara],

Dobrodošli u eNotar sistem! Administrator je odobrio Vašu registraciju.

Vaš aktivacioni kod je:

┌─────────────────┐
│  NOT-A1B2C3     │
└─────────────────┘

Kako da aktivirate nalog:
1. Prijavite se na eNotar sistem sa Vašim email-om i lozinkom
2. Kada se pojavi prozor za aktivaciju, unesite gornji kod
3. Kliknite na "Aktiviraj nalog"

⚠️ Važno:
• Ovaj kod je validan samo jednom
• Ne delite ovaj kod ni sa kim
• Ako niste zatražili aktivaciju, kontaktirajte administratora

Srdačan pozdrav,
eNotar Tim

---
© 2025 eNotar - Sistem za Zakazivanje Notara
```

---

## Troubleshooting

### "Invalid login" greška

- **Gmail**: Proveri da li si omogućio 2FA i kreirao App Password
- **Outlook**: Proveri email i lozinku

### "Connection timeout"

- Proveri internet konekciju
- Proveri da firewall ne blokira port 587 (SMTP)

### "Email not sent"

- Proveri da li je EMAIL_USER validan email
- Proveri da li je EMAIL_PASS tačan (bez razmaka)

### Emailovi idu u Spam

- Koristi profesionalni email domain (npr: `@enotar.rs`)
- Dodaj SPF i DKIM rekorde (za production)

---

## Production Setup (Preporuke)

Za produkciono okruženje:

1. **Koristi profesionalni email service**:

   - SendGrid (100 besplatnih emailova/dan)
   - Mailgun (5,000 besplatnih/mesečno)
   - AWS SES (62,000 besplatnih/mesečno)

2. **Koristi custom domain**:

   - `no-reply@enotar.rs`
   - Izgleda profesionalnije
   - Manje šanse za spam folder

3. **Monitor slanja**:

   - Loguj sve poslate emailove
   - Prati bounce rate
   - Dodaj retry logiku

4. **Sigurnost**:
   - Nikad ne commit-uj .env fajl
   - Koristi environment varijable na serveru
   - Rotiraj App Passwords redovno

---

## Cena

**POTPUNO BESPLATNO** ✅

- Gmail: Besplatan (dnevni limit: 500 emailova)
- Outlook: Besplatan (dnevni limit: 300 emailova)
- Za eNotar (1-2 notara dnevno): Više nego dovoljno!

---

**Kreirao**: eNotar Dev Tim
**Datum**: Januar 2025
**Poslednja izmena**: {{ currentDate }}
