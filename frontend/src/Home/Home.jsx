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
import styled from "styled-components";
import { COLORS, BREAKPOINTS } from "./Styled";

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

const Main = styled.main`
  flex: 1;
`;

const Container = styled.section`
  margin: 0 auto;
  padding: 32px 24px;
  grid-template-columns: 1fr;
  gap: 32px;
  align-items: center;
  display: flex;
  flex-direction: column;

  @media (min-width: ${BREAKPOINTS.md}) {
    grid-template-columns: 1fr 420px;
  }
`;

const HomeDiv = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${COLORS.gray50};
  color: ${COLORS.gray700};
`;
