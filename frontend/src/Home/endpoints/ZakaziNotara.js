// src/endpoints/ZakaziNotara.js
const zakaziNotara = async (termin) => {
  // termin je objekat npr.
  // { gradjanin_id: 1, notar_id: 2, vrsta_overe: "overa_potpisa", datum: "2025-11-04", vreme: "10:30", status: "zakazano" }
  try {
    const response = await fetch("http://localhost:5000/api/zakazivanje", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(termin),
    });

    if (!response.ok) throw new Error("Greška pri zakazivanju termina");

    const data = await response.json();
    return data; // npr. { message: "Termin zakazan", id: 6 }
  } catch (error) {
    console.error("Greška:", error);
    throw error;
  }
};

export default zakaziNotara;
