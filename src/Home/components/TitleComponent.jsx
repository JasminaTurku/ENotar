import React from "react";
import {
  HeroActions,
  HeroText,
  HeroTitle,
  PrimaryButton,
  SecondaryButton,
} from "../Styled";

const TitleComponent = ({ onOpen }) => {
  const handleSchedulingClick = (e) => {
    e.preventDefault();
    if (typeof onOpen === "function") onOpen();
  };

  return (
    <>
      <HeroTitle>Digitalna overa dokumenata, brzo i jednostavno</HeroTitle>
      <HeroText>
        Zakažite termin kod notara, pošaljite dokument na predpregled i pratite
        status overe — sve online, bez čekanja.
      </HeroText>
      <HeroActions>
        <PrimaryButton href="#zakazi" onClick={handleSchedulingClick}>
          Zakaži termin
        </PrimaryButton>
        <SecondaryButton href="#status">Proveri status overe</SecondaryButton>
      </HeroActions>
    </>
  );
};

export default TitleComponent;
