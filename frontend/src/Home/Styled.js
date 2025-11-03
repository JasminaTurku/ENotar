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

const BREAKPOINTS = {
  md: "768px",
  lg: "1024px",
};

const HomeDiv = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${COLORS.gray50};
  color: ${COLORS.gray700};
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
const FeaturesGrid = styled.div`
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  color: ${COLORS.gray600};
`;

const FeatureCard = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  background: ${COLORS.white};
  padding: 12px;
  border-radius: 10px;
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);
`;

const CalendarDiv = styled.div`
  width: 40;
  height: 40;
  border-radius: 9999;
  background: ${COLORS.white};
  display: "flex";
  align-items: "center";
  justify-content: "center";
  box-shadow: "0 1px 2px rgba(16,24,40,0.06)";
`;

const CardDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const Zakazivanje = styled.div`
  font-weight: 600;
`;

const Notar = styled.div`
  font-size: 12px;
  color: ${COLORS.gray600};
`;

const Card = styled.div`
  background: ${COLORS.white};
  border-radius: 12px;
  padding: 18px;
  box-shadow: 0 8px 20px rgba(16, 24, 40, 0.06);
`;
const CardTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
`;

const CardSubtitle = styled.p`
  margin: 6px 0 0;
  color: ${COLORS.gray600};
  font-size: 13px;
`;

const Form = styled.form`
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-size: 12px;
  color: ${COLORS.gray600};
`;

const Input = styled.input`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid ${COLORS.gray200};
  outline: none;
  font-size: 14px;

  &:focus {
    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.06);
    border-color: ${COLORS.indigo};
  }
`;

const Select = styled.select`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid ${COLORS.gray200};
  font-size: 14px;

  &:focus {
    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.06);
    border-color: ${COLORS.indigo};
  }
`;

const Row = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  & > * {
    flex: 1;
  }
`;

const FormButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  padding: 10px 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  background: ${(p) => (p.primary ? COLORS.indigo : "transparent")};
  color: ${(p) => (p.primary ? "white" : COLORS.gray700)};
  border: ${(p) => (p.primary ? "none" : `1px solid ${COLORS.gray200}`)};

  &:hover {
    opacity: 0.95;
  }
`;

const HowSection = styled.section`
  background: ${COLORS.indigoLightBg};
  padding: 28px 24px;
`;

const HowInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const HowGrid = styled.div`
  margin-top: 18px;
  display: grid;
  gap: 14px;
  grid-template-columns: 1fr;

  @media (min-width: ${BREAKPOINTS.md}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const HowCard = styled.div`
  background: ${COLORS.white};
  padding: 18px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);
`;

const HowIcon = styled.div`
  font-size: 28px;
`;

const H3 = styled.h3`
  margin: 0;
  font-size: 22;
  font-weight: 700;
`;
const ServicesSection = styled.section`
  padding: 28px 24px;
`;

const ServicesGrid = styled.div`
  margin-top: 18px;
  display: grid;
  gap: 14px;
  grid-template-columns: 1fr;

  @media (min-width: ${BREAKPOINTS.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ServiceCard = styled.div`
  background: ${COLORS.white};
  padding: 18px;
  border-radius: 10px;
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);
`;

const ServiceCardTitle = styled.a`
  display: "inline-block";
  padding: "8px 12px";
  border-radius: 8px;
  border: 1px solid ${COLORS.gray200};
  text-decoration: none;
  color: ${COLORS.gray700};
`;
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

const A = styled.a`
  padding: 8px 12px;
  border-radius: 8px;
  background: ${COLORS.indigo};
  color: white;
  text-decoration: none;
`;

const AStyled = styled.a`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid ${COLORS.gray200};
  text-decoration: none;
  color: ${COLORS.gray700};
`;

const ContactSection = styled.section`
  padding: 28px 24px;
`;

const ContactGrid = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  gap: 20px;

  @media (min-width: ${BREAKPOINTS.md}) {
    grid-template-columns: 1fr 360px;
  }
`;

const FormStyled = styled.form`
  background: ${COLORS.white};
  padding: 18px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(16, 24, 40, 0.04);
`;

const TextArea = styled.textarea`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid ${COLORS.gray200};
  min-height: 120px;
`;

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

export {
  HomeDiv,
  BREAKPOINTS,
  TopBar,
  Main,
  Container,
  FeaturesGrid,
  FeatureCard,
  COLORS,
  CalendarDiv,
  CardDiv,
  Zakazivanje,
  Notar,
  Card,
  CardTitle,
  CardSubtitle,
  Form,
  Label,
  Input,
  Select,
  Row,
  FormButtons,
  Button,
  HowSection,
  HowInner,
  HowGrid,
  HowCard,
  HowIcon,
  H3,
  ServicesSection,
  ServicesGrid,
  ServiceCard,
  ServiceCardTitle,
  AboutSection,
  AboutGrid,
  SmallCard,
  SmallDiv,
  A,
  AStyled,
  ContactSection,
  ContactGrid,
  FormStyled,
  TextArea,
  Footer,
  FooterInner,
};
