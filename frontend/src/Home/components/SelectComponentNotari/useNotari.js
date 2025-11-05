import axios from "axios";
import React, { useEffect, useState } from "react";

const useNotari = () => {
  const [notari, setNotari] = useState([]);

  useEffect(() => {
    const fetchNotari = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/notari");
        setNotari(response.data);
        console.log("Dohvaćeni notari:", response.data);
      } catch (error) {
        console.error("Greška pri dohvatanju notara:", error);
      }
    };

    fetchNotari();
  }, []);
  return { notari };
};

export default useNotari;
