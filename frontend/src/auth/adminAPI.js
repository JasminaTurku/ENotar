import axios from "axios";

const API_URL = "http://localhost:5000/api/admin";

export const loginAdmin = async (korisnickoIme, lozinka) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      korisnicko_ime: korisnickoIme,
      lozinka,
    });

    // Sačuvaj token
    localStorage.setItem("token", response.data.token);

    return response.data.admin;
  } catch (error) {
    throw error.response?.data || { error: "Greška pri prijavljivanju admina" };
  }
};

export const getNeaktiviraniNotari = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/neaktivirani-notari`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Greška pri učitavanju notara" };
  }
};
