# Admin Panel - Uputstvo za Upotrebu

## Svrha

Admin panel omogućava administratorima da ručno raspoređuju verifikacione kodove za nove notare. Pošto sistem ne šalje SMS poruke automatski, admin preuzima ulogu da telefonom ili SMS-om dostavi kodove notarima.

## Pristup Admin Panelu

### Kredencijali za Prijavu

- **Korisničko ime**: `admin`
- **Lozinka**: `admin123`

### Koraci za Prijavu

1. Poseti početnu stranicu aplikacije
2. Klikni na **"Prijavi se"** dugme
3. U login formi, klikni na tab **"Admin"**
4. Unesi kredencijale:
   - Korisničko ime: `admin`
   - Lozinka: `admin123`
5. Klikni **"Prijavi se kao Admin"**

Nakon uspešne prijave, bićeš automatski preusmerjen na admin panel.

## Funkcionalnost Admin Panela

### Pregled Neaktivnih Notara

Admin panel prikazuje tabelu sa svim notarima koji su se registrovali ali još nisu aktivirani:

| ID  | Ime i Prezime  | Email           | Grad    | Telefon    | Verifikacioni Kod | Datum Kreiranja  | Status     |
| --- | -------------- | --------------- | ------- | ---------- | ----------------- | ---------------- | ---------- |
| 1   | Marko Marković | marko@email.com | Beograd | 0601234567 | NOT-ABC123        | 15.01.2024 10:30 | Na čekanju |

### Detalji Kolona

- **ID**: Jedinstveni identifikator notara u sistemu
- **Ime i Prezime**: Puno ime notara
- **Email**: Email adresa za komunikaciju
- **Grad**: Grad u kojem notar radi
- **Telefon**: Broj telefona notara
- **Verifikacioni Kod**: 10-karakterni kod u formatu `NOT-XXXXXX`
- **Datum Kreiranja**: Kada se notar registrovao
- **Status**:
  - "Na čekanju" - Kod nije iskorišćen
  - "Iskorišćen" - Notar se aktivirao

### Korišćenje Verifikacionih Kodova

#### Korak 1: Pronađi Novog Notara

- Tabela automatski prikazuje najnovije neaktivirane notare
- Možeš osvežiti stranicu klikom na **"↻ Osveži"** dugme
- Badge pored naslova pokazuje broj notara koji čekaju aktivaciju

#### Korak 2: Kopiraj Verifikacioni Kod

- Pored svakog koda nalazi se **"Kopiraj"** dugme
- Klikni na dugme da kopiraš kod u clipboard
- Dugme će promeniti tekst u "✓ Kopirano" na 2 sekunde

#### Korak 3: Kontaktiraj Notara

Koristi telefon ili SMS da dostaviš kod:

**Primer SMS poruke:**

```
Poštovani [Ime Notara],

Vaš verifikacioni kod za aktivaciju eNotar naloga je:

NOT-ABC123

Molimo prijavite se na sistem i unesite ovaj kod za aktivaciju.

Srdačan pozdrav,
eNotar Tim
```

#### Korak 4: Prati Status

- Nakon što notar unese kod, status će automatski promeniti na "Iskorišćen"
- Notar će se pojaviti u sistemu kao aktivan
- Red u tabeli može ostati ili nestati (zavisno od filtera)

## Tok Verifikacije Notara

### 1. Registracija Notara

- Notar popunjava registracioni formular sa osnovnim podacima
- Uključujući: Ime, Email, Grad, **Telefon**
- Sistem kreira neaktivan nalog
- Generiše se jedinstveni verifikacioni kod
- Kod se čuva u bazi i prikazuje u admin panelu

### 2. Admin Intervencija

- Admin vidi novog notara u panelu
- Proveri identitet pozivom ili ličnom komunikacijom (opciono)
- Dostavi kod notaru telefonski ili SMS-om

### 3. Aktivacija od Strane Notara

- Notar se prijavljuje na sistem sa email/lozinkom
- Sistem detektuje da nalog nije aktiviran
- Prikazuje se modal za unos aktivacionog koda
- Notar unosi kod koji je dobio od admina
- Sistem validira kod i aktivira nalog

### 4. Završetak

- Notar dobija pun pristup sistemu
- Može da prima zakazivanja od građana
- Status u admin panelu menja se na "Iskorišćen"

## Sigurnosne Napomene

### Zaštita Kodova

- **Ne deli kodove javno** - Kodovi su lični za svakog notara
- **Verifikuj identitet** - Pre slanja koda, potvrdi da je to pravi notar
- **Koristi siguran kanal** - Telefon ili službeni email
- **Čuvaj evidenciju** - Admin panel automatski beleži sve

### Bezbednost Naloga

- **Promena Lozinke**: Nakon prvog logovanja, promeni default admin lozinku
- **Kredencijali**: Ne deli admin kredencijale sa neovlašćenim osobama
- **Izlogovanje**: Uvek se izloguj nakon korišćenja sistema

## Tehnički Detalji

### Backend API

- **Login**: `POST /api/admin/login`
- **Neaktivirani Notari**: `GET /api/admin/neaktivirani-notari`
- **Svi Notari**: `GET /api/admin/svi-notari`

### Autentifikacija

- JWT token sistem
- Token se čuva u localStorage
- Automatski dodaje se u Authorization header

### Format Verifikacionog Koda

```
NOT-XXXXXX
```

- Prefix: `NOT-` (skraćeno od "Notar")
- 6 karaktera: Nasumični brojevi i velika slova
- Primer: `NOT-A1B2C3`

## Česta Pitanja

### Šta ako notar izgubi kod?

Admin može ponovo poslati isti kod - kod ostaje validan dok se ne iskoristi.

### Može li se kod koristiti više puta?

Ne. Nakon što notar unese kod i aktivira nalog, kod postaje nevalidan.

### Koliko dugo kod važi?

Kodovi nemaju rok trajanja, ali najbolja praksa je aktivirati naloge u roku od 7 dana.

### Šta ako se notar registruje sa pogrešnim brojem?

Admin može ručno kontaktirati notara putem email-a ili oboriti stari nalog i zatražiti novu registraciju.

## Održavanje Sistema

### Redovne Provere

- **Dnevno**: Proveri nove registracije
- **Nedeljno**: Pregledaj neaktivirane naloge starije od 7 dana
- **Mesečno**: Obriši naloge koji nisu aktivirani 30+ dana (opcionalno)

### Baza Podataka

Tabele:

- `admini` - Admin nalozi
- `notari` - Svi notari (aktivirani i neaktivirani)
- `verifikacioni_kodovi` - Svi generisani kodovi sa statusom

---

**Kontakt za Podršku:**

- Email: admin@enotar.rs (primer)
- Telefon: +381 XX XXX XXXX (primer)

Poslednje ažuriranje: Januar 2025
