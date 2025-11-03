import { HomeDiv, TopBar, Main, Container } from "./Styled";
import LogoComponent from "./components/LogoComponent.jsx";
import HeaderComponent from "./components/HeaderComponent.jsx";
import FeatureCardWrapper from "./components/FeatureCardWrapper.jsx";
import SchedulingComponent from "./components/SchedulingComponent.jsx";
import { useState } from "react";
import HowToUseComponent from "./components/HowToUseComponent.jsx";
import ServicesComponent from "./components/ServicesComponent.jsx";
import AboutComponent from "./components/AboutComponent.jsx";
import TitleComponent from "./components/TitleComponent.jsx";
import ContactComponent from "./components/ContactComponent.jsx";
import FooterComponent from "./components/FooterComponent.jsx";

export const links = [
  { label: "Početna", href: "#" },
  { label: "Usluge", href: "#services" },
  { label: "Kako radi", href: "#how" },
  { label: "Kontakt", href: "#kontakt" },
  { label: "Zakaži termin", href: "#zakazi", cta: true },
];

export const Home = () => {
  const [showScheduling, setShowScheduling] = useState(false);

  const handleSchedulingClose = (e) => {
    e.preventDefault();
    setShowScheduling(false);
  };

  return (
    <HomeDiv>
      <TopBar>
        <LogoComponent />
        <HeaderComponent />
      </TopBar>
      <Main>
        <Container>
          <TitleComponent onOpen={() => setShowScheduling(true)} />
          <FeatureCardWrapper />
          {showScheduling && (
            <SchedulingComponent onClose={handleSchedulingClose} />
          )}
          <HowToUseComponent />
          <ServicesComponent />
          <AboutComponent />
        </Container>
        <ContactComponent />
      </Main>
      <FooterComponent />
    </HomeDiv>
  );
};
export default Home;
