import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { COLORS, Button } from "./Styled";
import axios from "axios";

const NotarProfile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [termini, setTermini] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.id) {
      fetchTermini();
    }
  }, [user]);

  const fetchTermini = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/zakazi/notar/${user.id}`
      );
      setTermini(response.data);
    } catch (error) {
      console.error("Greška pri učitavanju termina:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user || user.type !== "notar") {
    navigate("/");
    return null;
  }

  return (
    <ProfileContainer>
      <ProfileCard>
        <Header>
          <Title>Profil Notara</Title>
          <Button onClick={() => navigate("/")}>Nazad na početnu</Button>
        </Header>

        <Section>
          <SectionTitle>Osnovne informacije</SectionTitle>
          <InfoGrid>
            <InfoItem>
              <Label>Ime i prezime:</Label>
              <Value>{user.ime}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Email:</Label>
              <Value>{user.email}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Grad:</Label>
              <Value>{user.gradovi || user.grad || "N/A"}</Value>
            </InfoItem>
            <InfoItem>
              <Label>ID:</Label>
              <Value>#{user.id}</Value>
            </InfoItem>
          </InfoGrid>
        </Section>

        <Section>
          <SectionTitle>Moji termini ({termini.length})</SectionTitle>
          {loading ? (
            <EmptyState>Učitavanje termina...</EmptyState>
          ) : termini.length === 0 ? (
            <EmptyState>Trenutno nemate zakazanih termina.</EmptyState>
          ) : (
            <TerminiList>
              {termini.map((termin) => (
                <TerminCard key={termin.id}>
                  <TerminHeader>
                    <TerminTitle>{termin.vrsta_overe}</TerminTitle>
                    <StatusBadge status={termin.status}>
                      {termin.status}
                    </StatusBadge>
                  </TerminHeader>
                  <TerminInfo>
                    <InfoRow>
                      <InfoLabel>Građanin:</InfoLabel>
                      <InfoText>{termin.gradjanin_ime}</InfoText>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>Email:</InfoLabel>
                      <InfoText>{termin.gradjanin_email}</InfoText>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>JMBG:</InfoLabel>
                      <InfoText>{termin.gradjanin_jmbg}</InfoText>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>Datum:</InfoLabel>
                      <InfoText>
                        {new Date(termin.datum).toLocaleDateString("sr-RS")}
                      </InfoText>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>Vreme:</InfoLabel>
                      <InfoText>{termin.vreme}</InfoText>
                    </InfoRow>
                    {termin.dokument && (
                      <InfoRow>
                        <InfoLabel>Dokument:</InfoLabel>
                        <ViewDocButton
                          onClick={() => {
                            const newWindow = window.open();
                            newWindow.document.write(
                              `<img src="${termin.dokument}" style="max-width: 100%; height: auto;" />`
                            );
                          }}
                        >
                          Pregled dokumenta
                        </ViewDocButton>
                      </InfoRow>
                    )}
                  </TerminInfo>
                </TerminCard>
              ))}
            </TerminiList>
          )}
        </Section>

        <ButtonGroup>
          <Button primary onClick={() => navigate("/")}>
            Zakaži novi termin
          </Button>
          <Button onClick={handleLogout}>Odjavi se</Button>
        </ButtonGroup>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default NotarProfile;

const ProfileContainer = styled.div`
  min-height: 100vh;
  background-color: ${COLORS.gray100};
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 4rem;
`;

const ProfileCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid ${COLORS.gray200};
`;

const Title = styled.h1`
  color: ${COLORS.indigo};
  font-size: 2rem;
  margin: 0;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: ${COLORS.gray800};
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.span`
  color: ${COLORS.gray600};
  font-size: 0.9rem;
  font-weight: 500;
`;

const Value = styled.span`
  color: ${COLORS.gray800};
  font-size: 1.1rem;
  font-weight: 600;
`;

const EmptyState = styled.div`
  padding: 2rem;
  text-align: center;
  color: ${COLORS.gray500};
  background-color: ${COLORS.gray50};
  border-radius: 8px;
  border: 1px dashed ${COLORS.gray300};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid ${COLORS.gray200};
`;

const TerminiList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TerminCard = styled.div`
  background: ${COLORS.gray50};
  border: 1px solid ${COLORS.gray200};
  border-radius: 8px;
  padding: 1.5rem;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const TerminHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${COLORS.gray300};
`;

const TerminTitle = styled.h3`
  color: ${COLORS.indigo};
  font-size: 1.2rem;
  margin: 0;
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: ${(props) =>
    props.status === "zakazano" ? COLORS.green : COLORS.orange};
  color: white;
`;

const TerminInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InfoLabel = styled.span`
  color: ${COLORS.gray600};
  font-weight: 500;
  min-width: 100px;
`;

const InfoText = styled.span`
  color: ${COLORS.gray800};
`;

const ViewDocButton = styled.button`
  padding: 0.25rem 0.75rem;
  background-color: ${COLORS.indigo};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.15s;

  &:hover {
    background-color: ${COLORS.indigoDark};
  }
`;
