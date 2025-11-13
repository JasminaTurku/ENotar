import React, { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../Home/Styled";
import {
  registerGradjanin,
  registerNotar,
  loginUser,
  aktivirajNotar,
} from "./authAPI";
import { loginAdmin } from "./adminAPI";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ onClose }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login"); // 'login', 'register', ili 'admin'
  const [userType, setUserType] = useState("gradjanin"); // Za registraciju
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showActivationModal, setShowActivationModal] = useState(false);
  const [pendingNotarData, setPendingNotarData] = useState(null);
  const [aktivacioniKod, setAktivacioniKod] = useState("");
  const [formData, setFormData] = useState({
    ime: "",
    prezime: "",
    email: "",
    lozinka: "",
    jmbg: "",
    grad: "",
    telefon: "",
    korisnickoIme: "", // Za admin login
  });

  // Lista gradova u Srbiji
  const gradoviSrbije = [
    "Beograd",
    "Novi Sad",
    "Niš",
    "Kragujevac",
    "Subotica",
    "Zrenjanin",
    "Pančevo",
    "Čačak",
    "Kruševac",
    "Kraljevo",
    "Novi Pazar",
    "Smederevo",
    "Leskovac",
    "Užice",
    "Vranje",
    "Valjevo",
    "Šabac",
    "Sombor",
    "Požarevac",
    "Pirot",
    "Zaječar",
    "Kikinda",
    "Sremska Mitrovica",
    "Jagodina",
    "Vršac",
    "Bor",
    "Prokuplje",
    "Loznica",
    "Negotin",
    "Smederevska Palanka",
  ].sort();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    // Reset specifična polja kada se promeni tip korisnika
    setFormData((prev) => ({
      ...prev,
      jmbg: "",
      grad: "",
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Pozovi backend da proveri email i lozinku
      const result = await loginUser(formData.email, formData.lozinka);

      console.log("Login uspešan:", result);

      // Prijavi korisnika sa pravim tipom iz backend-a
      login(result.user, result.type);

      alert(
        `Uspešno ste se prijavili kao ${
          result.type === "notar" ? "notar" : "građanin"
        }!`
      );
      onClose();
    } catch (err) {
      console.error("Greška pri prijavi:", err);
      setError(err.message || "Pogrešan email ili lozinka");
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const adminData = await loginAdmin(
        formData.korisnickoIme,
        formData.lozinka
      );

      login(adminData, "admin");

      alert("Uspešno ste se prijavili kao administrator!");
      navigate("/admin");
      onClose();
    } catch (err) {
      console.error("Greška pri admin prijavi:", err);
      setError(err.error || "Pogrešno korisničko ime ili lozinka");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Priprema podataka za slanje
      const fullName = `${formData.ime} ${formData.prezime}`;

      if (userType === "gradjanin") {
        const gradjaninData = {
          ime: fullName,
          email: formData.email,
          lozinka: formData.lozinka,
          jmbg: formData.jmbg,
        };

        const response = await registerGradjanin(gradjaninData);
        console.log("Građanin registrovan:", response);

        // Automatski prijavi korisnika nakon registracije
        login(
          { id: response.id, ime: fullName, email: formData.email },
          "gradjanin"
        );
        alert("Uspešno ste se registrovali kao građanin!");
        onClose();
      } else {
        // NOVO: PRVO proveri da li email već postoji
        console.log("🔍 Proveravam da li email već postoji...");
        const checkResponse = await fetch(
          `http://localhost:5000/api/notari/proveri-status/${encodeURIComponent(
            formData.email
          )}`
        );
        const emailCheck = await checkResponse.json();

        console.log("📧 Provera emaila:", emailCheck);

        // Ako email već postoji, prikaži odgovarajuću poruku
        if (emailCheck.exists) {
          if (emailCheck.status === "code_sent" && !emailCheck.aktiviran) {
            // Email postoji i kod je poslat - prikaži modal za aktivaciju
            console.log(
              "✅ Email postoji sa code_sent statusom - prikazujem modal"
            );
            setPendingNotarData({
              notarId: emailCheck.id,
              ime: emailCheck.ime,
              email: emailCheck.email,
            });
            setShowActivationModal(true);
            setLoading(false);
            return;
          } else if (
            emailCheck.status === "activated" ||
            emailCheck.aktiviran
          ) {
            setError("Ovaj nalog je već aktiviran. Možete se prijaviti.");
            setLoading(false);
            return;
          } else if (emailCheck.status === "pending") {
            setError(
              "Registracija je već poslata. Čekate da administrator pošalje kod."
            );
            setLoading(false);
            return;
          } else if (emailCheck.status === "rejected") {
            setError(
              "Vaša registracija je odbijena. Kontaktirajte administratora."
            );
            setLoading(false);
            return;
          } else {
            setError("Email već postoji u sistemu.");
            setLoading(false);
            return;
          }
        }

        // Email ne postoji - nastavi sa registracijom
        console.log("✅ Email ne postoji - nastavljam sa registracijom");

        // Validacija telefona
        if (!formData.telefon || formData.telefon.length < 9) {
          setError("Molimo unesite validan broj telefona");
          setLoading(false);
          return;
        }

        const notarData = {
          ime: fullName,
          email: formData.email,
          lozinka: formData.lozinka,
          grad: formData.grad,
          telefon: formData.telefon,
        };

        const response = await registerNotar(notarData);
        console.log("Notar registrovan:", response);

        // Sačuvaj podatke i prikaži modal za aktivacioni kod
        setPendingNotarData({
          ...response,
          ime: fullName,
          email: formData.email,
          grad: formData.grad,
        });
        setShowActivationModal(true);

        // NE prikazuj alert - odmah otvori modal
      }
    } catch (err) {
      console.error("Greška pri registraciji:", err);
      setError(err.message || "Došlo je do greške pri registraciji");
    } finally {
      setLoading(false);
    }
  };

  const handleAktivacija = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await aktivirajNotar(
        pendingNotarData.notarId,
        aktivacioniKod
      );
      console.log("Notar aktiviran:", response);

      // Automatski prijavi korisnika nakon aktivacije
      login(
        {
          id: pendingNotarData.notarId,
          ime: pendingNotarData.ime,
          email: pendingNotarData.email,
          grad: pendingNotarData.grad,
        },
        "notar"
      );

      alert("Nalog uspešno aktiviran! Dobrodošli!");
      setShowActivationModal(false);
      onClose();
    } catch (err) {
      console.error("Greška pri aktivaciji:", err);
      setError(err.message || "Neispravan aktivacioni kod");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      <AuthCard>
        <TabContainer>
          <Tab
            active={activeTab === "login"}
            onClick={() => setActiveTab("login")}
          >
            Prijava
          </Tab>
          <Tab
            active={activeTab === "register"}
            onClick={() => setActiveTab("register")}
          >
            Registracija
          </Tab>
          <Tab
            active={activeTab === "admin"}
            onClick={() => setActiveTab("admin")}
            className="admin-tab"
          >
            🔒 Admin
          </Tab>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </TabContainer>

        {activeTab === "admin" ? (
          <Form onSubmit={handleAdminLogin}>
            <Title>Admin Prijava</Title>
            <AdminInfoBox>
              <InfoIcon>🔐</InfoIcon>
              <InfoText>
                <strong>Samo za administratore</strong>
                <br />
                Pristup rezervisan isključivo za ovlašćeno osoblje.
              </InfoText>
            </AdminInfoBox>
            <InputGroup>
              <Label>Korisničko ime</Label>
              <Input
                type="text"
                name="korisnickoIme"
                placeholder="Unesite korisničko ime"
                value={formData.korisnickoIme}
                onChange={handleInputChange}
                required
              />
            </InputGroup>
            <InputGroup>
              <Label>Lozinka</Label>
              <Input
                type="password"
                name="lozinka"
                placeholder="••••••••"
                value={formData.lozinka}
                onChange={handleInputChange}
                required
              />
            </InputGroup>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <SubmitButton type="submit" disabled={loading}>
              {loading ? "Prijava u toku..." : "Prijavi se kao Admin"}
            </SubmitButton>
          </Form>
        ) : activeTab === "login" ? (
          <Form onSubmit={handleLogin}>
            <Title>Prijavite se</Title>
            <InputGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="primer@email.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </InputGroup>
            <InputGroup>
              <Label>Lozinka</Label>
              <Input
                type="password"
                name="lozinka"
                placeholder="••••••••"
                value={formData.lozinka}
                onChange={handleInputChange}
                required
              />
            </InputGroup>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <ButtonContainer>
              <SubmitButton type="submit" disabled={loading}>
                {loading ? "Prijava u toku..." : "Prijavi se"}
              </SubmitButton>
            </ButtonContainer>
          </Form>
        ) : (
          <Form onSubmit={handleRegister}>
            <Title>Kreirajte nalog</Title>

            <UserTypeGroup>
              <UserTypeButton
                type="button"
                active={userType === "gradjanin"}
                onClick={() => handleUserTypeChange("gradjanin")}
              >
                Građanin
              </UserTypeButton>
              <UserTypeButton
                type="button"
                active={userType === "notar"}
                onClick={() => handleUserTypeChange("notar")}
              >
                Notar
              </UserTypeButton>
            </UserTypeGroup>

            <InputGroup>
              <Label>Ime</Label>
              <Input
                type="text"
                name="ime"
                placeholder="Vaše ime"
                value={formData.ime}
                onChange={handleInputChange}
                required
              />
            </InputGroup>
            <InputGroup>
              <Label>Prezime</Label>
              <Input
                type="text"
                name="prezime"
                placeholder="Vaše prezime"
                value={formData.prezime}
                onChange={handleInputChange}
                required
              />
            </InputGroup>

            {userType === "gradjanin" && (
              <InputGroup>
                <Label>JMBG</Label>
                <Input
                  type="text"
                  name="jmbg"
                  placeholder="13 cifara"
                  maxLength="13"
                  pattern="[0-9]{13}"
                  value={formData.jmbg}
                  onChange={handleInputChange}
                  required
                />
              </InputGroup>
            )}

            {userType === "notar" && (
              <>
                <InputGroup>
                  <Label>Grad</Label>
                  <Select
                    name="grad"
                    value={formData.grad}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Izaberite grad</option>
                    {gradoviSrbije.map((grad) => (
                      <option key={grad} value={grad}>
                        {grad}
                      </option>
                    ))}
                  </Select>
                </InputGroup>
                <InputGroup>
                  <Label>Broj telefona</Label>
                  <Input
                    type="tel"
                    name="telefon"
                    placeholder="06XXXXXXXX"
                    value={formData.telefon}
                    onChange={handleInputChange}
                    pattern="[0-9]{9,10}"
                    required
                  />
                </InputGroup>
              </>
            )}

            <InputGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="primer@email.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </InputGroup>
            <InputGroup>
              <Label>Lozinka</Label>
              <Input
                type="password"
                name="lozinka"
                placeholder="••••••••"
                value={formData.lozinka}
                onChange={handleInputChange}
                required
              />
            </InputGroup>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <ButtonContainer>
              <SubmitButton type="submit" disabled={loading}>
                {loading ? "Registracija u toku..." : "Registruj se"}
              </SubmitButton>
            </ButtonContainer>
          </Form>
        )}
      </AuthCard>

      {/* Modal za aktivaciju notara */}
      {showActivationModal && (
        <ActivationOverlay>
          <ActivationModal>
            <ModalHeader>
              <ModalTitle>Aktivirajte Vaš nalog</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <ModalText>
                ✅ <strong>Registracija uspešna!</strong>
                <br />
                <br />
                Kada administrator odobri da ste Vi notar, automatski ćete
                dobiti verifikacioni kod na <strong>Vaš email</strong>.
                <br />
                <br />
                📧 Proverite Vaš email inbox (i spam folder) za poruku sa kodom,
                a zatim unesite kod ovde da aktivirate Vaš nalog.
              </ModalText>
              <Form onSubmit={handleAktivacija}>
                <InputGroup>
                  <Label>Aktivacioni kod</Label>
                  <Input
                    type="text"
                    placeholder="NOT-XXXXXX"
                    value={aktivacioniKod}
                    onChange={(e) =>
                      setAktivacioniKod(e.target.value.toUpperCase())
                    }
                    required
                    autoFocus
                  />
                </InputGroup>

                {error && <ErrorMessage>{error}</ErrorMessage>}

                <ButtonContainer>
                  <SubmitButton type="submit" disabled={loading}>
                    {loading ? "Aktiviranje..." : "Aktiviraj nalog"}
                  </SubmitButton>
                  <CancelButton
                    type="button"
                    onClick={() => {
                      setShowActivationModal(false);
                      setError("");
                    }}
                  >
                    Otkaži
                  </CancelButton>
                </ButtonContainer>
              </Form>
            </ModalBody>
          </ActivationModal>
        </ActivationOverlay>
      )}
    </AuthContainer>
  );
};

