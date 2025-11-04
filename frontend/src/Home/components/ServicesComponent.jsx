import React from "react";
import { COLORS, AStyled, BREAKPOINTS } from "../Styled";
import styled from "styled-components";

const Title = [
  {
    title: "Overa potpisa",
    text: "Potvrda autentičnosti potpisa na dokumentu",
  },
  {
    title: "Overa ugovora",
    text: "Kupoprodaja, zakup, ugovori o poklonu",
  },
  { title: "Punomoćje", text: "Overa potpisane punomoći" },
  {
    title: "Izjave i potvrde",
    text: "Razne izjave i administrativne potvrde",
  },
  {
    title: "Sastavljanje testamenta",
    text: "Saveti i izrada testamenta",
  },
  {
    title: "Apostille / međunarodne overe",
    text: "Priprema dokumenta za korišćenje u inostranstvu",
  },
];

const ServicesComponent = () => {
  return (
    <ServicesSection id="services">
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h3 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>
          Usluge koje nudimo
        </h3>
        <p style={{ marginTop: 8, color: COLORS.gray600 }}>
          Najčešće overe dostupne preko platforme.
        </p>

        <ServicesGrid>
          {Title.map((svc) => (
            <ServiceCard key={svc.title}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{svc.title}</div>
              <div style={{ marginTop: 8, color: COLORS.gray600 }}>
                {svc.text}
              </div>
              <div style={{ marginTop: 12 }}>
                <AStyled href="#zakazi">Zakaži</AStyled>
              </div>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </div>
    </ServicesSection>
  );
};

const ServicesSection = styled.section`
  padding: 28px 24px;
`;

const ServicesGrid = styled.div`
  margin-top: 18px;
  display: grid;
  gap: 14px;
  grid-template-columns: 1fr;

  @media (min-width: ${BREAKPOINTS.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ServiceCard = styled.div`
  background: ${COLORS.white};
  padding: 18px;
  border-radius: 10px;
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);
`;

export default ServicesComponent;
