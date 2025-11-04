import { COLORS, A, AStyled, BREAKPOINTS } from "../Styled";
import styled from "styled-components";

const AboutComponent = () => {
  return (
    <AboutSection>
      <AboutGrid>
        <div>
          <H3>O nama</H3>
          <P>
            e-Notar je platforma koja spaja građane i javne beležnike. Naš cilj
            je da smanjimo čekanje, povećamo transparentnost i omogućimo sigurnu
            online komunikaciju.
          </P>
          <Ul>
            <li>Transparentan status overe</li>
            <li>Šifrovana razmena dokumenata</li>
            <li>Pristup evidenciji overe</li>
          </Ul>
        </div>

        <SmallDivWrapper>
          <SmallCard>
            <SmallDivStyled>Za građane</SmallDivStyled>
            <SmallDiv>
              Zakažite termin, pošaljite dokument i pratite status.
            </SmallDiv>
            <SmallDiv2>
              <A>Registruj se</A>
              <AStyled>Proveri status</AStyled>
            </SmallDiv2>
          </SmallCard>

          <SmallCard>
            <SmallDivStyled>Za notare</SmallDivStyled>
            <SmallDiv>
              Panel za obradu zahteva, evidenciju i komunikaciju sa klijentima.
            </SmallDiv>
            <SmallDiv2>
              <A>Prijavi se</A>
              <AStyled>Saznaj više</AStyled>
            </SmallDiv2>
          </SmallCard>
        </SmallDivWrapper>
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
const H3 = styled.h3`
  margin: 0;
  font-size: 22px;
  font-weight: 700;
`;
const P = styled.p`
  margin-top: 12px;
  color: ${COLORS.gray600};
`;
const Ul = styled.ul`
  margin-top: 12px;
  padding-left: 18px;
  color: ${COLORS.gray600};
`;

const SmallDiv2 = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 8px;
`;
const SmallDivWrapper = styled.div`
  display: grid;
  gap: 12px;
`;

const SmallDivStyled = styled.div`
  font-weight: 600;
`;
export default AboutComponent;
