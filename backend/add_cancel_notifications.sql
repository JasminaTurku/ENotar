-- Dodavanje kolona za otkazivanje notifikacija

ALTER TABLE zakazivanja 
ADD COLUMN IF NOT EXISTS otkazivanje_notifikacija BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS otkazao_korisnik VARCHAR(20);

-- Provera da li su kolone dodate
DESCRIBE zakazivanja;
