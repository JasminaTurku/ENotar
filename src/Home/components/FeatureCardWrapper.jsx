import React from "react";
import { FeaturesGrid } from "../Styled";
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

export default FeatureCardWrapper;
