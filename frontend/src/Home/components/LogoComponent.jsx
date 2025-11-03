import React from "react";
import { COLORS } from "../Styled";
import styled from "styled-components";

const LogoComponent = () => {
  return (
    <H1Div>
      <H1Logo>ENotar</H1Logo>
    </H1Div>
  );
};

const H1Div = styled.div`
  display: flex;
  flex-direction: row;
`;
const H1Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${COLORS.indigo};
`;
export default LogoComponent;
