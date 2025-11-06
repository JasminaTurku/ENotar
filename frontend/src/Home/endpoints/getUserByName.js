const getUserByName = async (identifier, type = "gradjanin") => {
  try {
    // Ako je građanin, pretražujemo po JMBG-u, ako je notar po imenu
    const searchParam = type === "gradjanin" ? "jmbg" : "ime";

    // Pravilno mapiranje ruta
    const endpoint = type === "gradjanin" ? "gradjani" : "notari";

    const response = await fetch(
      `http://localhost:5000/api/${endpoint}/search?${searchParam}=${encodeURIComponent(
        identifier
      )}`
    );
    if (!response.ok)
      throw new Error(
        `${type === "notar" ? "Notar" : "Građanin"} nije pronađen`
      );
    return response;
  } catch (error) {
    throw new Error(
      `Greška pri pretrazi ${type === "notar" ? "notara" : "građanina"}: ${
        error.message
      }`
    );
  }
};

export default getUserByName;
