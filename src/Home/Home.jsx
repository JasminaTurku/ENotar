import { useState } from "react";
import {
  HomeDiv,
  TopBar,
  H1Div,
  Header,
  H1Logo,
  MobileMenuButton,
  MobileNav,
} from "./Styled";
import NavComponet from "./components/NavComponent.jsx";

export const links = [
  { label: "Početna", href: "#" },
  { label: "Usluge", href: "#services" },
  { label: "Kako radi", href: "#how" },
  { label: "Kontakt", href: "#kontakt" },
  { label: "Zakaži termin", href: "#zakazi", cta: true },
];

export const Home = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <HomeDiv>
      <TopBar>
        <H1Div>
          <H1Logo>ENotar</H1Logo>
        </H1Div>
        <Header>
          <NavComponet links={links} />
          <MobileMenuButton onClick={() => setMobileOpen((s) => !s)}>
            {mobileOpen ? "Zatvori" : "Menu"}
          </MobileMenuButton>
        </Header>
      </TopBar>
      <MobileNav open={mobileOpen}>
        <NavComponet
          onLinkClick={() => setMobileOpen(false)}
          mobile
          links={links}
        />
      </MobileNav>
    </HomeDiv>
  );
};
export default Home;
