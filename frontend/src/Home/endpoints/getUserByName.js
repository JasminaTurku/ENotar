const getUserByName = async (name, type = "gradjanin") => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/${type}i/search?ime=${encodeURIComponent(
        name
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
