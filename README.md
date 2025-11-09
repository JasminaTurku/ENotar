# eNotar - Sistem za Zakazivanje Notara

Web aplikacija koja omogućava građanima Srbije da lako zakažu termin kod notara, a notarima da efikasno upravljaju svojim terminima.

## 🎯 Funkcionalnosti

### Za Građane

- 🔍 Pretraga notara po gradu
- 📅 Zakazivanje slobodnih termina
- 📱 Pregled zakazanih termina
- 🔔 Notifikacije za izmene od strane notara
- ✏️ Mogućnost otkazivanja termina

### Za Notare

- 📊 Dashboard sa svim zakazanim terminima
- ✅ Prihvatanje/Odbijanje zahteva za termine
- 🗓️ Ažuriranje termina sa obaveštenjem građana
- 👥 Pregled profila građana
- 📞 Kontakt informacije građana
- 🔐 **Dvostepena registracija sa aktivacionim kodom**

### Za Administratore

- 🔐 Admin panel za upravljanje sistemom
- 👨‍💼 Pregled svih neaktivnih notara
- 📋 Verifikacioni kodovi za aktivaciju notara
- 📞 Telefoni notara za ručnu dostavu kodova
- 📊 Statistika i praćenje aktivacija

## 🚀 Kako pokrenuti projekat

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

## 🔐 Admin Panel

Administrator ima poseban panel za upravljanje verifikacionim kodovima notara.

### Funkcionalnosti:

- 📋 Tabela sa svim neaktivnim notarima
- 📞 Telefoni notara za kontakt
- 🔑 Verifikacioni kodovi (format: NOT-XXXXXX)
- 📋 Copy-paste funkcionalnost
- 🔄 Refresh dugme
- 📊 Badge sa brojem notara na čekanju

### Proces Verifikacije:

1. Notar se registruje → sistem generiše kod
2. Admin vidi notara u panelu
3. Admin poziva notara i dostavlja kod
4. Notar unosi kod → nalog aktiviran

📖 Detaljno uputstvo: [ADMIN_UPUTSTVO.md](./ADMIN_UPUTSTVO.md)

## 🗄️ Struktura Baze Podataka

### Tabele:

- `gradjani` - Podaci o građanima
- `notari` - Podaci o notarima
  - Nova kolona: `telefon` VARCHAR(20)
  - Nova kolona: `aktiviran` BOOLEAN DEFAULT FALSE
- `zakazivanja` - Termini i zakazivanja
  - Nova kolona: `otkazivanje_notifikacija` BOOLEAN
  - Nova kolona: `otkazao_korisnik` VARCHAR(20)
- `verifikacioni_kodovi` - Kodovi za aktivaciju notara
- `admini` - Admin nalozi

## 🔔 Sistem Notifikacija

### Notifikacije za Građane:

- ✅ Notar prihvatio zahtev
- ❌ Notar odbio zahtev
- ✏️ Notar izmenio termin
- 🚫 Notar otkazao termin

### Notifikacije za Notare:

- 📅 Novi zahtev za termin
- 🚫 Građanin otkazao termin

### Otkazivanje Termina:

- Kada korisnik otkaže termin, drugi korisnik dobija notifikaciju
- Termin nestaje iz liste korisnika koji je otkazao
- Termin ostaje vidljiv drugom korisniku dok ne potvrdi brisanje

## 🛠️ Tehnologije

### Frontend:

- React 18
- React Router
- Styled Components
- Axios

### Backend:

- Node.js
- Express
- MySQL2
- JWT (jsonwebtoken)
- dotenv
- CORS

## 📁 Struktura Projekta

```
enotar/
├── backend/
│   ├── controllers/
│   │   ├── gradjaniController.js
│   │   ├── notariController.js
│   │   ├── zakaziController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   └── db.js
│   ├── routes/
│   │   ├── gradjani.js
│   │   ├── notari.js
│   │   ├── zakazi.js
│   │   └── admin.js
│   ├── server.js
│   ├── create_admin_table.js
│   └── .env
├── frontend/
│   ├── public/
│   └── src/
│       ├── auth/
│       │   ├── AuthForm.jsx
│       │   ├── authAPI.js
│       │   └── adminAPI.js
│       ├── context/
│       │   └── AuthContext.jsx
│       ├── Home/
│       │   ├── Home.jsx
│       │   ├── NotarProfile.jsx
│       │   ├── GradjaninProfile.jsx
│       │   ├── AdminPanel.jsx
│       │   └── components/
│       └── App.js
├── ADMIN_LOGIN.md
├── ADMIN_UPUTSTVO.md
└── README.md
```

## 🔒 Sigurnost

- JWT token autentifikacija
- Lozinke nisu hešovane u trenutnoj verziji (TODO za production)
- Admin panel zaštićen JWT middleware-om
- Dvostepena verifikacija notara sa aktivacionim kodovima
- CORS omogućen za lokalni development

⚠️ **VAŽNO**: Pre deployment-a u production:

1. Promeniti default admin lozinku
2. Implementirati bcrypt za hešovanje lozinki
3. Koristiti jake JWT secret ključeve
4. Konfigurisati CORS za specifične domene
5. Dodati rate limiting
6. Implementirati HTTPS

## 📝 TODO Lista

- [ ] Implementacija bcrypt za lozinke
- [ ] Email notifikacije umesto SMS
- [ ] Export termina u PDF
- [ ] Kalendar pogled za notare
- [ ] Statistika i analitika
- [ ] Multi-language support
- [ ] Mobilna aplikacija

## 📄 Licenca

MIT License

## 👥 Kontakt

Za pitanja i podršku, kontaktirajte:

- Email: support@enotar.rs (primer)
- GitHub: [JasminaTurku/ENotar](https://github.com/JasminaTurku/ENotar)

---

Razvijeno sa ❤️ za modernizaciju notarskih usluga u Srbiji
