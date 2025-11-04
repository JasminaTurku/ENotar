import { COLORS, BREAKPOINTS } from "../Styled";
import styled from "styled-components";
const FooterComponent = () => {
  return (
    <Footer>
      <FooterInner>
        <div>
          <NotarDiv>e-Notar</NotarDiv>
          <div style={{ marginTop: 8, color: "#9ca3af", fontSize: 13 }}>
            © 2025 e-Notar. Sva prava zadržana.
          </div>
        </div>

        <ContactDiv>
          <div>Uslovi korišćenja</div>
          <div style={{ marginTop: 8 }}>Politika privatnosti</div>
        </ContactDiv>

        <ContactDiv>
          <div>Pratite nas</div>
          <FacebookDiv>Facebook · LinkedIn · Instagram</FacebookDiv>
        </ContactDiv>
      </FooterInner>
    </Footer>
  );
};

const Footer = styled.footer`
  background: ${COLORS.darkFooter};
  color: #d1d5db;
`;

const FooterInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px;
  display: grid;
  gap: 12px;

  @media (min-width: ${BREAKPOINTS.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ContactDiv = styled.div`
  color: #d1d5db;
  font-size: 14px;
`;
const FacebookDiv = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 8px;
`;

const NotarDiv = styled.div`
  font-weight: 700;
  color: white;
`;
export default FooterComponent;
