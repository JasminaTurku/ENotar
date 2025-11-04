import { COLORS, BREAKPOINTS } from "../Styled";
import styled from "styled-components";

const Title = [
  {
    title: "Registruj se",
    desc: "Kreiraj nalog građanina ili notara",
    icon: "🧾",
  },
  {
    title: "Zakaži termin",
    desc: "Izaberi uslugu i termin",
    icon: "📅",
  },
  {
    title: "Pošalji dokument",
    desc: "Priloži sken ili PDF",
    icon: "📤",
  },
  {
    title: "Prati status",
    desc: "Dobij obaveštenja i podigni overeni dokument",
    icon: "🔔",
  },
];

const HowToUseComponent = () => {
  return (
    <HowSection id="how">
      <HowInner>
        <H3>Kako funkcioniše</H3>
        <P>Jednostavno - u četiri koraka.</P>
        <HowGrid>
          {Title.map((s) => (
            <HowCard key={s.title}>
              <HowIcon>{s.icon}</HowIcon>
              <HowIconDiv>{s.title}</HowIconDiv>
              <HowDiv>{s.desc}</HowDiv>
            </HowCard>
          ))}
        </HowGrid>
      </HowInner>
    </HowSection>
  );
};

export default HowToUseComponent;

const HowSection = styled.section`
  background: ${COLORS.indigoLightBg};
  padding: 28px 24px;
`;

const HowInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const HowGrid = styled.div`
  margin-top: 18px;
  display: grid;
  gap: 14px;
  grid-template-columns: 1fr;

  @media (min-width: ${BREAKPOINTS.md}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const HowCard = styled.div`
  background: ${COLORS.white};
  padding: 18px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);
`;

const HowIcon = styled.div`
  font-size: 28px;
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

const HowDiv = styled.div`
  margin-top: 6px;
  font-size: 13px;
  color: ${COLORS.gray600};
`;

const HowIconDiv = styled.div`
  font-weight: 600;
  margin-top: 10px;
`;
