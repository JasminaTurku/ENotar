import styled from "styled-components";

const COLORS = {
  indigo: "#4f46e5",
  indigoLightBg: "#eef2ff",
  gray50: "#f9fafb",
  gray100: "#f3f4f6",
  gray200: "#e5e7eb",
  gray600: "#4b5563",
  gray700: "#374151",
  white: "#ffffff",
  darkFooter: "#111827",
};

const HomeDiv = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${COLORS.gray50};
  color: ${COLORS.gray700};
`;

const H1Div = styled.div`
  display: flex;
  flex-direction: row;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  width: 100%;
  padding: 1rem 1.5rem;
  background: ${COLORS.white};
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
`;

const Header = styled.header`
  background: ${COLORS.white};
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 2rem;
  padding: 1rem 1.5rem;
  max-width: 1200px;
  background: ${COLORS.white};
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
`;

const H1Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${COLORS.indigo};
`;

const NavStyled = styled.nav`
  display: ${(props) => (props.mobile ? "flex" : "none")};
  gap: 1.5rem;
  align-items: center;
  font-size: 0.875rem;
  flex-direction: row;
  flex-direction: ${(props) => (props.mobile ? "column" : "row")};

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
  }

  a {
    color: ${COLORS.gray700};
    text-decoration: none;
    transition: color 0.15s;
  }

  a:hover {
    color: ${COLORS.indigo};
  }
  a.cta {
    padding: 0.5rem 1rem;
    border: 1px solid ${COLORS.indigo};
    color: ${COLORS.indigo};
    border-radius: 6px;
  }
`;

const xMobileMenuButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.75rem;
  border-radius: 6px;
  background: ${COLORS.indigo};
  color: white;
  font-weight: 600;
  border: none;
  cursor: pointer;
  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileNav = styled.nav`
  display: ${(p) => (p.open ? "flex" : "none")};
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  background: ${COLORS.white};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);

  a {
    color: ${COLORS.gray700};
    text-decoration: none;
    padding: 0.5rem 0;
  }
  a.cta {
    padding: 0.5rem 0.75rem;
    border: 1px solid ${COLORS.indigo};
    color: ${COLORS.indigo};
    border-radius: 6px;
    display: inline-block;
    width: fit-content;
  }
  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.75rem;
  border-radius: 6px;
  background: ${COLORS.indigo};
  color: white;
  font-weight: 600;
  border: none;
  cursor: pointer;
  @media (min-width: 768px) {
    display: none;
  }
`;
export {
  HomeDiv,
  TopBar,
  H1Div,
  Header,
  H1Logo,
  NavStyled,
  MobileMenuButton,
  MobileNav,
};
