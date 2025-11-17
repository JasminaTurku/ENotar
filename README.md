# eNotar - Sistem za Zakazivanje Notara

Web aplikacija koja omogućava građanima da lako zakažu termin kod notara, a notarima da efikasno upravljaju svojim terminima.

## Kako pokrenuti projekat

### Preduslovi

- Node.js (v14 ili noviji)
- MySQL baza podataka
- npm ili yarn

### Backend Setup

1. **Navigiraj u backend folder:**

```bash
cd backend
```

2. **Instaliraj zavisnosti:**

```bash
npm install
```

3. **Konfiguriši .env fajl:**

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=tvoja_lozinka
DB_NAME=enotar
JWT_SECRET=tvoj_jwt_secret_key
```

4. **Kreiraj bazu podataka:**

```sql
CREATE DATABASE enotar;
```

5. **Kreiraj admin tabelu:**

```bash
node create_admin_table.js
```

6. **Pokreni server:**

```bash
node server.js
```

Server će biti dostupan na: `http://localhost:5000`

### Frontend Setup

1. **Navigiraj u frontend folder:**

```bash
cd frontend
```

2. **Instaliraj zavisnosti:**

```bash
npm install
```

3. **Pokreni aplikaciju:**

```bash
npm start
```

Aplikacija će biti dostupna na: `http://localhost:3000`

## 👤 Tipovi Korisnika

### 1. Građanin

**Kako se registrovati:**

- Klikni "Prijavi se" → "Registracija"
- Izaberi "Građanin"
- Unesi: Ime, Prezime, Email, Lozinka, JMBG
- Odmah dobijaš pristup sistemu

### 2. Notar

**Kako se registrovati:**

- Klikni "Prijavi se" → "Registracija"
- Izaberi "Notar"
- Unesi: Ime, Prezime, Email, Lozinka, Grad, **Telefon**
- Sistem generiše verifikacioni kod
- ⏳ **Čekaš poziv od admina sa kodom**
- Nakon prijave, unesi kod u modal prozor
- ✅ Aktiviran si i imaš pun pristup

### 3. Administrator

**Kako se prijaviti:**

- Klikni "Prijavi se"
- Klikni na **🔒 Admin** tab (ljubičasti)
- Unesi:
  - Korisničko ime: `admin`
  - Lozinka: `admin123`
- Pristup admin panelu

📖 Detaljnije: [ADMIN_LOGIN.md](./ADMIN_LOGIN.md)

