import React from "react";
import { COLORS } from "../Styled";
import styled from "styled-components";
import FeatureCardComponent from "./FeatureCardComponent";

const FeatureCardWrapper = () => {
  return (
    <FeaturesGrid>
      <FeatureCardComponent
        title="Brzo zakazivanje"
        description="Izaberi notara i termin u par klikova"
        icon="📅"
        ariaLabel="calendar"
      />

      <FeatureCardComponent
        title="Obaveštenja"
        description="Obaveštenja kada je overa završena"
        icon="🔔"
        ariaLabel="bell"
      />

      <FeatureCardComponent
        title="Sigurnost"
        description="Podaci su šifrovani i zaštićeni"
        icon="🔒"
        ariaLabel="lock"
      />

      <FeatureCardComponent
        title="Pravno validno"
        description="Notarski pečat i evidencija"
        icon="⚖️"
        ariaLabel="scales"
      />
    </FeaturesGrid>
  );
};

const FeaturesGrid = styled.div`
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  color: ${COLORS.gray600};
`;

export default FeatureCardWrapper;
