import React from "react";
import {
  HowSection,
  HowInner,
  HowGrid,
  HowCard,
  HowIcon,
  COLORS,
  H3,
} from "../Styled";
const HowToUseComponent = () => {
  return (
    <HowSection id="how">
      <HowInner>
        <H3>Kako funkcioniše</H3>
        <p style={{ marginTop: 8, color: COLORS.gray600 }}>
          Jednostavno - u četiri koraka.
        </p>

        <HowGrid>
          {[
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
          ].map((s) => (
            <HowCard key={s.title}>
              <HowIcon>{s.icon}</HowIcon>
              <div style={{ fontWeight: 600, marginTop: 10 }}>{s.title}</div>
              <div
                style={{
                  marginTop: 6,
                  fontSize: 13,
                  color: COLORS.gray600,
                }}
              >
                {s.desc}
              </div>
            </HowCard>
          ))}
        </HowGrid>
      </HowInner>
    </HowSection>
  );
};

export default HowToUseComponent;
