import {
  AboutGrid,
  AboutSection,
  SmallCard,
  COLORS,
  SmallDiv,
  A,
  AStyled,
} from "../Styled";

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

export default AboutComponent;
