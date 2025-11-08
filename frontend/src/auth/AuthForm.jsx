import React, { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../Home/Styled";
import { registerGradjanin, registerNotar, loginUser } from "./authAPI";
import { useAuth } from "../context/AuthContext";

const AuthForm = ({ onClose }) => {
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState("login"); // 'login' ili 'register'
  const [userType, setUserType] = useState("gradjanin"); // Za registraciju
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    ime: "",
    prezime: "",
    email: "",
    lozinka: "",
    jmbg: "",
    grad: "",
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
        const notarData = {
          ime: fullName,
          email: formData.email,
          lozinka: formData.lozinka,
          grad: formData.grad,
        };

        const response = await registerNotar(notarData);
        console.log("Notar registrovan:", response);

        // Automatski prijavi korisnika nakon registracije
        login(
          {
            id: response.id,
            ime: fullName,
            email: formData.email,
            grad: formData.grad,
          },
          "notar"
        );
        alert("Uspešno ste se registrovali kao notar!");
        onClose();
      }
    } catch (err) {
      console.error("Greška pri registraciji:", err);
      setError(err.message || "Došlo je do greške pri registraciji");
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
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </TabContainer>

        {activeTab === "login" ? (
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
