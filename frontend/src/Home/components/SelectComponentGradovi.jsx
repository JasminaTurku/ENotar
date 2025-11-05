import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { COLORS } from "../Styled";

const SelectComponentGradovi = ({ value, onChange, id }) => {
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

  return (
    <StyledSelect id={id} value={value} onChange={onChange}>
      <option value="">Izaberite grad</option>
      {gradovi.map((grad) => (
        <option key={grad} value={grad}>
          {grad}
        </option>
      ))}
    </StyledSelect>
  );
};

export default SelectComponentGradovi;

const StyledSelect = styled.select`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid ${COLORS.gray200};
  outline: none;
  font-size: 14px;
  width: 100%;
  margin-top: 6px;
  display: block;

  &:focus {
    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.06);
    border-color: ${COLORS.indigo};
  }
`;
