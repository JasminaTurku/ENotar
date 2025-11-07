# Uputstvo za dodavanje kolone za notifikacije

## Korak 1: Otvori MySQL Workbench ili phpMyAdmin

## Korak 2: Pokreni sledeću SQL komandu:

```sql
ALTER TABLE zakazivanja
ADD COLUMN izmena_notifikacija BOOLEAN DEFAULT FALSE
COMMENT 'Da li je građanin obavešten o izmeni termina';
```

## Korak 3: Proveri da li je kolona dodata:

```sql
DESCRIBE zakazivanja;
```

Trebalo bi da vidiš novu kolonu `izmena_notifikacija` sa tipom TINYINT(1).

## Alternativno: Ako već imaš postojeće podatke u tabeli

Ako želiš da postaviš sve postojeće termine kao da nemaju notifikacije:

```sql
UPDATE zakazivanja SET izmena_notifikacija = FALSE;
```

---

Nakon što dodaš kolonu, restartuj backend server.
