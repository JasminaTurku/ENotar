import React from "react";
import { COLORS } from "../Styled";
import styled from "styled-components";

const FeatureCardComponent = ({ title, description, icon, ariaLabel }) => {
  return (
    <FeatureCard>
      <CalendarDiv>
        <span role="img" aria-label={ariaLabel}>
          {icon}
        </span>
      </CalendarDiv>
      <CardDiv>
        <Zakazivanje>{title}</Zakazivanje>
        <Notar>{description}</Notar>
      </CardDiv>
    </FeatureCard>
  );
};

export default FeatureCardComponent;

const FeatureCard = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  background: ${COLORS.white};
  padding: 12px;
  border-radius: 10px;
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);
`;

const CalendarDiv = styled.div`
  width: 40;
  height: 40;
  border-radius: 9999;
  background: ${COLORS.white};
  display: "flex";
  align-items: "center";
  justify-content: "center";
  box-shadow: "0 1px 2px rgba(16,24,40,0.06)";
`;

const CardDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const Zakazivanje = styled.div`
  font-weight: 600;
`;

const Notar = styled.div`
  font-size: 12px;
  color: ${COLORS.gray600};
`;
