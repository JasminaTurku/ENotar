import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { COLORS } from "../../Styled";
import useNotari from "./useNotari";

const SelectComponent = ({ value, onChange, id }) => {
  const { notari } = useNotari();

  return (
    <StyledSelect id={id} value={value} onChange={onChange}>
      <option value="">Izaberite notara</option>
      {notari.map((notar) => (
        <option key={notar._id} value={`${notar.ime} ${notar.prezime}`}>
          {notar.ime} {notar.prezime}
        </option>
      ))}
    </StyledSelect>
  );
};

export default SelectComponent;

const StyledSelect = styled.select`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid ${COLORS.gray200};
  outline: none;
  font-size: 14px;
  width: 60%;
  margin-top: 6px;
  display: block;

  &:focus {
    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.06);
    border-color: ${COLORS.indigo};
  }
`;
