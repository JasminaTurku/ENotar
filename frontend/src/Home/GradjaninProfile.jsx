import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { COLORS, Button } from "./Styled";
import axios from "axios";

const GradjaninProfile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [termini, setTermini] = useState([]);
  const [loading, setLoading] = useState(true);

  // Statusi sa opisima, ikonama i bojama
  const getStatusDisplay = (status) => {
    const statusMap = {
      "na čekanju": { label: "Na čekanju", icon: "⏳", color: "#6c757d" },
      zakazano: { label: "Zakazano", icon: "📅", color: "#0d6efd" },
      prijava_primljena: {
        label: "Prijava primljena",
        icon: "👀",
        color: "#0dcaf0",
      },
      u_obradi: { label: "U obradi", icon: "⚙️", color: "#fd7e14" },
      potreban_dolazak: {
        label: "Potreban dolazak",
        icon: "🏢",
        color: "#ffc107",
      },
      zavrseno: { label: "Završeno", icon: "✅", color: "#198754" },
      otkazano: { label: "Otkazano", icon: "❌", color: "#dc3545" },
    };

    return statusMap[status] || { label: status, icon: "❓", color: "#6c757d" };
  };

  useEffect(() => {
    if (user && user.id) {
      fetchTermini();
    }
  }, [user]);

  const fetchTermini = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/zakazi/gradjanin/${user.id}`
      );
      setTermini(response.data);
    } catch (error) {
      console.error("Greška pri učitavanju termina:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrihvatiIzmenu = async (terminId) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/zakazi/${terminId}/prihvati`
      );
      alert("Uspešno ste prihvatili izmenjeni termin!");
      fetchTermini(); // Osvježi listu
    } catch (error) {
      console.error("Greška pri prihvatanju termina:", error);
      alert("Greška pri prihvatanju termina");
    }
  };

  const handleOtkaziTermin = async (terminId) => {
    const potvrda = window.confirm(
      "Da li ste sigurni da želite otkazati ovaj termin?"
    );
    if (!potvrda) return;

    try {
      await axios.delete(`http://localhost:5000/api/zakazi/${terminId}`, {
        data: { otkazao: "gradjanin" },
      });
      alert("Termin je uspešno otkazan!");
      fetchTermini(); // Osvježi listu - termin će nestati jer backend filtrira otkazane termine
    } catch (error) {
      console.error("Greška pri otkazivanju termina:", error);
      alert("Greška pri otkazivanju termina");
    }
  };

  const handlePotvrdiBrisanje = async (terminId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/zakazi/${terminId}/potvrdi`
      );
      fetchTermini(); // Osvježi listu
    } catch (error) {
      console.error("Greška pri potvrđivanju brisanja:", error);
      alert("Greška pri potvrđivanju brisanja termina");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const neprocitaneNotifikacije = termini.filter(
    (t) => t.izmena_notifikacija === 1 || t.otkazivanje_notifikacija === 1
  ).length;

  if (!user || user.type !== "gradjanin") {
    navigate("/");
    return null;
  }

  return (
    <ProfileContainer>
      <ProfileCard>
        <Header>
          <Title>Profil Građanina</Title>
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
              <Label>JMBG:</Label>
              <Value>{user.jmbg || "N/A"}</Value>
            </InfoItem>
            <InfoItem>
              <Label>ID:</Label>
              <Value>#{user.id}</Value>
            </InfoItem>
          </InfoGrid>
        </Section>

        <Section>
          <SectionTitleWrapper>
            <SectionTitle>Moji termini ({termini.length})</SectionTitle>
            {neprocitaneNotifikacije > 0 && (
              <NotificationBadge>
                {neprocitaneNotifikacije} nova izmena
              </NotificationBadge>
            )}
          </SectionTitleWrapper>
          {loading ? (
            <EmptyState>Učitavanje termina...</EmptyState>
          ) : termini.length === 0 ? (
            <EmptyState>Trenutno nemate zakazanih termina.</EmptyState>
          ) : (
            <TerminiList>
              {termini.map((termin) => (
                <TerminCard
                  key={termin.id}
                  hasNotification={
                    termin.izmena_notifikacija === 1 ||
                    termin.otkazivanje_notifikacija === 1
                  }
                >
                  {termin.otkazivanje_notifikacija === 1 &&
                    termin.otkazao_korisnik === "notar" && (
                      <NotificationAlert>
                        <AlertContent>
                          <AlertIcon>🚫</AlertIcon>
                          <AlertText>
                            Notar je otkazao ovaj termin!
                            <br />
                            Možete zakazati novi termin klikom na dugme ispod.
                          </AlertText>
                        </AlertContent>
                        <AlertActions>
                          <AcceptButton
                            onClick={() => handlePotvrdiBrisanje(termin.id)}
                          >
                            ✓ Razumem, obriši termin
                          </AcceptButton>
                        </AlertActions>
                      </NotificationAlert>
                    )}
                  {termin.izmena_notifikacija === 1 && (
                    <NotificationAlert>
                      <AlertContent>
                        <AlertIcon>⚠️</AlertIcon>
                        <AlertText>
                          Notar je izmenio datum ili vreme ovog termina!
                          <br />
                          Molimo Vas da pregledate nove podatke i odlučite da li
                          prihvatate izmenu.
                        </AlertText>
                      </AlertContent>
                      <AlertActions>
                        <AcceptButton
                          onClick={() => handlePrihvatiIzmenu(termin.id)}
                        >
                          ✓ Prihvatam
                        </AcceptButton>
                        <RejectButton
                          onClick={() => handleOtkaziTermin(termin.id)}
                        >
                          ✗ Otkaži termin
                        </RejectButton>
                      </AlertActions>
                    </NotificationAlert>
                  )}
                  <TerminHeader>
                    <TerminTitle>{termin.vrsta_overe}</TerminTitle>
                    <StatusBadgeNew status={termin.status}>
                      <StatusIcon>
                        {getStatusDisplay(termin.status).icon}
                      </StatusIcon>
                      <StatusText>
                        {getStatusDisplay(termin.status).label}
                      </StatusText>
                    </StatusBadgeNew>
                  </TerminHeader>
                  <StatusDescription status={termin.status}>
                    {termin.status === "na čekanju" &&
                      "Vaš zahtev je poslat i čeka obradu od strane notara."}
                    {termin.status === "prijava_primljena" &&
                      "Notar je video vašu prijavu i priprema dokumentaciju."}
                    {termin.status === "u_obradi" &&
                      "Notar trenutno radi na vašoj overi dokumenta."}
                    {termin.status === "potreban_dolazak" &&
                      "⚠️ Notar vas poziva da dođete lično do kancelarije."}
                    {termin.status === "zavrseno" &&
                      "✅ Overa je uspešno završena! Dokumenta su spremna."}
                    {termin.status === "otkazano" && "Ovaj zahtev je otkazan."}
                  </StatusDescription>
                  <TerminInfo>
                    <InfoRow>
                      <InfoLabel>Notar:</InfoLabel>
                      <InfoText>{termin.notar_ime}</InfoText>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>Email:</InfoLabel>
                      <InfoText>{termin.notar_email}</InfoText>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>Grad:</InfoLabel>
                      <InfoText>{termin.notar_grad}</InfoText>
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
                    {termin.izmena_notifikacija !== 1 &&
                      termin.otkazivanje_notifikacija !== 1 && (
                        <TerminActions>
                          <CancelTerminButton
                            onClick={() => handleOtkaziTermin(termin.id)}
                          >
                            Otkaži termin
                          </CancelTerminButton>
                        </TerminActions>
                      )}
                  </TerminInfo>
                </TerminCard>
              ))}
            </TerminiList>
          )}
        </Section>

        <ButtonGroup>
          <Button primary onClick={() => navigate("/?zakazi=true")}>
            Zakaži novi termin
          </Button>
          <Button onClick={handleLogout}>Odjavi se</Button>
        </ButtonGroup>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default GradjaninProfile;

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
  background: ${(props) => (props.hasNotification ? "#fffbeb" : COLORS.gray50)};
  border: 2px solid
    ${(props) => (props.hasNotification ? COLORS.orange : COLORS.gray200)};
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

const StatusBadgeNew = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  background-color: ${(props) => {
    const statusMap = {
      "na čekanju": "#6c757d",
      zakazano: "#0d6efd",
      prijava_primljena: "#0dcaf0",
      u_obradi: "#fd7e14",
      potreban_dolazak: "#ffc107",
      zavrseno: "#198754",
      otkazano: "#dc3545",
    };
    return statusMap[props.status] || "#6c757d";
  }};
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StatusIcon = styled.span`
  font-size: 1.1rem;
`;

const StatusText = styled.span`
  font-weight: 600;
`;

const StatusDescription = styled.div`
  background-color: ${(props) => {
    const bgMap = {
      "na čekanju": "#f8f9fa",
      prijava_primljena: "#cff4fc",
      u_obradi: "#fff3cd",
      potreban_dolazak: "#fff3cd",
      zavrseno: "#d1e7dd",
      otkazano: "#f8d7da",
    };
    return bgMap[props.status] || "#f8f9fa";
  }};
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: ${COLORS.gray700};
  border-left: 4px solid
    ${(props) => {
      const borderMap = {
        "na čekanju": "#6c757d",
        prijava_primljena: "#0dcaf0",
        u_obradi: "#fd7e14",
        potreban_dolazak: "#ffc107",
        zavrseno: "#198754",
        otkazano: "#dc3545",
      };
      return borderMap[props.status] || "#6c757d";
    }};
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

const SectionTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const NotificationBadge = styled.span`
  padding: 0.25rem 0.75rem;
  background-color: ${COLORS.orange};
  color: white;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 600;
`;

const NotificationAlert = styled.div`
  background-color: #fef3c7;
  border: 2px solid ${COLORS.orange};
  border-radius: 8px;
  padding: 1.25rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AlertContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`;

const AlertIcon = styled.span`
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const AlertText = styled.div`
  color: #92400e;
  font-weight: 600;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const AlertActions = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
`;

const AcceptButton = styled.button`
  padding: 0.625rem 1.25rem;
  background-color: ${COLORS.green};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    opacity: 0.9;
  }
`;

const RejectButton = styled.button`
  padding: 0.625rem 1.25rem;
  background-color: #dc2626;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    opacity: 0.9;
  }
`;

const TerminActions = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${COLORS.gray200};
  display: flex;
  justify-content: flex-end;
`;

const CancelTerminButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: transparent;
  color: #dc2626;
  border: 1px solid #dc2626;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background-color: #dc2626;
    color: white;
  }
`;
