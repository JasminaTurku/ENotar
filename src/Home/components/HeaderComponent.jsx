import React, { useState } from "react";
import { Header, MobileMenuButton, MobileNav, TopBar } from "../Styled";
import NavComponet from "./NavComponent";
import { links } from "../Home";

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

export default HeaderComponent;
