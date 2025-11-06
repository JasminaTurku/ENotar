-- SQL skripta za dodavanje kolone 'dokument' u tabelu 'zakazi'
-- Ako kolona već postoji, ovaj kod će je modifikovati

-- Proverite prvo da li kolona postoji
-- SHOW COLUMNS FROM zakazi LIKE 'dokument';

-- Ako kolona NE POSTOJI, pokrenite:
ALTER TABLE zakazi 
ADD COLUMN dokument LONGTEXT NULL;

-- Ako kolona VEĆ POSTOJI ali je manji tip (npr. VARCHAR), modifikujte je:
-- ALTER TABLE zakazi 
-- MODIFY COLUMN dokument LONGTEXT NULL;

-- LONGTEXT može da čuva do 4GB podataka (4,294,967,295 characters)
-- što je idealno za Base64 enkodovane slike i PDF dokumente

-- Proverite strukturu tabele nakon izmene:
-- DESCRIBE zakazi;
