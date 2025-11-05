import axios from "axios";
import { useState, useEffect } from "react";

export const useGradovi = () => {
  const [gradovi, setGradovi] = useState([]);

  useEffect(() => {
    const fetchGradovi = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/notari");
        const sviGradovi = response.data.map((notar) => notar.gradovi);
        const jedinstveniGradovi = [...new Set(sviGradovi)].filter(
          (grad) => grad
        );
        const sortiraniGradovi = jedinstveniGradovi.sort((a, b) =>
          a.localeCompare(b)
        );
        setGradovi(sortiraniGradovi);
        console.log("Dohvaćeni gradovi:", sortiraniGradovi);
      } catch (error) {
        console.error("Greška pri dohvatanju gradova:", error);
      }
    };

    fetchGradovi();
  }, []);

  return { gradovi };
};
