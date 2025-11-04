import { COLORS, BREAKPOINTS } from "../Styled";
import styled from "styled-components";
const FooterComponent = () => {
  return (
    <Footer>
      <FooterInner>
        <div>
          <div style={{ fontWeight: 700, color: "white" }}>e-Notar</div>
          <div style={{ marginTop: 8, color: "#9ca3af", fontSize: 13 }}>
            © 2025 e-Notar. Sva prava zadržana.
          </div>
        </div>

        <div style={{ color: "#d1d5db", fontSize: 14 }}>
          <div>Uslovi korišćenja</div>
          <div style={{ marginTop: 8 }}>Politika privatnosti</div>
        </div>

        <div style={{ color: "#d1d5db", fontSize: 14 }}>
          <div>Pratite nas</div>
          <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
            Facebook · LinkedIn · Instagram
          </div>
        </div>
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

export default FooterComponent;
