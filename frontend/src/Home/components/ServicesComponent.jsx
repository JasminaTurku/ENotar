import React from "react";
import {
  ServiceCard,
  ServicesGrid,
  ServicesSection,
  COLORS,
  ServiceCardTitle,
  A,
  AStyled,
} from "../Styled";

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

export default ServicesComponent;