export default AuthForm;

// Styled Components
const AuthContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const AuthCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  width: 90%;
  max-width: 500px;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
`;

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 2px solid ${COLORS.gray200};
  position: relative;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
  color: ${COLORS.gray500};
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
  padding: 0;
  margin-left: auto;
  margin-right: 10px;

  &:hover {
    background-color: ${COLORS.gray100};
    color: ${COLORS.gray700};
  }
`;

const Tab = styled.button`
  flex: 0 1 auto;
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => (props.active ? COLORS.indigo : COLORS.gray500)};
  border-bottom: 3px solid
    ${(props) => (props.active ? COLORS.indigo : "transparent")};
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: -2px;

  &:hover {
    color: ${COLORS.indigo};
    background-color: ${COLORS.gray50};
  }

  &.admin-tab {
    color: ${(props) => (props.active ? "#764ba2" : COLORS.gray500)};
    border-bottom-color: ${(props) =>
      props.active ? "#764ba2" : "transparent"};

    &:hover {
      color: #764ba2;
      background: linear-gradient(
        to bottom,
        transparent,
        rgba(118, 75, 162, 0.05)
      );
    }
  }
`;

const Form = styled.form`
  padding: 2rem;
`;

const Title = styled.h2`
  color: ${COLORS.gray800};
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.5rem;
`;

const UserTypeGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const UserTypeButton = styled.button`
  flex: 1;
  padding: 0.75rem;
  border: 2px solid ${COLORS.indigo};
  border-radius: 8px;
  background-color: ${(props) => (props.active ? COLORS.indigo : "white")};
  color: ${(props) => (props.active ? "white" : COLORS.indigo)};
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 600;

  &:hover {
    background-color: ${(props) =>
      props.active ? COLORS.indigoLight : COLORS.gray50};
  }
`;

const InputGroup = styled.div`
  margin-bottom: 1.25rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${COLORS.gray700};
  font-weight: 500;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${COLORS.gray300};
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${COLORS.indigo};
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }

  &::placeholder {
    color: ${COLORS.gray400};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${COLORS.gray300};
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;
  background-color: white;
  cursor: pointer;
  height: auto;
  min-height: 48px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1.25rem;
  padding-right: 2.5rem;

  &:focus {
    outline: none;
    border-color: ${COLORS.indigo};
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }

  option {
    padding: 0.5rem;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 2rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.875rem;
  background-color: ${COLORS.indigo};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.disabled ? COLORS.indigo : COLORS.indigoLight};
  }

  &:active {
    transform: ${(props) => (props.disabled ? "none" : "translateY(1px)")};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  background-color: #fee;
  color: #c33;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #fcc;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  text-align: center;
`;

