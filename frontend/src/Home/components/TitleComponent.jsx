import React from "react";
import { COLORS, BREAKPOINTS } from "../Styled";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const TitleComponent = ({ onOpen }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      gradjanin_id: 1, // kasnije uzmi iz login-a
      notar_id: 2, // bira se iz selecta
      vrsta_overe: "overa potpisa",
      datum: "2024-06-01",
      vreme: "10:00",
    };

    const res = await fetch("http://localhost:5000/api/zakazi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    console.log(result);
    alert(result.message);
  };

  const handleSchedulingClick = (e) => {
    e.preventDefault();
    if (typeof onOpen === "function") onOpen();
  };

  const handleStatusClick = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      // Nije prijavljen - idi na login
      navigate("/login");
    } else if (user.type === "gradjanin") {
      // Prijavljen kao građanin - idi na profil građanina
      navigate("/profil-gradjanina");
    } else if (user.type === "notar") {
      // Prijavljen kao notar - idi na profil notara
      navigate("/profil-notara");
    }
  };

  const handleNotarTerminiClick = (e) => {
    e.preventDefault();
    navigate("/profil-notara");
  };

  // Ako je prijavljen kao notar, prikaži posebno dugme
  if (isAuthenticated && user.type === "notar") {
    return (
      <>
        <HeroTitle>Digitalna overa dokumenata, brzo i jednostavno</HeroTitle>
        <HeroText>Pogledajte/Ažurirajte termine vaših klijenata.</HeroText>
        <HeroActions>
          <PrimaryButton href="#profil" onClick={handleNotarTerminiClick}>
            Pogledajte/Ažurirajte termine vaših klijenata
          </PrimaryButton>
        </HeroActions>
      </>
    );
  }

  return (
    <>
      <HeroTitle>Digitalna overa dokumenata, brzo i jednostavno</HeroTitle>
      <HeroText>
        Zakažite termin kod notara, pošaljite dokument na predpregled i pratite
        status overe — sve online, bez čekanja.
      </HeroText>
      <HeroActions>
        <PrimaryButton
          href="#zakazi"
          onClick={handleSchedulingClick}
          onSubmit={handleSubmit}
        >
          Zakaži termin
        </PrimaryButton>
        <SecondaryButton href="#status" onClick={handleStatusClick}>
          Proveri status overe
        </SecondaryButton>
      </HeroActions>
    </>
  );
};
const HeroTitle = styled.h2`
  margin: 0;
  font-size: 35px;
  line-height: 1.05;
  font-weight: 1000;
  color: ${COLORS.gray700};

  @media (min-width: ${BREAKPOINTS.md}) {
    font-size: 30px;
  }
`;

const HeroText = styled.p`
  margin-top: 12px;
  color: ${COLORS.gray800};
  font-size: 18px;
  font-weight: 600;
`;

const HeroActions = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;
const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: ${COLORS.indigo};
  color: white;
  border-radius: 10px;
  text-decoration: none;
  box-shadow: 0 6px 14px rgba(79, 70, 229, 0.12);
  font-weight: 600;
`;

const SecondaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: transparent;
  border-radius: 10px;
  border: 1px solid ${COLORS.gray200};
  color: ${COLORS.gray700};
  text-decoration: none;
  font-weight: 600;
`;

export default TitleComponent;
