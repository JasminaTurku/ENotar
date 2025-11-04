import { COLORS, A, AStyled, BREAKPOINTS } from "../Styled";
import styled from "styled-components";

const AboutComponent = () => {
  return (
    <AboutSection>
      <AboutGrid>
        <div>
          <h3 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>O nama</h3>
          <p style={{ marginTop: 12, color: COLORS.gray600 }}>
            e-Notar je platforma koja spaja građane i javne beležnike. Naš cilj
            je da smanjimo čekanje, povećamo transparentnost i omogućimo sigurnu
            online komunikaciju.
          </p>

          <ul
            style={{
              marginTop: 12,
              paddingLeft: 18,
              color: COLORS.gray600,
            }}
          >
            <li>Transparentan status overe</li>
            <li>Šifrovana razmena dokumenata</li>
            <li>Pristup evidenciji overe</li>
          </ul>
        </div>

        <div style={{ display: "grid", gap: 12 }}>
          <SmallCard>
            <div style={{ fontWeight: 600 }}>Za građane</div>
            <SmallDiv>
              Zakažite termin, pošaljite dokument i pratite status.
            </SmallDiv>
            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              <A>Registruj se</A>
              <AStyled>Proveri status</AStyled>
            </div>
          </SmallCard>

          <SmallCard>
            <div style={{ fontWeight: 600 }}>Za notare</div>
            <div
              style={{
                marginTop: 6,
                color: COLORS.gray600,
                fontSize: 13,
              }}
            >
              Panel za obradu zahteva, evidenciju i komunikaciju sa klijentima.
            </div>
            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              <A>Prijavi se</A>
              <AStyled>Saznaj više</AStyled>
            </div>
          </SmallCard>
        </div>
      </AboutGrid>
    </AboutSection>
  );
};

const AboutSection = styled.section`
  background: ${COLORS.white};
  padding: 28px 24px;
`;

const AboutGrid = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  gap: 20px;

  @media (min-width: ${BREAKPOINTS.md}) {
    grid-template-columns: 1fr 360px;
    align-items: start;
  }
`;

const SmallCard = styled.div`
  border: 1px solid ${COLORS.gray200};
  padding: 12px;
  border-radius: 10px;
`;

const SmallDiv = styled.div`
  margin-top: 6px;
  color: ${COLORS.gray600};
  font-size: 13px;
`;
export default AboutComponent;
