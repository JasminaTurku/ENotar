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
      <SectionDiv>
        <H3>Usluge koje nudimo</H3>
        <P>Najčešće overe dostupne preko platforme.</P>

        <ServicesGrid>
          {Title.map((svc) => (
            <ServiceCard key={svc.title}>
              <ServiceCardDiv>{svc.title}</ServiceCardDiv>
              <ServiceCardTextDiv>{svc.text}</ServiceCardTextDiv>
              <div style={{ marginTop: 12 }}>
                <AStyled href="#zakazi">Zakaži</AStyled>
              </div>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </SectionDiv>
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

const H3 = styled.h3`
  margin: 0;
  font-size: 22px;
  font-weight: 700;
`;
const P = styled.p`
  margin-top: 12px;
  color: ${COLORS.gray600};
`;

const SectionDiv = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const ServiceCardDiv = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

const ServiceCardTextDiv = styled.div`
  margin-top: 8px;
  color: ${COLORS.gray600};
`;
export default ServicesComponent;
