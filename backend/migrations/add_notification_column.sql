-- Dodavanje kolone za notifikacije o izmenama
ALTER TABLE zakazivanja 
ADD COLUMN izmena_notifikacija BOOLEAN DEFAULT FALSE COMMENT 'Da li je građanin obavešten o izmeni termina';
