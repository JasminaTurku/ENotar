import React, { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../Styled";
import NavComponet from "./NavComponent";
import { links } from "../constants";

const HeaderComponent = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Header>
      <NavComponet links={links} />
      <MobileMenuButton onClick={() => setMobileOpen((s) => !s)}>
        {mobileOpen ? "Zatvori" : "Menu"}
      </MobileMenuButton>
      <MobileNav open={mobileOpen}>
        <NavComponet
          onLinkClick={() => setMobileOpen(false)}
          mobile
          links={links}
        />
      </MobileNav>
    </Header>
  );
};

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

const MobileNav = styled.nav`
  display: ${(p) => (p.open ? "flex" : "none")};
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  background: ${COLORS.white};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);

  a {
    color: ${COLORS.gray700};
    text-decoration: none;
    padding: 0.4rem 0.5rem;
    display: inline-block;
  }
  a.cta {
    padding: 0.4rem 0.65rem;
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
export default HeaderComponent;