const AdminInfoBox = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
`;

const InfoIcon = styled.div`
  font-size: 2rem;
  flex-shrink: 0;
`;

const InfoText = styled.div`
  font-size: 0.9rem;
  line-height: 1.5;

  strong {
    display: block;
    margin-bottom: 0.3rem;
    font-size: 1rem;
  }

  code {
    background: rgba(255, 255, 255, 0.2);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: "Courier New", monospace;
    font-weight: 600;
  }
`;

const ActivationOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`;

const ActivationModal = styled.div`
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 450px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.3s ease;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ModalHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${COLORS.gray200};
`;

const ModalTitle = styled.h2`
  color: ${COLORS.indigo};
  font-size: 1.5rem;
  margin: 0;
  text-align: center;
`;

const ModalBody = styled.div`
  padding: 2rem;
`;

const ModalText = styled.p`
  color: ${COLORS.gray700};
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  text-align: center;

  strong {
    color: ${COLORS.indigo};
    font-weight: 700;
  }
`;

const CancelButton = styled.button`
  width: 100%;
  padding: 0.875rem;
  margin-top: 0.75rem;
  background-color: transparent;
  color: ${COLORS.gray600};
  border: 1px solid ${COLORS.gray300};
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${COLORS.gray100};
    border-color: ${COLORS.gray400};
  }
`;
