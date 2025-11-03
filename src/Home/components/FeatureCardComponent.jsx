import React from "react";
import {
  CalendarDiv,
  CardDiv,
  FeatureCard,
  Notar,
  Zakazivanje,
} from "../Styled";

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
