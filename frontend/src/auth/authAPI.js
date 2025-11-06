// API funkcije za registraciju korisnika

export const registerGradjanin = async (userData) => {
  try {
    const response = await fetch("http://localhost:5000/api/gradjani", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Greška pri registraciji");
    }

    return data;
  } catch (error) {
    console.error("Greška pri registraciji građanina:", error);
    throw error;
  }
};

export const registerNotar = async (userData) => {
  try {
    const response = await fetch("http://localhost:5000/api/notari", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Greška pri registraciji");
    }

    return data;
  } catch (error) {
    console.error("Greška pri registraciji notara:", error);
    throw error;
  }
};

// Login funkcije
export const loginUser = async (email, lozinka) => {
  // Prvo pokušaj da pronađeš u građanima
  try {
    const gradjaninResponse = await fetch(
      `http://localhost:5000/api/gradjani/search?email=${encodeURIComponent(
        email
      )}`
    );

    if (gradjaninResponse.ok) {
      const gradjanin = await gradjaninResponse.json();
      // Proveri lozinku (u realnoj aplikaciji treba hash/bcrypt)
      if (gradjanin.lozinka === lozinka) {
        return { user: gradjanin, type: "gradjanin" };
      }
    }
  } catch (error) {
    console.log("Nije pronađen kao građanin, provera notara...");
  }

  // Ako nije građanin, pokušaj da pronađeš u notarima
  try {
    const notarResponse = await fetch(
      `http://localhost:5000/api/notari/search?email=${encodeURIComponent(
        email
      )}`
    );

    if (notarResponse.ok) {
      const notar = await notarResponse.json();
      // Proveri lozinku
      if (notar.lozinka === lozinka) {
        return { user: notar, type: "notar" };
      }
    }
  } catch (error) {
    console.log("Nije pronađen kao notar");
  }

  throw new Error("Pogrešan email ili lozinka");
};
