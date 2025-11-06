import axios from "axios";
import React, { useEffect, useState } from "react";

const useNotari = (selectedGrad = null) => {
  const [notari, setNotari] = useState([]);

  useEffect(() => {
    const fetchNotari = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/notari");
        let filteredNotari = response.data;

        if (selectedGrad) {
          filteredNotari = response.data.filter(
            (notar) => notar.gradovi === selectedGrad
          );
        }

        setNotari(filteredNotari);
        console.log("Dohvaćeni notari:", filteredNotari);
      } catch (error) {
        console.error("Greška pri dohvatanju notara:", error);
      }
    };

    fetchNotari();
  }, [selectedGrad]);

  return { notari };
};

export default useNotari;
