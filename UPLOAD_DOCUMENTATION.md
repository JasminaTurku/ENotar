# Implementacija Upload-a Dokumenta za Zakazivanje

## ✅ Šta je urađeno:

### Backend Izmene:

1. **zakaziController.js** - Ažuriran da prima i čuva `dokument` polje
2. **SQL skripta** - Kreirana za dodavanje/modifikovanje kolone `dokument` u tabeli `zakazi`

### Frontend Izmene:

1. **DocumentUpload.jsx** - Nova komponenta za drag & drop upload
2. **SchedulingComponent/index.js** - Integrisana upload komponenta
3. **ZakaziNotara.js** - Ažuriran endpoint za slanje dokumenta

## 📋 Pre testiranja - Provera Baze:

1. **Proveri da li kolona postoji:**

```sql
SHOW COLUMNS FROM zakazi LIKE 'dokument';
```

2. **Ako kolona NE postoji, dodaj je:**

```sql
ALTER TABLE zakazi
ADD COLUMN dokument LONGTEXT NULL;
```

3. **Ako kolona postoji ali je manji tip (npr. VARCHAR), modifikuj je:**

```sql
ALTER TABLE zakazi
MODIFY COLUMN dokument LONGTEXT NULL;
```

4. **Proveri strukturu tabele:**

```sql
DESCRIBE zakazi;
```

## 🔄 Kako Funkcioniše:

1. Korisnik popunjava formu za zakazivanje
2. Bira dokument (slika ili PDF) putem drag & drop ili klikom
3. Pri kliku na "Zakaži":
   - Validiraju se sva polja (uključujući dokument)
   - Dokument se konvertuje u Base64 string
   - Šalje se POST zahtev na backend sa svim podacima
   - Backend čuva zakazivanje sa dokumentom u bazi

## 📝 Format Dokumenta u Bazi:

Dokument se čuva kao Base64 string u formatu:

```
data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...
```

ili

```
data:application/pdf;base64,JVBERi0xLjQKJeLjz9...
```

## ⚠️ Napomena:

- LONGTEXT može čuvati do 4GB podataka
- Base64 enkodovanje povećava veličinu fajla za ~33%
- Za produkciju, razmotrite čuvanje fajlova na serveru ili cloud storage-u (AWS S3, Cloudinary, itd.)

## 🧪 Testiranje:

1. Pokrenite backend: `npm start` u `backend` folderu
2. Pokrenite frontend: `npm start` u `frontend` folderu
3. Popunite sva polja u formi
4. Upload-ujte dokument
5. Kliknite "Zakaži"
6. Proverite konzolu i bazu podataka
